const express = require('express');
const HTTP_STATUSES = require('../utils/utils');
const profilesRepository = require('../repositories/profiles-repository');

const actionWithUserRoutes = (db) => {
    const router = express.Router();

    router.put("/:userId", async (req, res) => {
        const ProfileFound = await profilesRepository.profileFind(db.profiles, +req.params.userId);

        if (!ProfileFound) {
            res.status(404);
            return;
        }

        req.body.follow ? ProfileFound.followed = req.body.follow : res.status(HTTP_STATUSES.BAD_REQUEST_400);
        res.setHeader('Content-Type', 'application/json')
            .json({
                followed: ProfileFound.followed
            });
    });

    return router;
}

module.exports = actionWithUserRoutes;