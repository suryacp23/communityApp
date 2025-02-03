import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getgroups } from "../services/api";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const GroupSidebar = ({
  setSelectedGroup,
  selectedGroup,
  toggleSidebar,
  isSidebarOpen,
}) => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getgroups"],
    queryFn: () => getgroups("member"),
  });

  const [openEvent, setOpenEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const toggleEvent = (eventId) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  return (
    <div
      className={`lg:w-1/3 w-full bg-zinc-900 z-10 text-white p-4 h-full overflow-y-auto rounded-lg fixed top-0 left-0 transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative lg:block`}
    >
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-2  top-2 left-2 text-white h-full justify-center">
          <MdOutlineArrowBackIosNew
            size={20}
            onClick={() => navigate("/")}
            className="cursor-pointer transition-all ease-in-out hover:scale-150  rounded-full"
          />
          <h2 className="text-xl font-bold">Events</h2>
        </div>
        <div className="lg:hidden p-4">
          <button onClick={toggleSidebar} className="text-white">
            X
          </button>
        </div>
      </div>

      {data?.map((event) => (
        <div key={event._id} className="mb-2">
          {/* Event Name (Folder) */}
          <div
            className={`cursor-pointer flex items-center rounded-lg p-2 hover:bg-gray-600 ${
              selectedEvent === event._id ? "bg-purple-700" : "bg-zinc-600"
            }`}
            onClick={() => toggleEvent(event._id)}
          >
            <span className="mr-2">
              {openEvent === event._id ? <FaChevronDown /> : <FaChevronRight />}
            </span>
            {event.eventDetails.title}
          </div>

          {/* Groups under Event */}
          {openEvent === event._id && (
            <div className="ml-6 mt-2 flex flex-col gap-1 ease-out">
              {event.groups.map((group) => (
                <div
                  key={group._id}
                  className={`cursor-pointer flex items-center hover:bg-gray-500 p-2 border-l-2 border-gray-100 ${
                    selectedGroup === group._id && selectedEvent === event._id
                      ? "bg-purple-500"
                      : "bg-zinc-600"
                  }`}
                  onClick={() => {
                    setSelectedGroup(group._id);
                    setSelectedEvent(event._id);
                    toggleSidebar();
                  }}
                >
                  {group.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupSidebar;
