const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    githubId: String,
    googleId: String,
    facebookId: String,
    email: String,
    image: String
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;