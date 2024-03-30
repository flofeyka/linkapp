import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { usersService } from "../domain/users/users-service";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({
            resultCode: 1,
            message: "You are not authorized"
        })
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const userId = await jwtService.getUserIdByToken(token);
    if (userId) {
        req.user = await usersService.getUserById(userId);
        next();
    }
    res.send(401);
}