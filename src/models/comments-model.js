const { Schema, model } = require("mongoose");

const commentsModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  message: { type: String, required: true },
  isChanged: { type: Boolean },
  isPinned: { type: Boolean },
  date: { type: Date },
});

module.exports = model("Comment", commentsModel);
