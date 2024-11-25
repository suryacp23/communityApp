import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { useComments } from "../hooks/useComments";
import Spinner from "../components/Additionalui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "../components/ui/avatar";
import { HStack, Stack, Text } from "@chakra-ui/react";
import ShareButton from "../components/Additionalui/ShareButton";
import { MdModeComment } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";

const Blogpage = () => {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const { getBlog } = useBlog();
  const { user } = useAuth();
  const { getComments, loading, createComment } = useComments();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  function formatTimestamp(isoTimestamp) {
    const date = new Date(isoTimestamp);

    // Extract individual components
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day
    const month = date.toLocaleString("en-US", { month: "short" }); // Get short month
    const year = date.getFullYear(); // Get full year
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure two digits for hours
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two digits for minutes

    // Return formatted string
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }
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
    <div className="">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-4/5 mx-auto flex items-center justify-center flex-col">
          <div className="w-full p-4 rounded-lg mt-4 flex flex-col gap-3">
            <h1 className="sm:text-5xl text-3xl text-center">{blog?.title}</h1>
            <img
              src={blog?.imageUrl}
              alt=""
              className="border-2 border-blue-900 rounded-md w-full"
            />
            <p className="sm:text-xl text-lg text-justify">
              {blog?.description}
            </p>
            <div
              className="border-b h-2 border-slate-400 rounded-full
             w-full"
            ></div>
            <p className="text-xl">
              created by{" "}
              <span className="text-blue-600 underline">
                @{blog?.user.userName}
              </span>
            </p>
            <Text color="fg.muted" textStyle="lg">
              {formatTimestamp(blog?.createdAt)}
            </Text>
          </div>
          {/* <hr className="border-1 w-full mt-4 border-slate-500" /> */}
          <div className=" p-2 bg-slate-600 mt-4 rounded-full flex gap-5 justify-center items-center">
            <div className="flex gap-2 items-center justify-center border border-transparent hover:border-slate-500 p-2 rounded">
              <BiSolidLike /> {comments.length}
            </div>
            <div className="flex gap-2 items-center justify-center border border-transparent hover:border-slate-500 p-2 rounded">
              <MdModeComment /> {comments.length}
            </div>
            <div className="flex gap-2 items-center justify-center border border-transparent hover:border-slate-500 p-2 rounded">
              <ShareButton message={blog?.description} />
            </div>
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
          <ul className="flex flex-col gap-2 w-4/5 mx-auto mt-4">
            {loading && <Spinner />}
            {comments.map((comment) => {
              return (
                <li
                  className="  p-2 border-b-2 border-slate-500 rounded-md"
                  key={comment?._id}
                >
                  <HStack key={comment._id} gap="4">
                    <Avatar name={comment.user.userName} size="lg" />
                    <Stack gap="0">
                      <Text fontWeight="medium">{comment.user.userName}</Text>
                      <Text color="fg.muted" textStyle="sm">
                        {formatTimestamp(comment.createdAt)}
                      </Text>
                    </Stack>
                  </HStack>
                  <div className="text-md p-2">
                    <p>{comment?.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Blogpage;
