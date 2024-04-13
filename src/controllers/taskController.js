const tasksService = require("../services/tasks-service")

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
            return res.json({
                resultCode: 0,
                message: "Edited successfully"
            });
        }
        return res.json({
            resultCode: 10,
            message: "Not edited"
        })
    }

    deleteTask(req, res, next) {
        return tasksService.deleteTask(req.params.id) ? res.json({
            resultCode: 0,
            message: "Task is successfully deleted"
        }) : res.json({
            resultCode: 10,
            message: "Error"
        });
    }

    pinTask(req, res, next) {
        const pinnedTask = tasksService.pinTask(req.params.id);

        if(pinnedTask) {
            return res.json({
                resultCode: 0,
                message: "Task is successfully pinned"
            })
        }

        return res.json({
            resultCode: 10,
            message: "Task isn't changed"
        })
    }

    unPinTask(req, res, next) {
        const unPinnedTask = tasksService.unPinTask(req.params.id);

        if(unPinnedTask) {
            return res.json({
                resultCode: 0,
                message: "Task is successfully unpinned"
            })
        }

        return res.json({
            resultCode: 10,
            message: "Task isn't changed"
        })
    }
}

module.exports = new TaskController();