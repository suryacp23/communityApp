import React, { useEffect, useState } from "react";

const LikeButton = ({ eventId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(`/api/like/${eventId}`);
      const data = await response.json();
      setLikes(data.likes);
      setLiked(data.liked);
    };
    fetchLikes();
  }, [eventId]);
  const handleLike = async () => {
    const response = await fetch(`/api/like/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
      credentials: "include",
    });
    const data = await response.json();
    setLikes(data.likes);
    setLiked(data.liked);
  };

  return (
    <button onClick={handleLike}>
      {liked ? "Unlike" : "Like"} ({likes})
    </button>
  );
};

export default LikeButton;
