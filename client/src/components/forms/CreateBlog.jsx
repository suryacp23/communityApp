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
    <div className="flex h-[100vh] w-full bg-[url('./assets/bg-02.webp')]  justify-center items-center ">
      <div
        className=" text-white flex 
    items-center h-4/6 min-w-80 shadow-slate-300 shadow-sm justify-center backdrop-blur-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-3/6 h-4/5 justify-between items-center ">
          <h1>Blog</h1>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="w-72 rounded-md h-8 pl-2"
            placeholder="Title"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className=" max-h-28 min-h-28 w-72 rounded-md pl-2"
            placeholder="Description"
          />
          <input
            type="file"
            name="imageUrl"
            value={formData.file}
            onChange={handleChange}
            className="border border-gray-900 bg-cyan-600 rounded-md"
          />
          <button
            type="submit"
            className=" hover:bg-blue-500 bg-blue-700 h-7 w-28 rounded-md">
            create blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
