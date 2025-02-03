import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { MdLight, MdModeComment } from "react-icons/md";
import { formatTimestamp } from "../utils/time";
import { formatCount } from "../utils/numberFormat";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike } from "../services/api";
import { getRandomColor } from "../utils/color";

const Event = ({ event }) => {
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(false);

  const { mutate, data, onSuccess } = useMutation({
    mutationFn: () => updateLike(event?._id),
    onSuccess: () => {
      // Refetch the event data to get the updated like count
      queryClient.invalidateQueries(["event", event?._id]);
    },
  });
  const [hashlike, setHashlike] = useState(true);
  const handleLike = () => {
    setIsLiked((prev) => !prev); // Toggle local like state
    mutate(); // Trigger the mutation
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
          {event.title || "Untitled Event"}
        </h1>
        <div className="text-sm text-gray-400 flex items-center justify-between mb-4">
          {event?.paid ? (
            <span className="bg-green-500 rounded-full px-2 text-white">
              ₹{event?.amount}
            </span>
          ) : (
            <span className="bg-purple-500 rounded-full px-2 text-white">
              free
            </span>
          )}
          <span>{formatTimestamp(event?.createdAt) || "No date"}</span>
        </div>
        <div className="flex justify-between items-center mt-2 w-full text-white shadow-3xl">
          <div className=" bg-zinc-600 rounded-lg p-4 w-full">
            <div className="flex items-center justify-between w-full">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={event?.userId?.profile_image_url}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white font-bold text-sm">
                  {event?.userId?.userName}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-black\80 text-sm">
                <div className="flex items-center gap-2">
                  <span className=" flex gap-1 text-lg font-semibold">
                    <BiSolidLike
                      size={25}
                      onClick={handleLike}
                      className={`cursor-pointer transition-colors duration-200 ${
                        isLiked && "text-blue-600"
                      }`}
                    />
                    <span>{formatCount(data?.likes ?? event?.likes)}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold">
                    {formatCount(event?.comments || 0)}
                  </span>
                  <p className="font-bold">
                    <MdModeComment size={25} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
