const {model, Schema} = require("mongoose");

const resetTokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    resetToken: {type: String},
    requestedAt: {type: Schema.Types.Date}
});

module.exports = model("ResetToken", resetTokenSchema);