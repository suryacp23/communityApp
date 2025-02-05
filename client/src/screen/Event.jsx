import React from "react";
import EventSection from "../components/EventSection";
import CommentSection from "../components/CommentSection";
import { useParams } from "react-router-dom";
import { Fetchevent } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner";

const Event = () => {
  const { eventId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getevents", eventId],
    queryFn: () => Fetchevent(eventId),
    enabled: !!eventId,
  });

  const event = data?.event;

  
  return (
    <div className="w-full min-h-screen p-2">
      {isLoading ? (
        <div className="flex justify-center w-full items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <EventSection event={event} />
          <CommentSection eventId={eventId} />
          <ToastContainer />
        </>
      )}
    </div>
  );
};
export default Event;
