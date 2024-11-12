import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    const fetchedUser = { id: 1, name: "John Doe", token: "mock-token" };
    setUser(fetchedUser);
    localStorage.setItem("token", fetchedUser.token);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchedUser = { id: 1, name: "John Doe", role: "admin", token };
      setUser(fetchedUser);
    }
    setLoading(false);
  }, []);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
