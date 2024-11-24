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
    data.append("description", formData.description)
    if (file) {
      data.append("file", file)
    }
    data.append("user", formData.user)
    updateBlog(formData, blogId);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  };

  return (
    <div className="flex h-[100vh] w-full  bg-richblack justify-center items-center ">
      <div
        className=" text-white flex 
    items-center h-4/6 min-w-80 shadow-slate-300 shadow-sm justify-center bg-secondary">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-3/6 h-4/5 justify-between items-center ">
          <h1>Blog</h1>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="w-72 rounded-md h-8 pl-2  bg-slate-300 placeholder-black"
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className=" max-h-28 min-h-28 w-72 rounded-md pl-2  bg-slate-300 placeholder-black"
          />
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            className="border border-gray-900 bg-accent rounded-md"
          />
          <button
            type="submit"
            className=" bg-blue-500 hover:to-blue-400 h-7 w-28 rounded-md">
            Edit blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
