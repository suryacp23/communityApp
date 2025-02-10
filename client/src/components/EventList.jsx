import Event from "./Event";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs } from "../services/api.js";
import Spinner from "./Spinner.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EventList = () => {
	const queryClient = useQueryClient();
	const location = useLocation();
	const [page, setPage] = useState(1);
	const { isLoading, isError, isSuccess, data } = useQuery({
		queryKey: ["events", page],
		queryFn: fetchBlogs,
		keepPreviousData: true,
	});
	if (isSuccess) window.scrollTo({ top: 0, behavior: "smooth" });
	useEffect(() => {
		queryClient.invalidateQueries(["events"]); // Invalidate and refetch events after navigation
	}, [location?.pathname, queryClient]);

	if (isLoading || isError) {
		return (
			<div className="h-[90vh] flex justify-center items-center backdrop-blur-3xl">
				<Spinner />
			</div>
		);
	}

	const events = data?.events || [];
	return (
		<div className="min-h-screen">
			<div className="w-full mx-auto h-auto p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
				{events?.map((event) => (
					<Event event={event} key={event?._id} toDisplay={true} />
				))}
			</div>
			<div className="flex justify-center items-center pb-10 mx-auto mt-3 space-x-4 ">
				<button
					className="px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
				>
					Previous
				</button>

				<span className="text-white">
					Page {page} of {data?.totalPages}
				</span>

				<button
					className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
					onClick={() => setPage((prev) => prev + 1)}
					disabled={page >= data?.totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default EventList;
