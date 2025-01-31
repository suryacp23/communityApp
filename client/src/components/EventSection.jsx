import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Fetchevent } from "../services/api.js";
import { Link, useParams } from "react-router-dom";
import { deleteEvent } from "../services/api";


const EventSection = () => {
  const params = useParams();
  const eventid = params.eventId;
  const { data } = useQuery({
    queryKey: ["getevents", eventid],
    queryFn: () => Fetchevent(eventid),
  });
  const event = data?.event;
  console.log(data?.event);
  

  
  const { mutate, data: groups } = useMutation({
    mutationFn: (groupId) => request(groupId),
  });
  const handleJoin = async () => {
    mutate(groupId);
  };

  return (
    <div className="w-full bg-[#1f1f1f]  border border-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-2/3 p-6">
          <img
            src={event?.imageUrl}
            alt={event?.title}
            className="w-full h-[60vh] object-contain rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            {event?.title}
          </h1>
          <p className="text-gray-200">{event?.description}</p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 p-6 border-t md:border-t-0 md:border-l border-gray-800">
         
          <p className="text-gray-300 mb-4">
            <strong>Event Date:</strong> {event?.eventDate}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Start Time:</strong> {event?.startTime}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>End Time:</strong> {event?.endTime}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Technical Events:</strong> {event?.technical.join(", ")}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Non-Technical Events:</strong>{" "}
            {event?.nonTechnical.join(", ")}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Paid:</strong> {event?.paid ? "Yes" : "No"}
          </p>
          {event?.paid && (
            <p className="text-gray-300">
              <strong>Amount:</strong> ₹{event.amount}
            </p>
          )}
          <div className="h-1/5 w-full  py-4 justify-center items-center">
            <Link
              className={`px-3 py-2 bg-blue-500 rounded-lg`}
              to={`/payments/${eventid}`}>
              Apply
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-gray-100 text-sm px-6 py-4 text-right">
        <p>
          <strong>Posted by:</strong> {event?.userId.userName}
        </p>
      </div>
    </div>
  );
};

export default EventSection;
