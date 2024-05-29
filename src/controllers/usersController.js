const usersService = require("../services/users-service");

class usersController {
  async getUserById(req, res) {
    try {
      const user = await usersService.getUserById(res.params.id);
      return res.json(user);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = usersController();
