import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserMenu from "./AvatarMenu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchRoles, signout } from "../services/api";

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const [role, setRole] = useState("member");

  const { data } = useQuery({
    queryKey: ["role", user?.id],
    queryFn: fetchRoles,
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setRole(data);
    }
  }, [data]);

  const navLinks = [
    { label: "Events", href: "/events" },
    { label: "Groups", href: "/groups" },
    { label: "Create Events", href: "/create-events" },
  ];

  if (role?.host) {
    navLinks.push({ label: "Dashboard", href: "/dashboard" });
  } else if (role?.moderator) {
    navLinks.push({ label: "Request", href: "/request" });
  }
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      localStorage.removeItem("user");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  const handleLogout = () => {
    mutate(null, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  return (
    <header className="p-5 z-10 max-w-[1440px] mx-auto text-lavender_bush">
      <nav className="flex justify-between items-center">
        <Link to={"/events"} className=" scale-125">
          SUE
        </Link>
        {/* Desktop Navigation */}
        <ul className="flex justify-center items-center gap-16 max-lg:hidden relative">
          {navLinks.map((item) => (
            <li
              key={item?.label}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <Link to={item?.href} className={` text-lg text-white capitalize`}>
                {item?.label}
              </Link>
              <span
                className={`absolute left-0 bottom-[-8px] h-[5px] rounded-full bg-purple-500 transition-all duration-300 ${
                  location?.pathname === item?.href || hovered === item?.href
                    ? "w-full"
                    : "w-0"
                } ${location?.pathname === item?.href ? "bg-white" : ""}`}
              ></span>
            </li>
          ))}
          {user ? (
            <UserMenu />
          ) : (
            <li
              onMouseEnter={() => setHovered("/login")}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <Link to={"/login"} className="text-lg text-white capitalize">
                Login
              </Link>
              <span
                className={`absolute left-0 bottom-[-8px] h-[5px] rounded-full bg-purple-500 transition-all duration-300 ${
                  hovered === "/login" ? "w-full" : "w-0"
                }`}
              ></span>
            </li>
          )}
        </ul>
        {/* Hamburger Menu Button */}
        <div className="hidden max-lg:block">
          <button
            className="text-white text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
      {/* Sliding Full-Screen Menu */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full bg-[#1f1f1f] text-white p-5 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-lg font-bold absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        <ul className="flex flex-col items-center justify-evenly h-full gap-6">
          {navLinks.map((item) => (
            <li key={item?.label} className="text-lg w-full">
              <Link
                to={item?.href}
                className={`capitalize hover:text-purple-500 ${
                  location?.pathname === item?.href
                    ? "text-purple-500 font-bold"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                {item?.label}
              </Link>
            </li>
          ))}
          {user ? (
            <li className="w-full">
              <button
                className="text-red-50 bg-red-950 p-2 w-full text-lg"
                onClick={handleLogout}
              >
                sign out
              </button>
            </li>
          ) : (
            <li
              onMouseEnter={() => setHovered("/login")}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <Link to={"/login"} className="text-lg text-white capitalize">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
