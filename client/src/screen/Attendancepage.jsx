import React from "react";
import { useQuery } from "@tanstack/react-query";
import { attendance } from "../services/api";

const Attendancepage = () => {
	const { isLoading, data } = useQuery({
		queryKey: ["attendance"],
		queryFn: attendance,
		refetchInterval: 100,
	});
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			{data.map((attend) => {
				return <p>{attend.name + " " + attend.isAttended}</p>;
			})}
		</div>
	);
};

export default Attendancepage;
