import Group from "../models/groupModel.js";

export const createGroup = async (req, res) => {
	const { name, eventId } = req.body;

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
			return res
				.status(403)
				.json({ message: "Only admin can add moderators" });
		}

		if (group.moderators.includes(userId)) {
			return res
				.status(400)
				.json({ message: "User is already a moderator" });
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
		const group = await Group.findById(req.params.groupId).populate(
			"admin",
			["-password"]
		);
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
