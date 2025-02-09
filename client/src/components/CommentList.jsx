import React from "react";
import Comment from "./Comment";
import { commentsFetch } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const CommentList = ({ eventId }) => {
  const {
    isLoading,
    error,
    isError,
    data: comments,
  } = useQuery({
    queryKey: ["comments", eventId],
    queryFn: () => commentsFetch(eventId),
    enabled: !!eventId,
    
  });
  return (
    <div className="flex flex-col bg-zinc-900 rounded-lg gap-2 py-2">
      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p>Error loading comments</p>
      ) : comments?.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <Comment key={comment?._id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;
