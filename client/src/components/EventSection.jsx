import React from "react";

import { Link, useNavigate } from "react-router-dom";
import EventOptions from "./EventOptions.jsx";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { formatTimestamp } from "../utils/time.js";
import RequestButton from "./RequestButton.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

const EventSection = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(event);
  return (
    <div className=" mx-auto p-6 w-full bg-zinc-900 rounded-lg text-gray-100">
      {/* Header Section */}
      <header className="text-center relative">
        <MdOutlineArrowBackIosNew
          size={20}
          onClick={() => navigate("/")}
          className="cursor-pointer transition-all ease-in-out hover:scale-150  rounded-full absolute sm:left-4 top-4"
        />
        <h1 className="text-4xl font-bold mb-4">{event?.title}</h1>
        <p className="text-lg text-gray-300">{`${event?.eventDate} ${event?.startTime} - ${event?.endTime}`}</p>
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
      <section className="my-6 flex items-center justify-between">
        <div className="flex">
          <img
            src={event?.userId?.profile_image_url}
            alt={event?.userId?.userName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{event?.userId?.userName}</h3>
            <p className="text-gray-200">{event?.userId?.email}</p>
          </div>
        </div>
        <div className="">
          <h1>{formatTimestamp(event?.createdAt)}</h1>
        </div>
      </section>

      {/* Event Skills */}
      <section className="my-6">
        <div className="mb-4">
          <h4 className="text-xl font-semibold">Technical Skills:</h4>
          <ul className="list-disc pl-5">
            {event?.technical.map((skill) => (
              <li key={skill} className="text-gray-200">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Non-Technical Skills:</h4>
          <ul className="list-disc pl-5">
            {event?.nonTechnical.map((skill) => (
              <li key={skill} className="text-gray-200">
                {skill}
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
        {event?.paid ? (
          <Link
            className={`p-2 bg-blue-500 w-fit rounded-lg text-center`}
            to={`/payments/${event?._id}`}
          >
            Apply
          </Link>
        ) : (
          <RequestButton />
        )}
      </section>

      {/* Interaction Buttons */}
      <section className="my-6 flex justify-between items-center">
        <p className="text-lg text-gray-200">{event?.comments} Comments</p>
        <button
          className={`px-6 py-2 text-white rounded-md hover:bg-gray-700 ${
            event?.likes?.includes(user._id) ? "bg-blue-500" : "bg-zinc-600"
          }`}
        >
          Like ({event?.likes?.length})
        </button>
      </section>
    </div>
  );
};

export default EventSection;
