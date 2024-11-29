import React from "react";
import { groups } from "../../test";
import { Link } from "react-router-dom";
const GroupPage = () => {
	const group = groups[0];
	return (
		<div>
			<h2>name</h2>
			<p>description</p>
			<Link to="/dashboard/events">All groups</Link>
			<p>
				Moderators: <span>group members count</span>
			</p>
			<p>
				Members: <span>group members count</span>
			</p>
			<section>
				<h2>Members</h2>
				<table>
					<tr>
						<th>Name</th>
						<th>Actions</th>
					</tr>
					<tbody>
						{group.members.map((member, i) => (
							<tr key={i}>
								<td>{member}</td>
								<td>Remove</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default GroupPage;
