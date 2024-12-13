import React from "react";
import Navbar from "../components/bigcomponents/Navbar";
import Blog from "../components/blog/Blog";
import SpinnerLogo from "../components/Additionalui/SpinnerLogo";
import { useQuery } from "@tanstack/react-query";



// const { isPending } = useQuery({
//   queryKey:["events"],
//   queryFn: async () => {
//     const response = await fetch("/api/blog/blogs");
//     return await response.json();
//   },
// });

const EventPage = () => {
  return (
    <div className="bg-primary1 w-screen h-screen ">
      <div className="w-10 h-[80vh] bg-pink-600 absolute top-20 left-0 rounded-e-full"></div>
      <div className="w-10 h-[80vh] bg-blue-500 absolute  right-0 top-20 rounded-s-full"></div>
      <Navbar />
      {/* {blogs?.map((blog) => {
        return <Blog key={blog._id} blog={blog} />;
      })} */}
    </div>
  );
};

export default EventPage;
