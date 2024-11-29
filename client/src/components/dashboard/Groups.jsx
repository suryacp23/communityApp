import React from "react";
import { groups } from "../../test";
import Group from "../group/Group";
const Groups = () => {
	return (
		<div>
			<div>
				{groups.map((group, i) => (
					<Group key={i} group={group} />
				))}
			</div>
		</div>
	);
};

export default Groups;
