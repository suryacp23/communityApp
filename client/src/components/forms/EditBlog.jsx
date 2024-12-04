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
  const [file, setFile] = useState();
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
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (file) {
      data.append("file", file);
    }
    data.append("user", formData.user);
    updateBlog(formData, blogId);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex h-[100vh] w-full  bg-richblack justify-center items-center ">
      <div
        className=" text-black flex 
    items-center h-5/6 lg:h-4/6 2xl:h-3/6 w-5/6 sm:w-80 2xl:w-1/3 shadow-slate-300 shadow-sm justify-center bg-secondary">
        <form
          onSubmit={handleSubmit}
          className=" h-5/6 lg:h-4/6 w-full pl-1 2xl:p-0 2xl:text-4xl flex flex-col gap-7 lg:gap-4 2xl:gap-14 lg:justify-around items-center ">
          <div className="flex justify-center  items-center ">
            <h1>Blog</h1>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="w-64 lg:w-72 2xl:w-5/6  rounded-md h-6 lg:h-8 2xl:h-20 pl-2  bg-slate-300 placeholder-black"
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className=" max-h-28 min-h-28 w-64 lg:w-72 2xl:w-5/6 2xl:max-h-64 2xl:min-h-64  rounded-md pl-2  bg-slate-300 placeholder-black"
          />
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            className="border border-gray-900 bg-accent w-64 lg:w-72  2xl:w-5/6   rounded-md"
          />
          <button
            type="submit"
            className=" bg-blue-500 hover:to-blue-400 h-7 w-24  2xl:w-4/6  2xl:h-12 lg:w-28 rounded-md">
            Edit blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
