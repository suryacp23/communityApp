import React, { useRef, useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

const CreateBlog = () => {
  const { createBlog } = useBlog();
  const { user, loading } = useAuth();
  const imageRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: user._id,
  });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", file);
    data.append("user", formData.user);
    createBlog(data);
  };

  return (
    <div className="flex h-[100vh] w-full  bg-richblack justify-center items-center ">
      <div className=" text-white flex items-center h-4/6 min-w-80 shadow-slate-300 shadow-sm justify-center bg-secondary">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-3/6 h-4/5 justify-between items-center "
        >
          <h1>Blog</h1>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="w-72 rounded-md h-8 pl-2  bg-slate-300 placeholder-black"
            placeholder="Title"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className=" max-h-28 min-h-28 w-72 rounded-md pl-2  bg-slate-300 placeholder-black"
            placeholder="Description"
          />
          <input
            type="file"
            name="imageUrl"
            ref={imageRef}
            onChange={handleFileChange}
            className="border border-gray-900 bg-accent rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className=" bg-blue-600 hover:bg-blue-500 h-7 w-28 rounded-md"
          >
            create blog
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBlog;
