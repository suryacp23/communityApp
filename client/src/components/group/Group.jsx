import React from "react";
import { Link } from "react-router-dom";
const Group = ({ group }) => {
	return (
		<div>
			<h2>
				{group.name} @{group.blogId}
			</h2>

			<p>{group.description}</p>
			<p>
				Moderators: <span>{group.moderators.length}</span>
			</p>
			<p>
				Members: <span>{group.members.length}</span>
			</p>
			<Link to={`/dashboard/groups/${group._id}`}> Go to</Link>
		</div>
	);
};

export default Group;
