import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";
const Blog = ({ blog, i }) => {
  const { deleteBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteBlog(blog._id, user._id);
  };
  return (
    <div className=" relative bg-slate-700 max-w-[400px]  p-3 rounded-md flex flex-col gap-1 ">
      <div className="flex justify-between ">
        <Link
          className=" font-bold text-md lg:text-lg line-clamp-2 "
          to={`/blogs?blogId=${blog._id}`}
        >
          {blog.title}
        </Link>
        <div>
          <MenuRoot>
            <MenuTrigger className="text-lg hover:text-xl  h-6 py-0.5" asChild>
              <SlOptionsVertical className="bg-inherit text-white" />
            </MenuTrigger>
            <MenuContent className="absolute right-0">
              <MenuItem
                value="useremail"
                className="text-green-500 pl-3"
                onClick={() => {
                  navigate(`/editBlog?blogId=${blog._id}`);
                }}
              >
                <FaEdit className="inline text-md" />
                <span>Edit</span>
              </MenuItem>
              <MenuItem
                value="useremail "
                className="text-red-500"
                onClick={handleDelete}
              >
                <MdDeleteForever className="inline text-lg" />{" "}
                <span>Delete</span>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
      <div className=" flex-grow m-auto flex justify-center items-center">
        <img className="w-[80%] h-auto" src={blog.imageUrl} alt="blogImage" />
      </div>
      <p className=" line-clamp-1">{blog.description} </p>
      <div>
        <p className=" opacity-55 text-sm">
          Comments <span className="text-sm">85</span>
        </p>
      </div>
    </div>
  );
};

export default Blog;
