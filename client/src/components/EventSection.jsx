import React from "react";

import { Link, useNavigate } from "react-router-dom";
import EventOptions from "./EventOptions.jsx";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { formatTimestamp } from "../utils/time.js";
import RequestButton from "./RequestButton.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import Avatar from "./Avatar.jsx";

const EventSection = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className=" mx-auto p-6 w-full bg-zinc-900 rounded-lg text-gray-100">
      {/* Header Section */}
      <header className="text-center relative">
        <MdOutlineArrowBackIosNew
          size={20}
          onClick={() => navigate(-1)}
          className="cursor-pointer transition-all ease-in-out hover:scale-150  rounded-full absolute sm:left-4 top-4"
        />
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{event?.title}</h1>
        <p className="text-sm md:text-lg text-gray-300">{`${event?.eventDate} ${event?.startTime} - ${event?.endTime}`}</p>
        <EventOptions event={event} />
      </header>

      {/* Event Image */}
      <section className="my-6 flex items-center justify-center">
        <img
          src={event?.imageUrl}
          alt={event?.title}
          className="w-5/6 object-cover rounded-lg shadow-md aspect-video"
        />
      </section>

      {/* Event Description */}
      <section className="my-6">
        <p className="text-lg text-gray-200">{event?.description}</p>
      </section>

      {/* Organizer Info */}
      <section className="my-6 flex-wrap gap-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar
            size="md"
            name={event?.userId?.userName}
            imageUrl={event?.userId?.profile_image_url}
          />

          <div>
            <h3 className="text-base md:text-xl font-semibold">
              {event?.userId?.userName}
            </h3>
            <p className="text-gray-200">{event?.userId?.email}</p>
            <h1 className="text-sm md:text-base">
              {formatTimestamp(event?.createdAt)}
            </h1>
          </div>
        </div>

        {user?._id === event?.userId?._id && (
          <div className="h-full w-full flex items-center md:items-end justify-center md:justify-end gap-3 md:gap-0">
            <div
              className="bg-blue-500 p-2 w-fit rounded-md  hover:bg-blue-600 transition cursor-pointer"
              onClick={() =>
                navigate(`/events/${event._id}/attendance/${event.title}`)
              }>
              <h1>Proceed to Attendance</h1>
            </div>
          </div>
        )}
      </section>

      <section className="my-6">
        <div className="mb-4">
          <h4 className="text-xl font-semibold">Technical Events:</h4>
          <ul className="list-disc pl-5">
            {event?.technical.map((technicalEvent, index) => (
              <li key={index} className="text-gray-200">
                {technicalEvent?.name || technicalEvent}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Non-Technical Events:</h4>
          <ul className="list-disc pl-5">
            {event?.nonTechnical.map((nonTechnicalEvent, index) => (
              <li key={index} className="text-gray-200">
                {nonTechnicalEvent?.name || nonTechnicalEvent}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing and Event Details */}
      <section className="my-6 bg-zinc-600 p-4 rounded-lg flex gap-2 flex-col">
        <p className="text-lg font-semibold">Price: ₹{event?.amount}</p>
        <p className="text-gray-200">
          {event?.paid ? "This is a paid event" : "This event is free"}
        </p>
        <p className="text-gray-200">
          Swags: {event?.swags ? "Provided" : "Not Provided"}
        </p>
        <p className="text-gray-200">
          Refreshments: {event?.refreshments ? "Provided" : "Not Provided"}
        </p>
        {event?.userId._id !== user._id &&
          (event?.paid ? (
            <Link
              className="p-2 bg-blue-500 w-fit rounded-lg text-center"
              to={`/payments/${event?._id}`}>
              Apply
            </Link>
          ) : (
            <RequestButton />
          ))}
      </section>

      {/* Interaction Buttons */}
      <section className="my-6 flex justify-between items-center">
        <p className="text-lg text-gray-200">{event?.comments} Comments</p>
        <button
          className={`px-6 py-2 text-white rounded-md hover:bg-gray-700 ${
            event?.likes?.includes(user._id) ? "bg-blue-500" : "bg-zinc-600"
          }`}>
          Like ({event?.likes?.length})
        </button>
      </section>
    </div>
  );
};

export default EventSection;
