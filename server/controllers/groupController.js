import Group from "../models/groupModel.js";
import JoinRequest from "../models/joinRequestModel.js";

export const createGroup = async (req, res) => {
  const { name, blogId } = req.body;

  try {
    // Check if the group already exists
    const existingGroup = await Group.findOne({ blogId });
    if (existingGroup) {
      return res.status(400).json({ message: "Group already exists" });
    }

    // Create a new group
    const newGroup = await Group.create({
      name,
      blogId,
      admin: req.user._id,
      members: [req.user._id],
    });

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (err) {
    res.status(500).json({ message: "Error creating group", error: err });
  }
};

export const addModerator = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admin.equals(req.user.userId)) {
      return res.status(403).json({ message: "Only admin can add moderators" });
    }

    if (group.moderators.includes(userId)) {
      return res.status(400).json({ message: "User is already a moderator" });
    }

    group.moderators.push(userId);
    await group.save();

    res.status(200).json({ message: "Moderator added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding moderator", error: err });
  }
};

export const approveRequest = async (req, res) => {
  const { requestId, action } = req.body;

  try {
    const joinRequest = await JoinRequest.findById(requestId).populate("group");
    if (!joinRequest || joinRequest.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

    const group = joinRequest.group;
    if (action === "approve") {
      joinRequest.status = "approved";
      await joinRequest.deleteOne();

      await Group.findByIdAndUpdate(group._id, {
        $push: { members: joinRequest.user },
      });
    } else if (action === "reject") {
      joinRequest.status = "rejected";
      await joinRequest.deleteOne();
    }

    res.status(200).json({ message: `Join request ${action}ed` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing join request", error: err });
  }
};

export const joinRequest = async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    const existingRequest = await JoinRequest.findOne({
      user: userId,
      group: groupId,
    });
    if (existingRequest)
      return res.status(400).json({ message: "Join request already sent" });

    const joinRequest = new JoinRequest({ user: userId, group: groupId });
    await joinRequest.save();

    await Group.findByIdAndUpdate(groupId, {
      $push: { joinRequests: joinRequest._id },
    });

    res.status(200).json({ message: "Join request sent" });
  } catch (err) {
    res.status(500).json({ message: "Error sending join request", error: err });
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate("admin", [
      "-password",
    ]);
    if (group == null) {
      return res.status(200).json({ message: "group Not Found" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.log("getGroupInfo controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
