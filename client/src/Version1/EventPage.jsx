import React from "react";
import Navbar from "../components/bigcomponents/Navbar";
// import Blog from "../components/blog/Blog";
import SpinnerLogo from "../components/Additionalui/SpinnerLogo";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./api";
import Events from "./user/Events";
import Spinner from "../components/Additionalui/Spinner";

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
    <div className="bg-primary1 w-screen h-screen flex justify-center relative items-center flex-col select-none">
      <div className=" absolute top-0">
      <Navbar className=" " />

      </div>
      <div className="w-10 h-[84vh] bg-pink-600 absolute top-14 left-0 rounded-e-full"></div>
      <div className="w-10 h-[84vh] bg-blue-500 absolute  right-0 top-14 rounded-s-full"></div>
      <div className="w-[100vw] h-[80vh] flex justify-center scroll-smooth overflow-y-scroll">
        <div className="grid grid-cols-2 grid-row-* h-4/6 w-4/5 gap-10">
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
