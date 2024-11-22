import React from "react";
import { useBlog } from "../../hooks/useBlog";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="border-2 border-white bg-purple-500 h-96 w-96">
      <div>
        <p>{blog.user.userName}</p>
        <p>{blog.user.email}</p>
      </div>
      <Link to={`/blogs?blogId=${blog._id}`}>{blog.title}</Link>
      <div>
        <img src="" alt="blog image" />
      </div>
      <div>
        <p className=" line-clamp-3">{blog.description}</p>
      </div>
      <button onClick={handleUpdate}>update</button>
      <button className="bg-red-500 p-2" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Blog;
