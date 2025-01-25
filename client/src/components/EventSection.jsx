import React from "react";
import { useMutation } from "@tanstack/react-query";
import { request } from "../services/api";

const EventSection = () => {
  const blogData = {
    title: "TechFest 2024",
    description: "A grand festival celebrating technology and innovation.",
    imageUrl:
      "https://imgs.search.brave.com/UbzRKgvPzPr8FEuIozbX7ohFztcZCeWKmX_OMv6xlew/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWVw/YWkub3JnL3N0YXRp/Yy9pbWFnZXMvZG9s/cGhpbjEuc3Zn",
    eventDate: "2024-01-15",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    technical: ["Coding Contest", "Tech Talks", "AI Workshop"],
    nonTechnical: ["Networking Session", "Career Guidance", "Fun Games"],
    paid: true,
    amount: 500,
    user: "John Doe",
  };
  const groupId = "67824d27290c008ea216b4ca";
  const { mutate, data } = useMutation({
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
            src={blogData.imageUrl}
            alt={blogData.title}
            className="w-full h-[60vh] object-contain rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            {blogData.title}
          </h1>
          <p className="text-gray-200">{blogData.description}</p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 p-6 border-t md:border-t-0 md:border-l border-gray-800">
          <p className="text-gray-300 mb-4">
            <strong>Event Date:</strong> {blogData.eventDate}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Start Time:</strong> {blogData.startTime}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>End Time:</strong> {blogData.endTime}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Technical Events:</strong> {blogData.technical.join(", ")}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Non-Technical Events:</strong>{" "}
            {blogData.nonTechnical.join(", ")}
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Paid:</strong> {blogData.paid ? "Yes" : "No"}
          </p>
          {blogData.paid && (
            <p className="text-gray-300">
              <strong>Amount:</strong> ₹{blogData.amount}
            </p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-gray-100 text-sm px-6 py-4 text-right">
        <p>
          <strong>Posted by:</strong> {blogData.user}
        </p>
        <button onClick={handleJoin}>join</button>
      </div>
    </div>
  );
};

export default EventSection;
