import React from "react";
import EventSection from "../components/EventSection";
import CommentSection from "../components/CommentSection";
import { Link, useParams } from "react-router-dom";

const Event = () => {
  const { eventId } = useParams();

  return (
    <div className="w-full min-h-screen p-2">
      <EventSection />
      <Link to={`/payments/${eventId}`}>payment</Link>
      <CommentSection eventId={eventId} />
    </div>
  );
};

export default Event;
