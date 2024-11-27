import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { formatTimestamp } from "../../utils/time";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { MdModeComment } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";

const Blog = ({ blog }) => {
  return (
    <div className=" text-primary bg-oxford_blue hover:bg-new_blue shadow-md shadow-slate-500 max-w-[400px] flex text-ellipsis justify-around flex-col rounded-lg p-2 gap-2">
      <Link
        className=" font-sans text-xl text-blue-300 pl-2 cursor-pointer line-clamp-1"
        to={`/blogs?blogId=${blog._id}`}
      >
        {blog.title}
      </Link>
      <img
        src={blog.imageUrl}
        alt="blog image"
        className=" object-cover h-3/6 w-full"
      />

      <div className="pl-2 flex h-1/6 w-full items-center">
        <HStack gap="4">
          <Avatar name={blog.user.userName} size="lg" />
          <Stack gap="0">
            <Text fontWeight="medium">{blog.user.userName}</Text>
            <Text color="fg.muted" textStyle="sm">
              {formatTimestamp(blog.createdAt)}
            </Text>
          </Stack>
        </HStack>
      </div>
      <p className="line-clamp-2 text-sm text-center">{blog.description}</p>

      <div className=" w-full rounded-full flex gap-5 justify-center items-center">
        <div className="flex gap-2 items-center justify-center border border-transparent hover:border-slate-500 p-2 rounded">
          <BiSolidLike /> {blog?.likes ?? 0}
        </div>
        <div className="flex gap-2 items-center justify-center border border-transparent hover:border-slate-500 p-2 rounded">
          <MdModeComment /> {blog?.comments ?? 0}
        </div>
      </div>
    </div>
  );
};

export default Blog;
