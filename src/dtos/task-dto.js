module.exports = class TaskDto {
  id;
  userId;
  name;
  taskMessage;
  isPinned;

  constructor(model) {
    this.id = model._id;
    this.userId = model.userId;
    this.name = model.name;
    this.taskMessage = model.taskMessage;
    this.isPinned = model.isPinned;
  }
};
