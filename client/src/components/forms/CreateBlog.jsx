import React, { useRef } from "react";

const CreateBlog = () => {
  const formRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    //add user data to form data
    //data.set("user","userId")
    //call createblog(data);
  }
  return (
    <div >
      <form ref={formRef} action="/api/blog" onSubmit={handleSubmit}encType="multipart/form-data">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <input type="file" name="file" />
        <button type="submit">create blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
