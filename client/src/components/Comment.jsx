import React from "react";
import { formatTimestamp } from "../utils/time";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment?._id}
      className="flex space-x-4 p-4 bg-zinc-800 w-full font-poppins rounded-lg"
    >
      <img
        src={comment?.user?.profile_image_url}
        alt={comment?.user?.userName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col w-full">
        <div className="flex  w-full items-center space-x-2 justify-between">
          <span className="font-semibold text-white">
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
