import { Request, Response, NextFunction } from 'express';

// Async handler wrapper to catch errors in async route handlers
const AsyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default AsyncHandler;
