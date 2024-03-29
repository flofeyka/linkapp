import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { settings } from "../settings";

export const jwtService = {
    async createJwt(user: any) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"});
        return {
            resultCode: 0,
            data: {
                token: token
            }
        }
    },
    async getUserIdByToken(token: string) {
        try {
            const result = jwt.verify(token, settings.JWT_SECRET);
            return new ObjectId(result._id);
        } catch {
            return null;
        }
    }
}