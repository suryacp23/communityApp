import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ selection, setselection }) => {
  return (
    <div className="w-0 h-0 sm:h-[88vh] sm:w-[20vw] bg-gray-800 invisible sm:visible  2xl:text-2xl text-sm">
      <nav className="h-2/6 w-full flex  justify-center ">
        <ul className="h-full w-full flex flex-col justify-around p-1 text-left">
          <li
            className={`${
              selection === "MyEvents" ? "bg-gray-600" : " bg-gray-800"
            } h-2/6 w-full`}
            onClick={() => setselection("MyEvents")}
          >
            <Link
              className="h-full w-full flex justify-center items-center"
              to="/dashboard/events"
            >
              My Events
            </Link>
          </li>
          <li
            className={`${
              selection === "Groups" ? "bg-gray-600" : " bg-gray-800"
            } h-2/6 w-full`}
            onClick={() => setselection("Groups")}
          >
            <Link
              className="h-full w-full flex justify-center items-center"
              to="/dashboard/groups"
            >
              Groups
            </Link>
          </li>
          <li
            className={`${
              selection === "Requests" ? "bg-gray-600" : " bg-gray-800"
            } h-2/6 w-full`}
            onClick={() => setselection("Requests")}
          >
            <Link
              className="h-full w-full flex justify-center items-center"
              to="/dashboard/requests"
            >
              Requests
            </Link>
          </li>
          <li
            className={`${
              selection === "Chat" ? "bg-gray-600" : " bg-gray-800"
            } h-2/6 w-full`}
            onClick={() => setselection("chat")}
          >
            <Link
              to="/chat"
              className="h-full w-full flex justify-center items-center"
            >
              Chat
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
