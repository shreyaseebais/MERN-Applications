const router = require("express").Router();
const Chat = require("./../models/chat");
const authMiddleware = require("./../middlewares/authMiddleware");
const Message = require("./../models/message");

router.post("/new-message", authMiddleware, async (req, res) => {
  try {
    //Store the message in message collection
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: savedMessage._id,
        $inc: {
          unreadMessageCount: 1,
        },
      }
    );
    res.send({
      message: "Message sent successfully",
      success: true,
      data: savedMessage,
    });
    //Update the lastMessage in Chat collection
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/get-all-messages/:chatId", authMiddleware, async (req, res) => {
  console.log("/get-all-messages/:chatId");
  try {
    const allMessages = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.send({
      message: "Messages fetched successfully",
      success: true,
      data: allMessages,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
