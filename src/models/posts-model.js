const {Schema, model} = require("mongoose");

const postsModel = new Schema({
    userId: {type: String, ref: "User"},
    message: {type: String, required: true},
    isChanged: {type: Boolean},
    isPinned: {type: Boolean},
    date: {type: Date}
})

module.exports = model("Post", postsModel);