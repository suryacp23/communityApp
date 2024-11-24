import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Additionalui/Spinner";
import { PasswordInput } from "../components/ui/password-input";

const Login = () => {
  const { user, login, logout, loading, status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    setPassword("");
    setUsername("");
  };
  return (
    <div
      className="flex h-[100vh] w-full bg-richblack
     justify-center items-center">
      <div
        className=" text-primary flex flex-col  
    items-center h-4/6 min-w-72 justify-between bg-oxford_blue rounded-md">
        <div className="flex h-1/6 w-full justify-center items-center">
          <h4 className="">LOGIN</h4>
        </div>
        <form
          action=""
          className=" flex h-2/5 flex-col items-center justify-between">
          <input
            className=" pl-2 w-52 h-8 rounded-sm text-slate-950 bg-slate-300 placeholder-black"
            type="text"
            placeholder="Username"
            maxLength={10}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordInput
            className=" pl-2 w-52 h-8 rounded-sm text-slate-950 bg-slate-300 placeholder-black"
            type="password"
            placeholder="Password"
            maxLength={10}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="bg-blue-600 hover:bg-blue-500   w-52 h-7  flex justify-center items-center rounded-sm">
            {loading ? (
              <Spinner />
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-500 shadow-md   w-52 h-7  flex justify-center items-center rounded-sm"
                onClick={handleLogin}>
                {" "}
                Login{" "}
              </button>
            )}
          </div>
        </form>
        <div className="flex h-2/6 w-full justify-center items-center ">
          <p className="text-sm m-1 ">Don't have an account?</p>
          <Link className=" text-primary" to={`/signup`}>
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
