const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const error = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    next(error(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ message: "Done" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === " " || password === " ") {
    return next(error(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(error(404, "User not found"));
    }
    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return next(error(400, "Invalid password!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETKEY);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
