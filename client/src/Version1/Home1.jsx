import React from "react";
import Navbar from "../components/bigcomponents/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useBlog } from "../hooks/useBlog";

import Blog from "../components/blog/Blog";

const Home1 = () => {
  return (
    <div className=" bg-primary1  h-screen w-screen select-none flex flex-col justify-center items-center">
      <Navbar />
      <div className="h-3/5 w-12 bg-pink-600 absolute left-0 bottom-0 rounded-tr-full"></div>
      <div className="h-3/5 w-12 bg-blue-500 absolute top-0 right-0 rounded-bl-full"></div>
      <div className=" h-[88vh]   flex  flex-col justify-around items-center ">
        <div className="h-3/5 w-3/5 bg-[#1f1f1f] rounded-3xl flex  justify-center items-center ">
          <h2 className="text-4xl p-10 font-mochiy text-center  capitalize ">
            Simple registration, clear plans, and smooth communication for
            flawless events.
          </h2>
        </div>
        <Link
          to={"/login1"}
          className="flex justify-around h-11 w-2/6  items-center rounded-full text-blue-800 text-xl bg-black select-none">
          get started
        </Link>
      </div>
    </div>
  );
};

export default Home1;
