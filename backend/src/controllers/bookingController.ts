import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import mongoose from 'mongoose';
import { ApiError } from '../util/ApiError';
import { ApiResponse } from '../util/ApiResponse';
import AsyncHandler from '../util/AsyncHandler';

// All error return/output format:
// {
//     "statusCode": error status code,
//     "data": "error message",
//     "success": false,
//     "errors": []
// }

// Create new booking with transaction support
// Prevents double booking by using MongoDB transactions
// Updates slot availability atomically
const createBooking = AsyncHandler(async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            experienceId,
            slotDate,
            slotTime,
            numberOfPeople,
            customerName,
            customerEmail,
            customerPhone,
            promoCode,
            discount,
            subtotal,
            total
        } = req.body;

        // Validate all required fields are provided
        if (!(experienceId && slotDate && slotTime && numberOfPeople && 
            customerName && customerEmail && customerPhone && 
            subtotal !== undefined && total !== undefined)) {
            await session.abortTransaction();
            throw new ApiError(400, "All fields are required");
        }

        // Find experience and slot in parallel for better performance
        const experience = await Experience.findById(experienceId).session(session);
        
        // If experience not found, abort transaction and throw error
        if (!experience) {
            await session.abortTransaction();
            throw new ApiError(404, "Experience not found");
        }

        // Find the specific slot matching date and time
        const slot = experience.slots.find(
            (s) => s.date.toISOString().split('T')[0] === new Date(slotDate).toISOString().split('T')[0] &&
                s.startTime === slotTime
        );

        // If slot not found, abort transaction and throw error
        if (!slot) {
            await session.abortTransaction();
            throw new ApiError(404, "Slot not found");
        }

        // Check if enough spots are available
        if (slot.availableSpots < numberOfPeople) {
            await session.abortTransaction();
            throw new ApiError(400, "Not enough spots available");
        }

        // Update slot availability and save experience
        slot.availableSpots -= numberOfPeople;
        
        // Create booking document
        const booking = new Booking({
            experienceId,
            experienceTitle: experience.title,
            slotDate: new Date(slotDate),
            slotTime,
            numberOfPeople,
            customerName,
            customerEmail,
            customerPhone,
            promoCode: promoCode || undefined,
            discount: discount || 0,
            subtotal,
            total,
            status: 'confirmed'
        });

        // Save both experience and booking in transaction
        await Promise.all([
            experience.save({ session }),
            booking.save({ session })
        ]);

        // Commit transaction if all operations successful
        await session.commitTransaction();

        // Return success response with booking data
        return res.status(201).json(
            new ApiResponse(201, booking, "Booking created successfully")
        );
    } catch (error) {
        // Abort transaction on any error
        await session.abortTransaction();
        throw error;
    } finally {
        // Always end session
        session.endSession();
    }
});

// Get booking details by ID
// Used for confirmation page and booking history
const getBookingById = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate if ID is provided
    if (!id) throw new ApiError(400, "Booking ID is required");

    // Find booking by ID
    const booking = await Booking.findById(id);

    // If booking not found, throw error
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Return success response with booking data
    return res.status(200).json(
        new ApiResponse(200, booking, "Booking fetched successfully")
    );
});

export {
    createBooking,
    getBookingById
};
