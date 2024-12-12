const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

//function register
exports.register = async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provider all required fields!",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    res.send({
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registerring a new user.",
    });
  }
};
