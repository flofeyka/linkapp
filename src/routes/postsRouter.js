const Router = require("express");
const authMiddleWare = require("../middlewares/auth-middleware");

export const postsRouter = Router({});

postsRouter.get("/:id", authMiddleWare)