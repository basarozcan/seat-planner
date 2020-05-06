const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    githubId: String,
    image: String
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;