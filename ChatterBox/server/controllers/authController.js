const router = require("express").Router();
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  console.log('signup post call ')
  try {
    //1 If user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        message: "User already exists !",
        success: false,
      });
    }

    //encrypt the pwd
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    //Create new user
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: "User created successfully!",
      success: true,
    });
  } catch (err) {
    res.send({
      message: "Error !" + err.message,
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        message: "User doesn't exist ",
        success: false,
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      res.send({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.send({
      message: "User logged in successfully",
      success: true,
      token: token,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});
module.exports = router;
