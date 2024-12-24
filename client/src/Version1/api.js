
import axios from "axios";
export const fetchBlogs = async () => {
  const response = await fetch("/api/blog/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};
export const SignupData = async ({ userName, email, password }) => {
  return axios.post("/api/auth/signup", { userName, email, password });
};
export const logindata= async ({ userName, password }) => {
  return axios.post("/api/auth/login", { userName, password });
};    