import Group from "../models/groupModel.js";
import JoinRequest from "../models/requestModel.js";

export const createGroup = async (req, res) => {
  const { name, eventId, isHead } = req.body;

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
      isHead,
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
    const userId = req.user._id; // User ID from the request

    const result = await Group.aggregate([
      {
        $match: {
          members: userId, // Filter groups where the user is a member
        },
      },
      {
        $group: {
          _id: "$eventId", // Group by eventId
          totalGroups: { $sum: 1 }, // Count groups per eventId
          membersCount: { $sum: { $size: "$members" } }, // Sum total members per eventId
          groups: { $push: "$$ROOT" }, // Include all groups for each event
        },
      },
      {
        $unwind: "$groups", // Unwind groups to perform lookup
      },
      // Populate admin
      {
        $lookup: {
          from: "users", // Reference the User collection
          localField: "groups.admin",
          foreignField: "_id",
          as: "groups.admin",
        },
      },
      {
        $unwind: { path: "$groups.admin", preserveNullAndEmptyArrays: true },
      },
      // Populate moderators
      {
        $lookup: {
          from: "users",
          localField: "groups.moderators",
          foreignField: "_id",
          as: "groups.moderators",
        },
      },
      // Populate members
      {
        $lookup: {
          from: "users",
          localField: "groups.members",
          foreignField: "_id",
          as: "groups.members",
        },
      },
      // Populate eventId
      {
        $lookup: {
          from: "events", // Reference the Event collection
          localField: "_id", // Since _id is now eventId
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      {
        $unwind: { path: "$eventDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          eventDetails: { $first: "$eventDetails" }, // Attach populated event details
          totalGroups: { $first: "$totalGroups" },
          membersCount: { $first: "$membersCount" },
          groups: { $push: "$groups" }, // Re-group populated groups
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No groups found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching grouped data:", error);
    res.status(500).json({ message: "Internal server error" });
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
      await joinRequest.save();

      await Group.findByIdAndUpdate(group._id, {
        $push: { members: joinRequest.user },
      });
      await User.findByIdAndUpdate(joinRequest.user, {
        $push: { groups: group._id },
      });
    } else if (action === "reject") {
      joinRequest.status = "rejected";
      await joinRequest.save();
    }

    res.status(200).json({ message: `Join request ${action}ed` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing join request", error: err });
  }
};

export const joinRequest = async (req, res) => {
  const { eventId, events } = req.body;
  const userId = "6740173101d916d7e6efdf2e";
  // const groupIds = JSON.parse(events);
  // console.log(groupIds);

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
export const getGroupJoinRequests = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const joinRequests =
      (await JoinRequest.find({
        group: groupId,
        status: "pending",
      })
        .populate("user", ["-password"])
        .populate("group")) || [];

    res.status(200).json(joinRequests);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching join requests", error: err });
  }
};
