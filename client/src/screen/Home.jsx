import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import Blog from "../components/blog/Blog";
import Header from "../components/bigcomponents/Header";

const Home = () => {
  const { blogs, getBlogs } = useBlog();
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);

  return (
    <div className="overflow-hidden select-none text-background bg-richblack">
      <Header />
      <div className="flex items-center justify-around m-14">
        <div className=" grid grid-cols-3 grid-rows-* gap-x-16 gap-y-10">
          {blogs?.map((blog) => {
            return <Blog key={blog._id} blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
