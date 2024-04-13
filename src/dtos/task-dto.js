module.exports = class TaskDto {
    id;
    userId;
    name;
    isPinned;
    taskMessage;

    constructor(model) {
        this.id = model._id;
        this.userId = model.userId;
        this.name = model.name;
        this.isPinned = model.isPinned;
        this.taskMessage = model.taskMessage
    }
}