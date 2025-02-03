import React from "react";
import EventSection from "../components/EventSection";
import CommentSection from "../components/CommentSection";
import { useParams } from "react-router-dom";
import { Fetchevent } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const Event = () => {
  const { eventId } = useParams();
  const { data } = useQuery({
    queryKey: ["getevents", eventId],
    queryFn: () => Fetchevent(eventId),
    enabled: !!eventId,
  });
  const event = data?.event;
  console.log(event);

  return (
    <div className="w-full min-h-screen p-2">
      <EventSection event={event} />
      <CommentSection eventId={eventId} />
      <ToastContainer />
    </div>
  );
};
export default Event;
