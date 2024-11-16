import React from "react";

const CreateBlog = () => {
  return (
    <div className=" flex h-[100vh] w-full items-center justify-center">
      <div className=" h-4/6 w-1/4 border flex items-center justify-center  ">
        <form action="" className="flex flex-col justify-around h-5/6">
          <div className=" flex flex-col text-center">
            <h4>BLOG</h4>
          </div>
          <input type="text" className="pl-2 bg-gray-600 rounded-md"placeholder="Title" />
          <textarea
            type="text"
            className="max-w-full h-2/4 pl-2 bg-gray-600 rounded-md"
            placeholder="Description"
          />
          <input type="file" className="border rounded-md" />
          <button className="border bg-blue-500 rounded-md ">create blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
