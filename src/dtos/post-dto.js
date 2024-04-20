module.exports = class PostDto {
    id;
    name;
    userId;
    message;
    isPinned;
    isChanged;
    date;

    constructor (model) {
        this.id = model._id;
        this.userId = model.userId;
        this.message = model.message;
        this.isPinned = model.isPinned;
        this.isChanged = model.isChanged;
        this.date = model.date;
    }
}