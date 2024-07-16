const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    name: {type: String, required: true},
    status: {type: String, default: ""},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordResetToken: {type: String},
    isProfileClosed: {type: Boolean, default: false},
    following: [{type: Schema.Types.ObjectId, ref: "User"}]
    // friends
    // subscribers
    // 
});

module.exports = model("User", userSchema);