import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentSection = ({ eventId }) => {
  const { user } = useAuth();

  return (
    <div className="w-full mx-auto mt-5 bg-zinc-900 rounded-lg p-2">
      <h2 className="text-xl font-semibold mb-4 text-white text-center h-10 items-center flex justify-center">
        Comments
      </h2>
      {user ? (
        <CommentForm eventId={eventId} />
      ) : (
        <div className="w-full text-white p-2">
          <p>login to share your thoughts</p>
        </div>
      )}

      <CommentList eventId={eventId} />
    </div>
  );
};

export default CommentSection;
