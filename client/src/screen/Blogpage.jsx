import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { useComments } from "../hooks/useComments";
import Spinner from "../components/Additionalui/Spinner";
import { useAuth } from "../hooks/useAuth";

const Blogpage = () => {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const { getBlog } = useBlog();
  const { user } = useAuth();
  const { getComments, loading, createComment } = useComments();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const fetchBlog = async () => {
      const { blog } = await getBlog(blogId);
      const commentList = await getComments(blogId);
      setBlog(blog);
      setComments(commentList);
    };

    if (blogId) {
      fetchBlog();
    }
  }, []);
  const handleComment = async (e) => {
    e.preventDefault();
    await createComment({ comment, user: user._id, blog: blogId });
    const commentList = await getComments();
    setComments(commentList);
    setComment("");
  };
  return (
    <div>
      <div>
        <h1>{blog?.title}</h1>
        <p>created by {blog?.user.userName}</p>
        <img src={blog?.imageUrl} alt="" />
        <p>{blog?.description}</p>
      </div>
      {user && (
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>comment</button>
        </form>
      )}
      <ul className="flex flex-col gap-2 w-1/2 mx-auto">
        {loading && <Spinner />}
        {comments.map((comment) => {
          return (
            <li className="border-b-2 border-gray-600 p-2" key={comment?._id}>
              <div>
                <p>{comment.user.userName}</p>
              </div>
              <div className="">{comment?.comment}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blogpage;
