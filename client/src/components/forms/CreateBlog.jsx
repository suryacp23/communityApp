import React from "react";
import Spinner from "../additionalui/Spinner";

const CreateBlog = () => {
  return (
    <div>
      <Spinner />
      <form action="">
        <input type="text" />
        <textarea type="text" />
        <input type="file" />
        <button>create blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
