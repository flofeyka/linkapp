const Router = require("express");
const TaskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/auth-middleware");
const tasksMiddleware = require("../middlewares/task-middleware");
const tasksRouter = Router({});
module.exports = tasksRouter;

tasksRouter.get("/get", authMiddleware, TaskController.getTasks);
tasksRouter.post("/add", authMiddleware, TaskController.addTask);
tasksRouter.post(
  "/pin/:id",
  authMiddleware,
  tasksMiddleware,
  TaskController.pinTask
);
tasksRouter.delete(
  "/unpin/:id",
  authMiddleware,
  tasksMiddleware,
  TaskController.unPinTask
);
tasksRouter.delete(
  "/delete/:id",
  authMiddleware,
  tasksMiddleware,
  TaskController.deleteTask
);
tasksRouter.put(
  "/edit",
  authMiddleware,
  tasksMiddleware,
  TaskController.editTask
);
