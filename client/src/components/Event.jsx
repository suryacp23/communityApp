import React, { useState, useEffect } from "react";
import { MdModeComment } from "react-icons/md";
import { formatTimestamp } from "../utils/time";
import { formatCount } from "../utils/numberFormat";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import Avatar from "./Avatar";
import { FaHeart } from "react-icons/fa";

const Event = ({ event, toDisplay }) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	// Sync initial liked state from backend
	const [isLiked, setIsLiked] = useState(false);
	const liked = event?.likes?.includes(user?._id);
	const [likeCount, setLikeCount] = useState(0);
	const count = event?.likes?.length;
	useEffect(() => {
		setIsLiked(liked);
		setLikeCount(count);
	}, [event]);

	const { mutate } = useMutation({
		mutationFn: () => updateLike(event?._id),
		onMutate: async () => {
			// Optimistically update UI before API response
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

			// Cancel ongoing queries to avoid UI flickers
			await queryClient.cancelQueries(["event", event?._id]);
		},
		onError: (error) => {
						// Rollback on failure
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
		},
		onSettled: () => {
			// Refetch event to ensure correct state from backend
			queryClient.invalidateQueries(["event", event?._id]);
		},
	});

	const handleLike = () => {
		mutate(); // Trigger the API request
	};

	return (
		<div className="bg-[#1f1f1f] shadow-3xl rounded-lg overflow-hidden select-none">
			<div className="relative h-64 sm:h-80 md:h-96 lg:h-[50vh] xl:h-[60vh] w-full">
				<Link to={`/events/${event?._id}`} className="w-full h-full">
					<img
						src={event?.imageUrl || "/api/placeholder/400/320"}
						alt={event?.title || "Event Image"}
						className="object-cover w-full h-full rounded-lg z-0"
					/>
				</Link>
			</div>
			<div className="p-4">
				<h1 className="text-xl font-semibold text-white mb-2 truncate">
					{event?.title || "Untitled Event"}
				</h1>
				<div className="text-sm text-gray-400 flex items-center justify-between mb-4">
					{event?.paid ? (
						<span className="bg-green-500 rounded-full px-2 text-white">
							₹{event?.amount}
						</span>
					) : (
						<span className="bg-purple-500 rounded-full px-2 text-white">Free</span>
					)}
					<span>{formatTimestamp(event?.createdAt) || "No date"}</span>
				</div>
				{toDisplay && (
					<div className="flex justify-between items-center mt-2 w-full text-white shadow-3xl">
						<div className="bg-zinc-600 rounded-lg p-4 w-full">
							<div className="flex items-center justify-between w-full">
								{/* User Info */}
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-full overflow-hidden">
										<Avatar
											size="sm"
											imageUrl={event?.userId?.profile_image_url}
											name={event?.userId?.userName}
										/>
									</div>
									<div className="text-white font-bold text-sm">
										{event?.userId?.userName}
									</div>
								</div>

								{/* Stats */}
								<div className="flex items-center gap-4 text-sm">
									{/* Likes */}
									<div className="flex items-center gap-2">
										<span>{formatCount(likeCount)}</span>
										<span className="flex gap-1 text-lg font-semibold">
											<FaHeart
												size={20}
												onClick={handleLike}
												className={`cursor-pointer transition-colors duration-200 ${
													isLiked ? "text-red-500" : "text-zinc-100"
												}`}
											/>
										</span>
									</div>

									{/* Comments */}
									<div className="flex items-center space-x-1">
										<span className="font-semibold">
											{formatCount(event?.comments || 0)}
										</span>
										<MdModeComment size={20} />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Event;
