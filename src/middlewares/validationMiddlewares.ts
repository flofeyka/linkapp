import { NextFunction, Request, Response } from "express";
import {body, validationResult} from 'express-validator';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    } else {
        next();
    }
}



export function validationMiddleware(path: any, pathName: string) {
    return path(pathName).trim().isLength({ min: 3, max: 25 })
    .withMessage("FullName length should be from 3 to 25 symbols")
}