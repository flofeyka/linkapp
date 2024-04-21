const usersService = require("../services/users-service");

module.exports = new class usersController {
    async getUserById(req, res) {
       const user = await usersService.getUserById(res.params.id);
       return res.json(user);
    }
}