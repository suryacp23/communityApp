import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";

const Blogpage = () => {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const { getBlog } = useBlog();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      const { blog } = await getBlog(blogId);
      setBlog(blog);
    };

    if (blogId) {
      fetchBlog();
    }
  }, []);
  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>created by {blog?.user.userName}</p>
      <img src={blog?.imageUrl} alt="" />
      <p>{blog?.description}</p>
    </div>
  );
};

export default Blogpage;
