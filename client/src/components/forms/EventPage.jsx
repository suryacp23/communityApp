import React from "react";
import Navbar from "../bigcomponents/Navbar.jsx";
// import Blog from "../components/blog/Blog";
import SpinnerLogo from "../Additionalui/SpinnerLogo.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../services/api.js";
import Events from "../bigcomponents/Events.jsx";
import Spinner from "../Additionalui/Spinner.jsx";
import HamburgerMenu from "../bigcomponents/HamburgerMenu.jsx";

const EventPage = () => {
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["events"],
    queryFn: fetchBlogs,
  });
  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center backdrop-blur-3xl ">
        <Spinner className="" />
      </div>
    );
  if (isError) return <div>{error.message}</div>;
  console.log(data);
  const blogs = data?.blogs || [];
  return (
    <div className="bg-background w-screen h-screen flex justify-center relative items-center flex-col select-none">
      <div className=" absolute top-0 lg:top-0">
        <div className="hidden lg:block ">
          <Navbar />
        </div>
        <div className=" block lg:hidden ">
          <HamburgerMenu />
        </div>
      </div>
      <div className="hidden md:block  w-6 md:w-10 h-[85vh] bg-lightrose absolute top-0 left-0 rounded-br-full"></div>
      <div className="w-6 md:w-10 h-[84vh] hidden md:block  bg-lightblue absolute  right-0 bottom-0 rounded-tl-full"></div>
      <div className="w-[90vw] md:w-[89] h-screen lg:h-[84vh] flex justify-center scroll-smooth overflow-y-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-row-* h-4/6 md:h-5/6 lg:h-3/5 lg:w-4/5 content-start  lg:gap-10">
          {blogs.map((blog) => (
            <div className=" ">
              <Events key={blog._id} blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
