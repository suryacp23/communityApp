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
import logo from "../assets/logo.svg";
import { useBlog } from "../hooks/useBlog";
import Blog from "../components/blog/Blog";
const Demo = () => {
  return <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />;
};

const Home = () => {
  const { user, login, logout, loading } = useAuth();
  const { blogs, getBlogs } = useBlog();
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);
  const handleSignout = async () => {
    await logout();
  };
  return (
    <div className="p-2">
      <div className="h-[10vh] bg-transparent flex justify-between items-center ">
        <div className="">
          <img src={logo} alt="logo" className="h-10 w-10 text-black" />
        </div>
        <nav className=" flex justify-end m-3 space-x-2 text-slate-100">
          <ul className="flex justify-center items-center gap-2">
            {user ? (
              <>
                <li>
                  <Link
                    to={"/createPost"}
                    className="flex justify-center items-center p-2 rounded-md bg-blue-800 hover:bg-blue-600"
                  >
                    create post
                  </Link>
                </li>
                <li>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <div>
                        <Avatar name={user.userName} size="2xl" />
                      </div>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="useremail">{user.userName}</MenuItem>
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
                </li>
              </>
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
          </ul>
        </nav>
      </div>
      <div>
        {blogs?.map((blog) => {
          return <Blog key={blog._id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Home;
