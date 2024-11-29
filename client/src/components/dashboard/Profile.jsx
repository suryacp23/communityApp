import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { groups } from "../../test";
const Profile = () => {
	const { user } = useAuth();
	return (
		<div>
			<p>
				Username <span>{user.userName}</span>
			</p>
			<p>
				Email <span>{user.email}</span>
			</p>

			<div>
				<p>
					Events organized: <span>{groups.length}</span>
				</p>
			</div>
			<div>
				<p>Popularity/credits</p>
			</div>
		</div>
	);
};

export default Profile;
