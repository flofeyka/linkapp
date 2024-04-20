const Router = require("express");
const authMiddleWare = require("../middlewares/auth-middleware");
const postsController = require("../controllers/postsController");
const postsMiddleware = require("../middlewares/post-middleware")

const postsRouter = Router({});
module.exports = postsRouter;

postsRouter.get("/getOne/:id", postsController.getPostById);
postsRouter.get("/getUsers/:userId", postsController.getUsersPosts);
postsRouter.post("/create", authMiddleWare, postsController.createPost);
postsRouter.put("/change", authMiddleWare, postsMiddleware, postsController.editPost);
postsRouter.delete("/delete/:id", authMiddleWare, postsMiddleware, postsController.deletePost);
postsRouter.post("/pin/:id", authMiddleWare, postsMiddleware, postsController.pinPost);
postsRouter.delete("/unpin/:id", authMiddleWare, postsMiddleware, postsController.unPinPost);
