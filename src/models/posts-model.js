const { Schema, model } = require("mongoose");

const postsModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  isChanged: { type: Boolean },
  isPinned: { type: Boolean },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  date: { type: Date },
});

module.exports = model("Post", postsModel);
