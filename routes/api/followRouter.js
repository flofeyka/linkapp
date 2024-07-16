const { Router } = require("express");
const authMiddleware = require("../../middlewares/auth-middleware");
const { getFollowing, getFollowers, follow, unFollow } = require("../../controllers/followController");

const followRouter = Router();
module.exports = followRouter;

followRouter.get("/getFollowers", authMiddleware, getFollowers);
followRouter.get("/getFollowing", authMiddleware, getFollowing);
followRouter.post("/follow/:id", authMiddleware, follow);
followRouter.delete("/unfollow/:id", authMiddleware, unFollow);