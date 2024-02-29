
const express = require("express");
const HTTP_STATUSES = require("../utils/utils");

export const actionWithUserRoutes = (db) => {
    const router = express.Router();

    router.put("/:userId", (req, res) => {
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