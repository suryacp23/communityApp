import React, { useEffect } from "react";
import { useBlog } from "../../hooks/useBlog.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import Blog from "../../components/user/Blog.jsx";
import Header from "../../components/bigcomponents/Header.jsx";
const MyBlogs = () => {
	const { blogs, getBlogs } = useBlog();
	const { user } = useAuth();
	// const { user } = useAuth();
	useEffect(() => {
		getBlogs(user._id);
	}, []);
	return (
		<div className=" bg-slate-600">
			<Header />
			<h1 className=" bg-slate-">My Blogs</h1>
			<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
				{blogs?.map((blog, i) => (
					<Blog key={i} blog={blog} i={i} />
				))}
			</div>
		</div>
	);
};

export default MyBlogs;
