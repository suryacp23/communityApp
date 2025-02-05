import Group from "../models/groupModel.js";
import JoinRequest from "../models/requestModel.js";
import User from "../models/userModel.js";

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
  try {
    const { groupId, userId } = req.body;

    // Fetch group and user in parallel for efficiency
    const [group, user] = await Promise.all([
      Group.findById(groupId).lean(),
      User.findOne({ email: userId }).lean(),
    ]);

    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admin.equals(req.user._id)) {
      return res.status(403).json({ message: "Only admin can add moderators" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    if (group.moderators.includes(user._id)) {
      return res.status(400).json({ message: "User is already a moderator" });
    }

    // Add moderator & ensure they are a member using `$addToSet` to avoid duplicates
    await Group.updateOne(
      { _id: groupId },
      { $addToSet: { moderators: user._id, members: user._id } }
    );

    return res.status(200).json({ message: "Moderator added successfully" });
  } catch (error) {
    console.error("Error adding moderator:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate("admin", ["-password"])
      .populate("moderators", ["-password"])
      .populate("members", ["-password"]);
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
    const role = req.query.role || "member"; // Get role from query params, default to "member"

    const matchCondition =
      role === "admin"
        ? { admin: userId } // Match groups where the user is an admin
        : { members: userId };

    const result = await Group.aggregate([
      {
        $match: matchCondition,
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
      return res.status(200).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching grouped data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    // Fetch join request and populate only required fields
    const joinRequest = await JoinRequest.findById(requestId)
      .populate("group", "members")
      .lean();

    if (!joinRequest || joinRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Invalid or already processed request" });
    }

    const groupId = joinRequest.group._id;
    const userId = joinRequest.user;

    const updateOperations = [
      { updateOne: { filter: { _id: requestId }, update: { status: action } } },
    ];

    if (action === "approve") {
      updateOperations.push(
        {
          updateOne: {
            filter: { _id: groupId },
            update: { $push: { members: userId } },
          },
        },
        {
          updateOne: {
            filter: { _id: userId },
            update: { $push: { groups: groupId } },
          },
        }
      );
    }

    // Perform updates in parallel using bulkWrite
    await Promise.all([
      JoinRequest.bulkWrite(updateOperations),
      Group.updateOne({ _id: groupId }, { $pull: { requests: userId } }), // Remove request from group's request list
    ]);

    return res
      .status(200)
      .json({ message: `Join request ${action}ed successfully` });
  } catch (error) {
    console.error("Approve Request Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const joinRequest = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user._id;

    // Fetch only required fields to minimize data retrieval
    const group = await Group.findById(groupId).select(
      "members requests admin"
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(userId) || group.requests.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Request already sent or user already a member" });
    }

    // Push request and save in a single operation
    group.requests.push(userId);
    await Promise.all([
      group.save(),
      JoinRequest.create({ user: userId, group: groupId, admin: group.admin }),
    ]);

    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error("Join Request Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getGroupJoinRequests = async (req, res) => {
  try {
    const adminId = req.user._id;
    const requests =
      (await JoinRequest.find({ admin: adminId })
        .populate("user", ["-password"])
        .populate("group")) || [];

    res.status(200).json(requests);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching join requests", error: err });
  }
};

export const getGroupByEventId = async (req, res) => {
  try {
    const groups = await Group.find({ eventId: req.params.eventId });

    const filteredGroups = groups
      .filter((group) => !group.isHead)
      .map((group) => ({
        _id: group._id,
        name: group.name,
      }));

    if (filteredGroups.length === 0) {
      return res.status(404).json({ message: "No groups found" });
    }

    res.status(200).json(filteredGroups);
  } catch (error) {
    console.log("getGroupByEventId controller error: " + error.message);
    res.status(400).json({ error: error.message });
  }
};
