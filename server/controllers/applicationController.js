import Application from "../models/applicationModel.js";
import mutler from "multer";
import Group from "../models/groupModel.js";
import logger from '../utils/logger.js'
const upload = mutler();
export const createApplication = async (req, res) => {
	upload.none()(req, res, async (err) => {
		if (err) {
			return res.status(400).json({ error: "Invalid form-data" });
		}
		try {
			logger.info(req.body);
			const { userId, eventId, appliedTo } = req.body;
			const appliedToArr = JSON.parse(appliedTo);
			const groups = await Group.find({
				eventId,
				name: { $in: appliedToArr },
			}).select("_id");
			logger.info(groups);
			if (!groups || groups.length === 0) {
				return res.status(404).json({ messsage: "Event not found" });
			}

			const createdApplication = await Application.create({
				userId,
				eventId,
				appliedTo: appliedToArr,
			});
			// const applicationsToCreate = groups.map((group) => {
			// 	return {
			// 		userId,
			// 		eventId,
			// 		groupId: group._id,
			// 	};
			// });
			const updateGroupPromises = groups.map((group) =>
				Group.findByIdAndUpdate(
					group._id,
					{ $push: { members: userId } },
					{ new: true }
				)
			);
			Promise.all(updateGroupPromises);
			res.status(201).json({
				message: "Applied successfully",
			});
		} catch (error) {
			logger.error("Application controller error" + error.message);
			return res.status(500).json({ error: error.message });
		}
	});
};
