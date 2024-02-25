import {DataBase, profileType, RequestParams} from "../types/types";
import {profileUserIdModel} from "../types/models/profileInputModel";
import express, {Response} from "express";
import {HTTP_STATUSES} from "../utils/utils";
import {profilesRepository} from "../repositories/profiles-repository";

export const profileRoutes = (db: DataBase) => {
    const router = express.Router();

    router.get("/:userId", (req: RequestParams<profileUserIdModel>, res: Response<profileType>) => {
        const ProfileFound = profilesRepository.profileFind(db.profiles, +req.params.userId);
        ProfileFound ? res.json(ProfileFound).sendStatus(HTTP_STATUSES.OK200) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });

    return router;
}
