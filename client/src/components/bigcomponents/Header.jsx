import React from "react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { Avatar } from "../../components/ui/avatar";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, login, logout, loading } = useAuth();

  const handleSignout = async () => {
    await logout();
  };
  return (
    <div className="bg-oxford_blue">
      <div className="h-[12vh]  bg-transparent flex justify-between items-center ">
        <Link to="/" className="">
          <img src={logo} alt="logo" className="h-10 w-10 ml-3" />
        </Link>
        <nav className=" flex justify-end m-3 space-x-2 text-primary">
          <ul className="flex justify-center items-center gap-2">
            {user ? (
              <>
                <li>
                  <Link
                    to={"/createPost"}
                    className="flex justify-center items-center p-2 rounded-md bg-blue-600 hover:bg-blue-500"
                  >
                    Create post
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/chat"}
                    className="flex justify-center items-center p-2 rounded-md bg-blue-600 hover:bg-blue-500"
                  >
                    chat
                  </Link>
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
                        onClick={handleSignout}
                      >
                        Sign out
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </li>
              </>
            ) : (
              <>
                <Link
                  className="flex justify-center items-center p-2 w-20 rounded-md bg-blue-600  hover:bg-blue-500"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className=" flex justify-center items-center p-2 w-20 rounded-md  bg-blue-600  hover:bg-blue-500 "
                  to="/login"
                >
                  Log In
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
