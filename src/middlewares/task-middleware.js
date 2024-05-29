const ApiError = require("../exceptions/api-error");
const tasksService = require("../services/tasks-service");
module.exports = async function (req, res, next) {
  try {
    const currentTask = await tasksService.getTaskById(
      req.body.taskId || req.params.taskId
    );
    if (currentTask.userId.toString() !== req.user.id) {
      return next(ApiError.InvalidId());
    }
    next();
  } catch (e) {
    return next(ApiError.InvalidId());
  }
};
