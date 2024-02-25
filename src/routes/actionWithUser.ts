import express, {Response} from "express";
import {DataBase, profileType, RequestParamsBody} from "../types/types";
import {profileFollowModel, profileUserIdModel} from "../types/models/profileInputModel";
import {HTTP_STATUSES} from "../utils/utils";

export const actionWithUserRoutes = (db: DataBase) => {
    const router = express.Router();

    router.put("/:userId", (req: RequestParamsBody<profileUserIdModel, profileFollowModel>, res: Response) => {
        const ProfileFound: any = db.profiles.find(profile => profile.userId === +req.params.userId);
        if(req.body.follow) {
            ProfileFound.followed = req.body.follow;
        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json({
            followed: ProfileFound.followed
        });
    });

    return router;
}