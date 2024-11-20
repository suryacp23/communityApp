import React, { useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";

const CreateBlog = () => {
  const { createBlog } = useBlog();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    user: user._id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} />
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

export default CreateBlog;
