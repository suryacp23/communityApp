import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const login = async (userName, password) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setStatus(errorData.error);
        return;
      }

      const fetchedUser = await response.json();
      setUser(fetchedUser);
      localStorage.setItem("token", JSON.stringify(fetchedUser));
      if (response.ok) {
        setStatus("login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setStatus("login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userName, email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setStatus(errorData.error);
        return;
      }

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem("token", newUser.token);
      if (response.ok) {
        setStatus("signed up successfully");
        navigate("/");
      }
    } catch (error) {
      setStatus("signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`/api/auth/logout`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      setUser(null);
      localStorage.removeItem("token");
      setStatus("Signed out successfully");
      navigate("/");
    } catch (error) {
      setStatus(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const fetchUser = async () => {
  //     if (token) {
  //       try {
  //         const response = await fetch(`${baseUrl}/me`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         if (!response.ok) throw new Error("Invalid token");

  //         const fetchedUser = await response.json();
  //         setUser(fetchedUser);
  //       } catch (error) {
  //         console.error("Error fetching user:", error);
  //         setUser(null);
  //         localStorage.removeItem("token");
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   fetchUser();
  // }, []);
  const value = { user, loading, status, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
