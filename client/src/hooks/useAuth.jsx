import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
      if (!response.ok) throw new Error("Login failed");

      const fetchedUser = await response.json();
      setUser(fetchedUser);
      console.log(fetchedUser);
      localStorage.setItem("token", JSON.stringify(fetchedUser));
      navigate("/");
    } catch (error) {
      console.error(error);
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
      if (!response.ok) throw new Error("Signup failed");

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem("token", newUser.token);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
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
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
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

  const value = { user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
