module.exports = class commentDto {
    id;
    userId;
    postId;
    message;
    isChanged;
    isPinned;
    date;

    constructor(model) {
        this.id = model._id;
        this.userId = model.userId;
        this.postId = model.postId;
        this.message = model.message;
        this.isChanged = model.isChanged;
        this.isPinned = model.isPinned;
        this.date = model.date
    }
}