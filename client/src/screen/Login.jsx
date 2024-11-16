import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import{ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const { user, login, logout, loading,status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    setPassword("");
    setUsername("");
   toast(status)
  };
  return (
    <div className="flex h-[100vh] w-full  justify-center items-center">
      <div className=" text-white flex flex-col h-96 w-72 bg-black rounded-md items-center ">
        <div className="h-1/6">
          <h4 className="m-4">LOGIN</h4>
        </div>
        <form
          action=""
          className=" flex flex-col w-full h-1/2 items-center justify-around ">
          <input
            className=" pl-2 w-52 h-8 rounded-sm  bg-gray-600"
            type="text"
            placeholder="Username"
            minLength={14}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="pl-2 h-8 w-52 rounded-sm bg-gray-600 "
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-8  flex justify-center rounded-sm"
            onClick={handleLogin}>
            {loading ? "loading" : "Log in"}
          </button>
        </form>
        <div className="flex w-full items-center justify-center h-1/6 pt-5 ">
          <p className="text-sm ">Don't have an account?</p>
          <Link className="text-blue-400" to={`/signup`}>
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
