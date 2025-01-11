import React from "react";
import { useQuery } from "@tanstack/react-query";
import { attendance } from "../services/api";
import Spinner from "../components/"

const Attendancepage = () => {
	const { isLoading, data } = useQuery({
		queryKey: ["attendance"],
		queryFn: attendance,
		refetchInterval: 100,
	});
	if (isLoading) {
		return <Spinner/>;
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
