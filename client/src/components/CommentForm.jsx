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
    onError: (error) => {
      console.error("Error adding comment:", error);
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
      user: user._id,
      event: eventId,
    });
  };
  return (
    <form
      onSubmit={handleAddComment}
      className="flex flex-col justify-end items-end">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        rows="3"
        className="w-full p-3 border text-white border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 mb-4 bg-zinc-600"
      />
      <button
        type="submit"
        className="px-4 w-fit py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-950 transition"
        disabled={isPending}>
        {isPending ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
