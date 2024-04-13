const {Schema, model} = require("mongoose");

const tasksModel = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    isPinned: {type: Boolean},
    taskMessage: {type: String, required: true}
})

module.exports = model("Tasks", tasksModel);

