const express = require('express');
const HTTP_STATUSES = require('../utils/utils');
const profilesRepository = require('../repositories/profiles-repository');

const profileRoutes = (db) => {
    const router = express.Router();

    router.get("/:userId", async (req, res) => {
        const ProfileFound = await profilesRepository.profileFind(db.profiles, +req.params.userId);

        ProfileFound ? res.json(ProfileFound).status(HTTP_STATUSES.OK200) :
            res.status(HTTP_STATUSES.NOT_FOUND_404);
    });

    return router;
}

module.exports = profileRoutes;