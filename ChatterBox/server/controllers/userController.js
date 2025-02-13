const router = require("express").Router();
const User = require("./../models/user");
const authMiddleware = require("./../middlewares/authMiddleware");

router.get("/get-logged-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    res.send({
      message: "User fetched successfully ",
      success: true,
      data: user,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.body.userId } });
    console.log("ALL Users : ", allUsers);
    res.send({
      message: "All users fetched successfully ",
      success: true,
      data: allUsers,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

module.exports = router;
