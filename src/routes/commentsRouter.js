const commentsController = require("../controllers/commentsController");
const authMiddleware = require("../middlewares/auth-middleware");
const commentsMiddleware = require("../middlewares/comment-middleware");
const postsMiddleware = require("../middlewares/post-middleware");

const { Router } = require("express");

const commentsRouter = Router({});
module.exports = commentsRouter;

commentsRouter.get("/getOne/:commentId", commentsController.getCommentById);
commentsRouter.get(
  "/getByPostId/:postId",
  commentsController.getCommentsByPostId
);
commentsRouter.post(
  "/create/:postId",
  authMiddleware,
  commentsController.createComment
);
commentsRouter.put(
  "/change/:commentId",
  authMiddleware,
  commentsMiddleware,
  commentsController.editComment
);
commentsRouter.delete(
  "/delete/:commentId",
  authMiddleware,
  commentsMiddleware,
  commentsController.deleteComment
);
commentsRouter.post("/pin/:commentId", authMiddleware, postsMiddleware, commentsController.pinComment);
commentsRouter.delete("/unpin/:commentId", authMiddleware, postsMiddleware, commentsController.unPinComment);
