import React from "react";
import { formatTimestamp } from "../utils/time";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment._id}
      className="p-4 shadow-lg transition-all hover:shadow-xl hover:bg-zinc-800 text-white border-b-2 border-b-gray-800 hover:rounded-lg"
    >
      <div className="flex items-center mb-3 w-full">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center mr-3">
          <span className="text-sm font-semibold">
            {comment.user.userName[0].toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold">{comment.user.userName}</p>
        </div>
      </div>
      <p className="mt-2">{comment.comment}</p>
      <div className="w-full flex justify-end items-end opacity-30">
        <p className="text-sm font-light">
          {formatTimestamp(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Comment;
