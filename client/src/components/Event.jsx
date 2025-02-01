import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { MdModeComment } from "react-icons/md";
import { formatTimestamp } from "../utils/time";
import { formatCount } from "../utils/numberFormat";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const Event = ({ event }) => {
  return (
    <div className="bg-[#1f1f1f] shadow-3xl rounded-lg overflow-hidden select-none">
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[50vh] xl:h-[60vh] w-full">
        <Link to={`/events/${event._id}`} className="w-full h-full">
          <img
            src={event.imageUrl || "/api/placeholder/400/320"}
            alt={event.title || "Event Image"}
            className="object-cover w-full h-full rounded-lg z-0"
          />
        </Link>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-white mb-2 truncate">
          {event.title || "Untitled Event"}
        </h1>
        <div className="text-sm text-gray-400 flex items-center justify-between mb-4">
          <span>{event?.isPaid || "free"}</span>
          <span>{formatTimestamp(event.createdAt) || "No date"}</span>
        </div>
        <div className="flex justify-between items-center mt-2 w-full text-black shadow-3xl">
          <div className=" bg-[#D9D9D9] rounded-lg p-4 w-full">
            <div className="flex items-center justify-between w-full">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-black">
                  <img
                    src={event.imageUrl}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-black font-bold text-sm">
                  {event.userId.userName}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-black\80 text-sm">
                <div className="flex items-center space-x-1">
                  <span className=" text-lg font-semibold">
                    {formatCount(event.likes || 0)}
                  </span>
                  <p className=" text-sm">
                    <BiSolidLike size={25} />
                  </p>
                  <LikeButton eventId={event._id} />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold">
                    {formatCount(event.comments || 0)}
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
