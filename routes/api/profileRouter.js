const { Router } = require("express");
const { updateProfile, getUserById } = require("../../controllers/profileController");
const authMiddleware = require("../../middlewares/auth-middleware");

const profileRouter = Router();
module.exports = profileRouter;

profileRouter.get("/getById/:id", authMiddleware, getUserById);
profileRouter.put("/editData", authMiddleware, updateProfile);