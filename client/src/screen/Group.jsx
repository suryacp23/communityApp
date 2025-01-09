import React, { useEffect, useState } from "react";
import GroupChat from "../components/GroupChat";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import Avatar from "../components/Avatar";
import { IoMenu } from "react-icons/io5";
import { getRandomColor } from "../utils/color";
import { getgroups } from "../services/api";
import { useQuery } from "@tanstack/react-query";
const Group = () => {
  const [currentGroup, setCurrentGroup] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getgroups"],
    queryFn: getgroups,
  });
  console.log(data);
  console.log(currentGroup);
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center font-mochiy bg-background relative">
        <button
          onClick={toggleSidebar}
          className="absolute top-2 left-4 md:hidden bg-primary text-white p-2 rounded-lg shadow-lg z-30"
        >
          <IoMenu />
        </button>

        <div
          className={`h-full w-[95%] md:w-2/5 flex flex-col justify-between items-center absolute bg-primary select-none transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0 z-10 left-0" : "-translate-x-full  "
          } md:translate-x-0 md:relative `}
        >
          <div className="h-14 w-full flex items-center text-start p-2 gap-2 text-xl">
            <Link to="/">
              <ImHome className=" hidden md:block h-10 w-10 text-gray-600" />
            </Link>
            <div className="h-full w-1 bg-slate-950 hidden md:block"></div>
            <div className="h-full w-full flex justify-center md:justify-start">
              Groups
            </div>
          </div>

          <ul className="h-5/6 w-full flex flex-col gap-1 justify-start items-center">
            {data?.map((group) => (
              <li
                key={group._id}
                className={`hover:bg-gray-600 h-16 lg:h-16 w-[90%] p-2 cursor-pointer flex items-center rounded-md text-white hover:scale-x-105 hover:shadow-md transition-all duration-300 ${
                  currentGroup === group._id ? "bg-purple-600" : "bg-background"
                }`}
                onClick={() => setCurrentGroup(group._id)}
              >
                <Avatar
                  name={group.name}
                  size="md"
                  bgColor={getRandomColor()}
                />
                <h3 className="p-2">{group.name}</h3>
              </li>
            ))}
          </ul>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed  bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <div className=" hidden md:block h-full w-1 bg-slate-400"></div>
        <div
          className="h-full w-full md:w-3/4
      "
        >
          <GroupChat currentGroup={currentGroup} />
        </div>
      </div>
    </>
  );
};

export default Group;
