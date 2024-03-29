import express, { Request, Response } from "express";
import {HTTP_STATUSES} from "../utils/utils"
import { usersRepository } from "../repositories/users-repository";

const actionWithUserRoutes = () => {
    const router = express.Router();

    router.put("/:domain", async (req: Request, res: Response) => {
        const ProfileFound = await usersRepository.__findUser(req.params.domain);

        if (!ProfileFound) {
            res.status(404);
            return;
        }

        // req.body.follow ? ProfileFound.followed = req.body.follow : res.status(HTTP_STATUSES.BAD_REQUEST_400);
        // res.setHeader('Content-Type', 'application/json')
        //     .json({
        //         followed: ProfileFound.followed
        //     });
    });

    return router;
}

export default actionWithUserRoutes;