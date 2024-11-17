import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/additionalui/Spinner";

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
    <div className="flex h-[100vh] w-full  justify-center items-center bg-[#1a1a1a]">
      <div
        className=" text-white bg-black flex flex-col h-96 w-72
    rounded-md items-center ">
        <h4 className="m-4">LOGIN</h4>
        <form action="" className=" flex flex-col items-center">
          <input
            className=" pl-2 w-52 h-8 mt-8 rounded-sm  bg-gray-600"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="pl-2 mt-8 h-8 w-52 rounded-sm bg-gray-600 "
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-7 m-8 flex justify-center items-center rounded-sm">
            {loading ? (
              <Spinner />
            ) : (
              <button
                className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-7 m-8 flex justify-center items-center rounded-sm"
                onClick={handleLogin}>
                log in
              </button>
            )}
          </div>
        </form>
        <div className="flex ">
          <p className="text-sm m-1 ">Don't have an account?</p>
          <Link className="text-blue-400" to={`/signup`}>
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
