import React from "react";
import { joinRequests } from "../../test";
const Requests = () => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>User</th>
						<th>Group</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{joinRequests?.map((request, i) => (
						<tr key={i}>
							<td>{request.user}</td>
							<td>{request.group}</td>
							<td>{request.status}</td>
							<td>
								<button onClick={() => {}}>Approve</button>
								<button>Reject</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Requests;
