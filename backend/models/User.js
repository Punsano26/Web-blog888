const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//UserSchema เป็นชื่อคลาส
const UserSchema = new Schema({
  username: { type: String, require: true, unique: true, min: 4 },
  password: { type: String, require: true },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
