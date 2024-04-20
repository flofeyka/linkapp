const tasksModel = require("../models/tasks-model");
const TaskDto = require("../dtos/task-dto")

class tasksService {
    async getTaskById(id) {
        const taskResult = await tasksModel.findOne({id});
        const taskDTO = new TaskDto(taskResult);
        return taskDTO;
    }
    async getTasks(userId) {
        const taskDTOresult = await tasksModel.find({userId});
        const taskDTOs = taskDTOresult.map(task => new TaskDto(task));
        return taskDtos;
    }

    async addTask(userId, name, isPinned = false, taskMessage) {
        const addedTask = await tasksModel.create({
            userId, name, isPinned, taskMessage
        })

        const taskDto = new TaskDto(addedTask);
        return taskDto;
    }

    async editTask(taskId, newMessage, taskName) {
        const editedTask = await tasksModel.updateOne({_id: taskId, taskMessage: newMessage, name: taskName});
        return editedTask.modifiedCount === 1;
    }

    async deleteTask(taskId) {
        const deletedTask = await tasksModel.deleteOne({_id: taskId});
        return deletedTask.deletedCount === 1;
    }

    async pinTask(taskId) {
        const result = await tasksModel.updateOne({_id: taskId}, {isPinned: true})
        return result.modifiedCount === 1;
    }

    async unPinTask(taskId) {
        const result = await tasksModel.updateOne({_id: taskId}, {isPinned: false})
        return result.modifiedCount === 1;
    }
}

module.exports = new tasksService();