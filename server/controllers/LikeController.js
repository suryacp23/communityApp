import Event from "../models/eventModel.js";
import Like from "../models/likeModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existingLike = await Like.findOne({ userId, eventId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      event.likes = Math.max(0, event.likes - 1); 
    } else {
      await Like.create({ userId, eventId });
      event.likes += 1;
    }

    await event.save(); 

    res
      .status(200)
      .json({ success: true, liked: !existingLike, likes: event.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getLikeCount = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userLike = userId ? await Like.findOne({ userId, eventId }) : null;
    const liked = !!userLike;

    res.status(200).json({ likes: event.likes, liked });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
