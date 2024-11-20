import React, { useEffect, useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";

const EditBlog = () => {
  const { updateBlog, getBlog, blog } = useBlog();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    user: user._id,
  });
  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlog(blogId);
      console.log(data?.blog);
      setFormData({
        title: data?.blog.title || "",
        description: data?.blog.description || "",
        imageUrl: data?.blog.imageUrl || "",
        user: data?.blog.user._id || user._id,
      });
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(formData, blogId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="imageUrl"
          value={formData.file}
          onChange={handleChange}
        />
        <button type="submit">create blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
