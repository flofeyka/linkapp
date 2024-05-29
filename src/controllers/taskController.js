const tasksService = require("../services/tasks-service");
const results = require("../results/results");

class TaskController {
  async getTasks(req, res, next) {
    try {
      const tasksFound = await tasksService.getTasks(req.user.id);
      return res.json(tasksFound);
    } catch (e) {
      next(e);
    }
  }

  async addTask(req, res, next) {
    try {
      const { name, isPinned, taskMessage } = req.body;
      const createdTask = await tasksService.addTask(
        req.user.id,
        name,
        isPinned,
        taskMessage
      );
      res.json(createdTask);
    } catch (e) {
      next(e);
    }
  }

  async editTask(req, res, next) {
    try {
      const { id, name, taskMessage } = req.body;
      const editedTask = await tasksService.editTask(id, taskMessage, name);
      if (editedTask) {
        return res.json(results.successful("Task is successfully edited"));
      }
      return res.json(results.unsuccessful("Task is not edited"));
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const isDeletedTask = await tasksService.deleteTask(req.params.id);
      return res.json(
        isDeletedTask
          ? results.successful("Task is deleted successfully")
          : results.unsuccessful("Task is not deleted")
      );
    } catch (e) {
      next(e);
    }
  }

  pinTask(req, res, next) {
    try {
      const pinnedTask = tasksService.pinTask(req.params.id);

      return res.json(
        pinnedTask
          ? results.successful("Task is successfully pinned")
          : results.unsuccessful("Task is not pinned")
      );
    } catch (e) {
      next(e);
    }
  }

  unPinTask(req, res, next) {
    try {
      const unPinnedTask = tasksService.unPinTask(req.params.id);

      if (unPinnedTask) {
        return res.json({
          resultCode: 0,
          message: "Task is successfully unpinned",
        });
      }
  
      return res.json(
        unPinnedTask
          ? results.successful("Task is successfully unpinned")
          : results.unsuccessful("Task is not pinned")
      );
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new TaskController();
