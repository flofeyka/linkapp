const tasksService = require("../services/tasks-service");
const results = require("../results/results");

class TaskController {
    async getTasks(req, res, next) {
        return res.json(await tasksService.getTasks(req.user.id));
    }

    async addTask(req, res, next) {
        const {name, isPinned, taskMessage} = req.body;
        return res.json(await tasksService.addTask(req.user.id, name, isPinned, taskMessage));
    }

    async editTask(req, res, next) {
        const {id, name, taskMessage} = req.body;
        const editedTask = await tasksService.editTask(id, taskMessage, name);
        if(editedTask) {
            return res.json(results.successful("Task is successfully edited"));
        }
        return res.json(results.unsuccessful("Task is not edited"));
    }

    deleteTask(req, res, next) {
        return res.json(tasksService.deleteTask(req.params.id) ? results.successful("Task is deleted successfully") : 
        results.unsuccessful("Task is not deleted"));
    }

    pinTask(req, res, next) {
        const pinnedTask = tasksService.pinTask(req.params.id);

        return res.json(pinnedTask ? results.successful("Task is successfully pinned") : results.unsuccessful("Task is not pinned"));
    }

    unPinTask(req, res, next) {
        const unPinnedTask = tasksService.unPinTask(req.params.id);

        if(unPinnedTask) {
            return res.json({
                resultCode: 0,
                message: "Task is successfully unpinned"
            })
        }

        return res.json(unPinnedTask ? results.successful("Task is successfully unpinned") : results.unsuccessful("Task is not pinned"));
    }
}

module.exports = new TaskController();