import { Avatar } from "../ui/avatar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";

const Navbar = () => {
  const handleSignout = async () => {
    await logout();
  };
  const navigate = useNavigate();
  const { user, login, logout, loading } = useAuth();
  const [active, setActive] = useState("Home");
  return (
    <div className="h-[12vh] w-screen flex justify-end">
      {user ? (
        <div className="h-full w-full flex justify-center items-center gap-x-8">
          <div className="h-10 w-1/2 flex justify-center p-2">
            <ul className=" h-full w-full flex justify-between items-center ">
              <li className="h-7 w-24 text-center  text-white">
                <Link
                  className="h-7 w-24 text-center text-white"
                  onClick={() => {
                    setActive("Home");
                    navigate("/home1");
                  }}>
                  Home
                </Link>
                <div
                  className={`${
                    active == "Home"
                      ? "h-1 w-24 bg-violet-500 rounded flex justify-center items-center"
                      : ""
                  }`}></div>
              </li>
              <li className="h-7 w-24 text-center   text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => {
                    setActive("Events");
                    navigate("/events");
                  }}>
                  Events
                </Link>
                <div
                  className={`${
                    active == "Events" ? "h-1 w-24 bg-violet-500 rounded " : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => setActive("Dashboard")}>
                  Dashboard
                </Link>
                <div
                  className={`${
                    active == "Dashboard"
                      ? "h-1 w-24 bg-violet-500 rounded "
                      : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => setActive("Groups")}>
                  Groups
                </Link>
                <div
                  className={`${
                    active == "Groups" ? "h-1 w-24 bg-violet-500 rounded " : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center  text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => {
                    setActive("CreateEvents");
                    navigate("/CreateEvents");
                  }}>
                  CreateEvents
                </Link>
                <div
                  className={`${
                    active == "CreateEvents"
                      ? "h-1 w-24 bg-violet-500 rounded "
                      : ""
                  } `}></div>
              </li>
              <li>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <div>
                      <Avatar name={user.userName} size="xl" />
                    </div>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem value="useremail">{user.userName}</MenuItem>
                    <MenuItem value="dashboard" className="border-none">
                      <Link className="w-full" to="/dashboard">
                        Dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem
                      value="signout"
                      color="fg.error"
                      _hover={{
                        bg: "bg.error",
                        color: "fg.error",
                      }}
                      onClick={handleSignout}>
                      Sign out
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center gap-x-8">
          <div className="h-10 w-1/2 flex justify-center p-2">
            <ul className=" h-full w-full flex justify-between items-center ">
              <li className="h-7 w-24 text-center  text-white">
                <Link
                  to={"/home1"}
                  className="h-7 w-24 text-center text-white"
                  onClick={() => {
                    setActive("Home");
                    navigate("/home1");
                  }}>
                  Home
                </Link>
                <div
                  className={`${
                    active == "Home"
                      ? "h-1 w-24 bg-violet-500 rounded flex justify-center items-center"
                      : ""
                  }`}></div>
              </li>
              <li className="h-7 w-24 text-center   text-white">
                <Link
                  to={"/eventpage"}
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => {
                    setActive("Events");
                    navigate("/eventpage");
                  }}>
                  Events
                </Link>
                <div
                  className={`${
                    active == "Events" ? "h-1 w-24 bg-violet-500 rounded " : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => setActive("Dashboard")}>
                  Dashboard
                </Link>
                <div
                  className={`${
                    active == "Dashboard"
                      ? "h-1 w-24 bg-violet-500 rounded "
                      : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => setActive("Groups")}>
                  Groups
                </Link>
                <div
                  className={`${
                    active == "Groups" ? "h-1 w-24 bg-violet-500 rounded " : ""
                  } `}></div>
              </li>
              <li className="h-7 w-24 text-center  text-white">
                <Link
                  className="h-7 w-24 text-center   text-white"
                  onClick={() => {
                    setActive("Login");
                    navigate("/login1");
                  }}>
                  Login
                </Link>
                <div
                  className={`${
                    active == "Login" ? "h-1 w-24 bg-violet-500 rounded " : ""
                  } `}></div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
