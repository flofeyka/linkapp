const db = require("../db/database");
const HTTP_STATUSES = require("../utils/utils");
const usersRepository = require("../repositories/users-repository");

class UsersController {
    async createUser(req, res) {
        const fullName = req.body;
        const createdUser = await usersRepository.createUser(db.users, fullName);

        const newPerson = await db.query(``, createdUser)

        newPerson ? res.json(newPerson).status(HTTP_STATUSES.CREATED_201)
            : res.sendStatus(400);
    }
    async getUserbyFullName(req, res) {

    }
    async getUserById(req, res) {

    }
    async getAllUsers(req, res) {

    }
    async editFullNameUser(req, res) {

    }
    async deleteUser(req, res) {

    }
}

module.exports = new UsersController;