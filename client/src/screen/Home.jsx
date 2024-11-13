import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import { Button } from "@chakra-ui/react";
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
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-400 text-black p-2 rounded-sm"
              >
                {user.userName ?? "username"}
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="useremail">{user.email}</MenuItem>
              <MenuItem
                value="signout"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={handleSignout}
              >
                Sign out
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        ) : (
          <>
            <Link
              className="flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
              to="/signup"
            >
              Sign Up
            </Link>
            <Link
              className=" flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
              to="/login"
            >
              Log In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Home;
