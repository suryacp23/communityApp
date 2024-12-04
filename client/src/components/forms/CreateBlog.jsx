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
      <div className=" text-secondary flex items-center h-5/6 lg:h-4/6 2xl:h-3/6 w-5/6 sm:w-80 2xl:w-1/3 shadow-slate-300 shadow-sm justify-center bg-secondary">
        <form
          onSubmit={handleSubmit}
          className="h-5/6 lg:h-4/6 w-full pl-1 2xl:p-0 2xl:text-4xl flex flex-col gap-7 lg:gap-4 2xl:gap-14 lg:justify-around items-center ">
          <div className="flex justify-center  items-center text-black">
            <h1 >Blog</h1>
          </div>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="w-64 lg:w-72 2xl:w-5/6  rounded-md h-6 lg:h-8 2xl:h-20 pl-2  bg-slate-300 placeholder-black"
            placeholder="Title"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="  max-h-28 min-h-28 w-64 lg:w-72 2xl:w-5/6 2xl:max-h-64 2xl:min-h-64 rounded-md pl-2  bg-slate-300 placeholder-black"
            placeholder="Description"
          />
          <input
            type="file"
            name="imageUrl"
            ref={imageRef}
            onChange={handleFileChange}
            className="border border-gray-900  w-64 lg:w-72  2xl:w-5/6  bg-accent rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className=" bg-blue-600 hover:bg-blue-500 h-7 w-24  2xl:w-4/6  2xl:h-12 lg:w-28  rounded-md">
            create blog
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBlog;
