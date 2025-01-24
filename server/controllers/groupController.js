import Group from "../models/groupModel.js";
import JoinRequest from "../models/requestModel.js";

export const createGroup = async (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const { name, eventId, isHead } = req.body;
=======
  const { name, eventId } = req.body;
>>>>>>> 8732cf9 (Backend (#49))
=======
  const { name, eventId, isHead } = req.body;
>>>>>>> 72330df (added request)

  try {
    // Check if the group already exists
    const existingGroup = await Group.findOne({ eventId });
    if (existingGroup) {
      return res.status(400).json({ message: "Group already exists" });
    }

    // Create a new group
    const newGroup = await Group.create({
      name,
      eventId,
      admin: req.user._id,
      members: [req.user._id],
<<<<<<< HEAD
<<<<<<< HEAD
      isHead,
=======
>>>>>>> 8732cf9 (Backend (#49))
=======
      isHead,
>>>>>>> 72330df (added request)
    });

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
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

export const getGroups = async (req, res) => {
  try {
    const user = req.user;
    const group = await Group.find({ admin: user._id }).populate(
      "admin",
      "-password"
    );
    if (group == null) {
      return res.status(200).json({ message: "group Not Found" });
    }
    console.log(group);
    res.status(200).json(group);
  } catch (error) {
    console.log("getGroupInfo controller error" + error.message);
    res.status(400).json({ error: error.message });
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
<<<<<<< HEAD
<<<<<<< HEAD
      await joinRequest.save();
=======
      await joinRequest.deleteOne();
>>>>>>> 8732cf9 (Backend (#49))
=======
      await joinRequest.save();
>>>>>>> 72330df (added request)

      await Group.findByIdAndUpdate(group._id, {
        $push: { members: joinRequest.user },
      });
      await User.findByIdAndUpdate(joinRequest.user, {
        $push: { groups: group._id },
      });
    } else if (action === "reject") {
      joinRequest.status = "rejected";
<<<<<<< HEAD
<<<<<<< HEAD
      await joinRequest.save();
=======
      await joinRequest.deleteOne();
>>>>>>> 8732cf9 (Backend (#49))
=======
      await joinRequest.save();
>>>>>>> 72330df (added request)
    }

    res.status(200).json({ message: `Join request ${action}ed` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing join request", error: err });
  }
};

export const joinRequest = async (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 72330df (added request)
  const { eventId, events } = req.body;
  const userId = "6740173101d916d7e6efdf2e";
  // const groupIds = JSON.parse(events);
  // console.log(groupIds);
<<<<<<< HEAD

  try {
    const groups = await Group.find({ eventId });
    console.log(groups);

    const validGroupIds = groups.map((group) => group._id.toString());
    const filteredGroupIds = events.filter((groupId) =>
      validGroupIds.includes(groupId)
    );

    if (filteredGroupIds.length === 0) {
      return res.status(400).json({ message: "Invalid group IDs" });
    }

    const existingRequests = await JoinRequest.find({
      user: userId,
      group: { $in: filteredGroupIds },
    });

    const existingGroupIds = existingRequests.map((req) =>
      req.group.toString()
    );
    const newGroupIds = filteredGroupIds.filter(
      (groupId) => !existingGroupIds.includes(groupId)
    );

    if (newGroupIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Join requests already sent for all groups" });
    }

    const joinRequests = newGroupIds.map((groupId) => ({
      user: userId,
      group: groupId,
    }));

    await JoinRequest.insertMany(joinRequests);

    res.status(200).json({ message: "Join requests sent successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending join requests", error: err });
  }
};
=======
  const { userId, groupId } = req.body;
=======
>>>>>>> 72330df (added request)

  try {
    const groups = await Group.find({ eventId });
    console.log(groups);

    const validGroupIds = groups.map((group) => group._id.toString());
    const filteredGroupIds = events.filter((groupId) =>
      validGroupIds.includes(groupId)
    );

    if (filteredGroupIds.length === 0) {
      return res.status(400).json({ message: "Invalid group IDs" });
    }

    const existingRequests = await JoinRequest.find({
      user: userId,
      group: { $in: filteredGroupIds },
    });

    const existingGroupIds = existingRequests.map((req) =>
      req.group.toString()
    );
    const newGroupIds = filteredGroupIds.filter(
      (groupId) => !existingGroupIds.includes(groupId)
    );

    if (newGroupIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Join requests already sent for all groups" });
    }

    const joinRequests = newGroupIds.map((groupId) => ({
      user: userId,
      group: groupId,
    }));

    await JoinRequest.insertMany(joinRequests);

    res.status(200).json({ message: "Join requests sent successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending join requests", error: err });
  }
};
<<<<<<< HEAD

>>>>>>> 8732cf9 (Backend (#49))
=======
>>>>>>> 72330df (added request)
export const getGroupJoinRequests = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const joinRequests = await JoinRequest.find({
      group: groupId,
      status: "pending",
    }).populate("user", ["-password"]);

    res.status(200).json(joinRequests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching join requests", error: err });
  }
};
