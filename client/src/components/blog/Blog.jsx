import React from "react";
import { useBlog } from "../../hooks/useBlog";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../ui/avatar";

const Blog = ({ blog }) => {
  const { deleteBlog, updateBlog } = useBlog();
  const navigate = useNavigate();
  const handleDelete = async () => {
    deleteBlog(blog._id);
  };
  const handleUpdate = () => { 
    navigate(`/editBlog?blogId=${blog._id}`);
  };
  return (
    <div className="h-[100vh] ">
      <div className=" text-primary bg-oxford_blue hover:bg-new_blue shadow-md shadow-slate-300  border w-80 h-72 flex text-ellipsis justify-around flex-col rounded-lg cursor-pointer">
        <div className=" font-sans text-lg text-blue-300 pl-2">
          {blog.title}
        </div>
        <img
          src={blog.imageUrl}
          alt="blog image"
          className="bg-cover h-2/5 w-full"
        />
        <div className="pl">
          <Avatar size="md" className="" />
        </div>

        <div className="h-1/4 w-full flex justify-center items-center">
          <p className=" line-clamp-2 text-sm text-center">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
