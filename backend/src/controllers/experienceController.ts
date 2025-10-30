import { Request, Response } from 'express';
import Experience from '../models/Experience';
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

// Get all experiences from database
// Returns list of experiences without slot details for performance
const getAllExperiences = AsyncHandler(async (req: Request, res: Response) => {
    // Fetch all experiences excluding slot details
    const experiences = await Experience.find().select('-slots');
    
    // If no experiences found, throw error
    if (!experiences || experiences.length === 0) {
        throw new ApiError(404, "No experiences found");
    }
    
    // Return success response with experiences data
    return res.status(200).json(
        new ApiResponse(200, experiences, "Experiences fetched successfully")
    );
});

// Get single experience by ID with full details including slots
// Used for experience details page
const getExperienceById = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Validate if ID is provided
    if (!id) throw new ApiError(400, "Experience ID is required");
    
    // Find experience by ID with all details
    const experience = await Experience.findById(id);
    
    // If experience not found, throw error
    if (!experience) {
        throw new ApiError(404, "Experience not found");
    }
    
    // Return success response with experience data
    return res.status(200).json(
        new ApiResponse(200, experience, "Experience fetched successfully")
    );
});

export {
    getAllExperiences,
    getExperienceById
};
