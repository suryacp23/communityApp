export const fetchBlogs = async () => {
  const response = await fetch("/api/blog/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};
