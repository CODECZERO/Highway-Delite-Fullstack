import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';
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

// Validate promo code and calculate discount
// Checks code validity, expiry date, and minimum purchase requirements
// Returns calculated discount amount
const validatePromoCode = AsyncHandler(async (req: Request, res: Response) => {
    const { code, subtotal } = req.body;

    // Validate required fields are provided
    if (!(code && subtotal !== undefined)) {
        throw new ApiError(400, "Code and subtotal are required");
    }

    // Find active promo code in database
    const promo = await PromoCode.findOne({ 
        code: code.toUpperCase(),
        isActive: true
    });

    // If promo code not found or inactive, throw error
    if (!promo) {
        throw new ApiError(404, "Invalid or expired promo code");
    }

    // Check if promo code has expired
    if (promo.expiryDate && new Date(promo.expiryDate) < new Date()) {
        throw new ApiError(400, "Promo code has expired");
    }

    // Check if subtotal meets minimum purchase requirement
    if (subtotal < promo.minPurchase) {
        throw new ApiError(400, `Minimum purchase of ₹${promo.minPurchase} required`);
    }

    // Calculate discount based on type (percentage or fixed)
    let discount = 0;
    if (promo.discountType === 'percentage') {
        // Calculate percentage discount
        discount = (subtotal * promo.discountValue) / 100;
        // Apply maximum discount cap if exists
        if (promo.maxDiscount && discount > promo.maxDiscount) {
            discount = promo.maxDiscount;
        }
    } else {
        // Fixed discount amount
        discount = promo.discountValue;
    }

    // Calculate final total after discount
    const total = subtotal - discount;

    // Prepare response data with promo details
    const responseData = {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discount: Math.round(discount),
        total: Math.round(total)
    };

    // Return success response with discount details
    return res.status(200).json(
        new ApiResponse(200, responseData, "Promo code validated successfully")
    );
});

export {
    validatePromoCode
};
