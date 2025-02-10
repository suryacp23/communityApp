import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { createComment } from "../services/api";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ eventId }) => {
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // Mutation to create a comment
  const { isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", eventId]);
      setCommentText("");
    },
   
  });

  // Handle Comment Submission
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!commentText.trim()) return;
    mutate({
      comment: commentText,
      user: user?._id,
      event: eventId,
    });
  };
  return (
    <form
      onSubmit={handleAddComment}
      className="bg-zinc-800 p-4 rounded-lg shadow-md w-full mx-auto font-poppins flex flex-col justify-end items-end"
    >
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        rows="3"
        className="w-full p-2 border border-zinc-500 text-zinc-100 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 max-h-[90px] min-h-[90px] "
      />
      <button
        type="submit"
        className="w-fit p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
