const express = require('express');
const HTTP_STATUSES = require('../utils/utils');
const usersRepository = require('../repositories/users-repository');
const { body } = require('express-validator');
const inputValidationMiddleware = require("../middlewares/input-validation-middleware.js");


const usersController = require("../controllers/users-controller.js");


const fullNameValidation = body("fullName").trim().isLength({min: 4, max: 15})
    .withMessage("FullName length should be from 4 to 15 symbols")

const usersRoutes = (db) => {
    const router = express.Router();

    router.get("/", usersController.getUserbyFullName, async (req, res) => {
        const foundUsers = await usersRepository.findUser(db.users, req.query.fullName)
        res.status(200).json(foundUsers);
    });
    router.get("/:id", usersController.getAllUsers, async (req, res) => {
        const usersFound = await usersRepository.getUserById(+req.params.id, db.users);
        !usersFound ? res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) : res.json(usersFound);
    });
    router.delete("/:id", usersController.deleteUser, async (req, res) => {
        const foundUsers = await usersRepository.deleteUser(+req.params.id, db.users);

        !req.params.id && res.status(HTTP_STATUSES.BAD_REQUEST_400);
        foundUsers ? res.status(HTTP_STATUSES.NO_CONTENT_204).json(foundUsers) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });
    router.put("/:id", usersController.editFullNameUser, fullNameValidation, inputValidationMiddleware, async (req, res) => {
        const foundUser = await usersRepository.editFullNameUser(db.users, +req.params.id, req.body.fullName);

        foundUser ? res.setHeader('Content-Type', 'application/json').json(foundUser)
            .status(HTTP_STATUSES.CREATED_201) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    });
    router.post("/", usersController.createUser, fullNameValidation, inputValidationMiddleware);

    return router;
}

module.exports = usersRoutes;