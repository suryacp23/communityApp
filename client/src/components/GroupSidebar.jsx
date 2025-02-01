import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getgroups } from "../services/api";
import { FaChevronDown, FaChevronRight, FaBars } from "react-icons/fa";

const GroupSidebar = ({
  setSelectedGroup,
  selectedGroup,
  toggleSidebar,
  isSidebarOpen,
}) => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getgroups"],
    queryFn: getgroups,
  });
  const [openEvent, setOpenEvent] = useState(null);

  const toggleEvent = (eventId) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`lg:w-1/3 w-full bg-zinc-900 text-white p-4 h-full overflow-y-auto rounded-lg fixed top-0 left-0 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:block`}
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Events</h2>
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
              className="cursor-pointer flex items-center rounded-lg bg-zinc-700 p-2  hover:bg-gray-600"
              onClick={() => {
                toggleEvent(event._id);
              }}
            >
              <span className="mr-2">
                {openEvent === event._id ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
              {event.eventDetails.title}
            </div>

            {/* Groups under Event */}
            {openEvent === event._id && (
              <div className="ml-6 mt-2 flex flex-col gap-1 ease-out">
                {event.groups.map((group) => (
                  <div
                    key={group._id}
                    className={`cursor-pointer flex items-center bg-zinc-600 hover:bg-gray-500 p-2 border-l-2 border-gray-100 ${
                      selectedGroup === group._id ? "bg-purple-500" : ""
                    }`}
                    onClick={() => {
                      setSelectedGroup(group._id);
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
    </>
  );
};

export default GroupSidebar;
