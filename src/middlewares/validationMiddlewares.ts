import { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    } else {
        next();
    }
}



export function validationMiddleware(path: any, pathName: string) {
    return path(pathName).trim().isLength({ min: 3, max: 25 })
        .withMessage(`${pathName} length should be from 3 to 25 symbols`)
}

export function emailValidationMiddleware(path: any, pathName: string) {
    return path(pathName).trim().required().isEmail()
        .withMessage(`Invalid email address`)
}

export function passwordValidationMiddleware(path: any, pathName: string) {
    return path(pathName).trim().isLength({ min: 8 })
      .withMessage(`Password should have min 8 symbols`)
}