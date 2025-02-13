const router = require("express").Router();
const Chat = require("./../models/chat");
const authMiddleware = require("./../middlewares/authMiddleware");

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    res.send({
      message: "Chat created successfully !",
      success: true,
      data: savedChat,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const allChats = await Chat.find({ members: { $in: req.body.userId } });

    res.send({
      message: "Chat fetched successfully !",
      success: true,
      data: allChats,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

module.exports = router;
