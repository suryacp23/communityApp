import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/dashboard/events"> My Events</Link>
					</li>
					<li>
						<Link to="/dashboard/groups"> Groups</Link>
					</li>
					<li>
						<Link to="/dashboard/requests"> Requests</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
