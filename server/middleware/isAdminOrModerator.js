import Group from "../models/groupModel";

const isAdminOrModerator = async (req, res, next) => {
  const { userId } = req.user;
  const { groupId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isAuthorized =
      group.admin.equals(userId) || group.moderators.includes(userId);

    if (!isAuthorized) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Error authorizing user", error: err });
  }
};

export default isAdminOrModerator;
