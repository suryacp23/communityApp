import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/avatar";
import { formatTimestamp } from "../../utils/time";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { MdModeComment } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";

const Events = ({ blog }) => {
  return (
    <div className="h-[88vh] w-[40vw] flex justify-center items-center font-mochiy text-xs ">
      <div className=" flex flex-col justify-between  items-center  h-5/6 w-4/5 bg-[#1a1a1a] rounded-lg">
        <div className="h-3/5 w-full flex gap-5 justify-center items-start">
          <img
            className=" object-fill h-full w-full  rounded-lg"
            src={blog.imageUrl}
            alt="event image"
          />
        </div>
        <div className="flex flex-col h-2/6 w-full p-1">
          <div className="h-2/4 w-full flex gap-3 items-center text-sm ">
            <div className="line-clamp-1 p-1"> {blog.title}</div>
          </div>
          <div className="h-3/4 w-full flex items-center justify-between opacity-80 text-orange-400 p-2 ">
            {blog.user.userName}
            <div> {formatTimestamp(blog.createdAt)}</div>
          </div>
        </div>
        <div className="h-2/5 w-4/5 flex justify-between items-center text-black ">
          <Avatar
            size="lg"
            name={blog.user.userName}
            className="bg-[#535bf2]"
          />
          <div className="h-10 w-4/5 bg-white rounded-full flex justify-center items-center ">
            <div className="h-8 w-2/3 flex justify-between items-center ">
              <h3 className="">{blog?.likes ?? 0} Likes</h3>{" "}
              <h3>{blog?.comments ?? 0} Comments</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
