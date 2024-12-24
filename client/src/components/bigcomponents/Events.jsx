import React from "react";
import { Avatar } from "../ui/avatar";
import { formatTimestamp } from "../../utils/time";

const Events = ({ blog }) => {
  return (
    <div className="h-[96vh] lg:h-[96vh] w-[85vw] md:w-[73vw] lg:w-[40vw] flex justify-center items-center font-mochiy text-xs ">
      <div className="flex flex-col  lg:justify-between items-center h-4/6 w-full md:h-5/6 md:w-5/6 lg:h-[75%] lg:w-4/5 bg-[#1a1a1a] rounded-lg">
        <div className="h-1/2 md:h-3/5 lg:h-5/6 w-full flex justify-center items-start">
          <img
            className="object-cover aspect-video h-full w-full rounded-lg"
            src={blog.imageUrl}
            alt="event image"
          />
        </div>
        <div className="flex flex-col h-2/6 w-full p-1 ">
          <div className="h-1/2 w-full flex gap-1 lg:gap-3 items-start text-xs lg:text-sm">
            <div className="line-clamp-2 p-1">{blog.title}</div>
          </div>
          <div className="h-1/4 w-full flex items-center justify-between opacity-80 text-orange-400 p-3">
            <span>{blog.user.userName}</span>
            <span>{formatTimestamp(blog.createdAt)}</span>
          </div>
        </div>

        <div className="h-2/6 w-full lg:w-4/5 flex justify-between items-center text-black p-2 lg:p-0">
          <Avatar
            size="lg"
            name={blog.user.userName}
            className="bg-[#535bf2]"
          />
          <div className=" h-10 lg:h-10 w-4/5 bg-white rounded-full flex justify-center items-center">
            <div className="h-full w-4/5 lg:w-2/3 flex justify-between items-center text-xs md:text-sm">
              <h3>{blog?.likes ?? 0} Likes</h3>
              <h3>{blog?.comments ?? 0} Comments</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
