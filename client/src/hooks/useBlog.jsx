import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
	const [blog, setBlog] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const getBlog = async (blogId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/blogs/${blogId}`, {
				method: "GET",
				credentials: "include",
			});
			const data = res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to fetch blog");
			} else {
				setBlog(data);
			}
		} catch (error) {
			console.log("Error fetching a blog: ", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const getBlogs = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/blogs", {
				method: "GET",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to fetch blogs");
			} else {
				setBlogs(data);
			}
		} catch (error) {
			console.log("Error fetching all blogs: ", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteBlog = async (blogId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/blog/${blogId}`, {
				method: "DELETE",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data["error"] || "Something went wrong");
			}
			toast.success("Blog deleted successfully");
			navigate("/");
		} catch (error) {
			toast.error(error);
			console.log("Error in deleting blog", error || error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateBlog = async (blogData, blogId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/blog/${blogId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(blogData),
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data["error"] || "Something went wrong");
			}
			toast.success("Blog updated successfully");
			navigate("/");
		} catch (error) {
			toast.error(error);
			console.log("Error in updating blog", error || error.message);
		} finally {
			setLoading(false);
		}
	};

	const createBlog = async (blogData) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/blog`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(blogData),
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data["error"] || "Something went wrong");
			}
			toast.success("Blog created successfully");
			navigate("/");
		} catch (error) {
			toast.error(error);
			console.log("Error in creating blog", error || error.message);
		} finally {
			setLoading(false);
		}
	};

	const blogValue = {
		blog,
		blogs,
		getBlog,
		getBlogs,
		deleteBlog,
		updateBlog,
		createBlog,
		loading,
	};
	return (
		<BlogContext.Provider value={blogValue}>
			{children}
		</BlogContext.Provider>
	);
};

export const useBlog = () => {
	return useContext(BlogContext);
};
