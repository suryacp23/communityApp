import Group from "../models/groupModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { message, groupId, senderId } = req.body;
  const user = req.user;

  try {
    const group = await Group.findById(groupId);
    if (!group.members.includes(user._id)) {
      res
        .status(403)
        .json({ error: "unauthorized no allowed to send message" });
      return;
    }
    const newMessage = await Message.create({
      groupId,
      senderId: user._id,
      message,
    });
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error sending message" });
  }
};
export const getMessages = async (req, res) => {
  const { groupId } = req.params;
  const user = req.user;
  try {
    const group = await Group.findById(groupId);
    console.log(group);
    if (!group.members.includes(user._id)) {
      res
        .status(403)
        .json({ message: "unauthorized no allowed to get message" });
    }
    const messages = await Message.find({ groupId }).populate("senderId");
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in get messages" });
  }
};
