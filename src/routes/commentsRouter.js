const { Router } = require("express");
const commentsController = require("../controllers/commentsController");

const commentsRouter = Router({});

commentsRouter.get("/get/:postId", commentsController.getCommentsByPostId);
commentsRouter.post("/create/:postId", commentsController.createComment);
commentsRouter.delete("/delete/:commentId", commentsController.deleteComment);
commentsRouter.put("/edit/:commentId", commentsController.editComment);
