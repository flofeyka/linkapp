const {model, Schema} = require("mongoose");

const tokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    refreshToken: {type: String, required: true}
})

module.exports = model("Token", tokenSchema);