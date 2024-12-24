import React from "react";
import Navbar from "../components/bigcomponents/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useBlog } from "../hooks/useBlog";
import Blog from "../components/blog/Blog";
import HamburgerMenu from "../components/bigcomponents/HamburgerMenu";

const Home1 = () => {
  return (
    <div className=" bg-background  relative h-screen w-screen select-none flex flex-col justify-center items-center font-mochiy">
      <div className=" absolute top-0 left-0">
        <div className="hidden lg:block ">
          <Navbar/>
        </div>
        <div className=" inline-block lg:hidden absolute ">
          <HamburgerMenu />
        </div>
      </div>
      <div className="h-4/5 w-8 md:w-12 bg-lightrose absolute left-0 bottom-0 rounded-tr-full"></div>
      <div className="h-3/5 w-8 md:w-12 bg-lightblue absolute top-0 right-0 rounded-bl-full"></div>
      <div className=" h-full w-full flex pt-6  flex-col justify-center items-center ">
        <div className=" h-3/5 w-4/6  md:w-3/5 bg-primary rounded-3xl flex  justify-center items-center ">
          <h2 className=" text-base md:text-2xl lg:text-4xl p-3 md:p-10 font-mochiy text-center  capitalize ">
            Simple registration, clear plans, and smooth communication for
            flawless events.
          </h2>
        </div>
        <div className=" h-1/5 w-full gap-4  md:w-3/5 flex justify-center items-end text-base md:text-xl ">
          <Link
            to={"/login1"}
            className="flex justify-around h-12 md:h-14 w-4/6 text-base md:text-xl items-center rounded-full text-blue-800  bg-black select-none">
            get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home1;
