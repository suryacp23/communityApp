import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getComments = async (blogId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comment/getPostComments/${blogId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch blog");
      } else {
        return data;
      }
    } catch (error) {
      console.log("Error fetching a blog: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const createComment = async (comment) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data["error"] || "Something went wrong");
      }
    } catch (error) {
      console.log("Error in creating blog", error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const commentValue = {
    createComment,
    getComments,
    loading,
  };
  return (
    <CommentContext.Provider value={commentValue}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentContext);
};
