import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import { Avatar } from "../components/ui/avatar";
import { HStack } from "@chakra-ui/react";

const Demo = () => {
  return <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />;
};

const Home = () => {
  const { user, login, logout, loading } = useAuth();

  const handleSignout = async () => {
    await logout();
  };
  return (
    <div className="p-2">
      <nav className=" flex justify-end m-3 space-x-2 text-slate-100">
        {user ? (
          <MenuRoot>
            <MenuTrigger asChild>
              <div>
                <Avatar name={user.userName} size="2xl"  className="cursor-pointer bg-[]" />
              </div>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="useremail">{user.userName}</MenuItem>
              <MenuItem value="useremail">{user.email}</MenuItem>
              <MenuItem
                value="signout"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={handleSignout}>
                Sign out
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        ) : (
          <>
            <Link
              className="flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
              to="/signup">
              Sign Up
            </Link>
            <Link
              className=" flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
              to="/login">
              Log In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Home;
