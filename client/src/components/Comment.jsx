import React from "react";
import { formatTimestamp } from "../utils/time";
import Avatar from "./Avatar";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment?._id}
      className="flex space-x-4 p-4  bg-zinc-800 w-full font-poppins rounded-lg  ">
      <div className="flex flex-col w-full">
        <div className="flex  w-full items-center space-x-2 justify-between">
          <span className="font-semibold text-white flex items-center space-x-2 gap-2 ">
            <Avatar
              size={"sm"}
              imageUrl={comment?.user?.profile_image_url}
              name={comment?.user?.userName}
            />
            {comment?.user?.userName}
          </span>
          <span className="text-sm text-gray-300">
            {formatTimestamp(comment?.createdAt)}
          </span>
        </div>
        <p className="mt-2 text-gray-200">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
