import { Link, UNSAFE_ViewTransitionContext } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/additionalui/Spinner";

const Signup = () => {
  const { loading, signup } = useAuth();
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && email && password) {
      signup(username, email, password);
    } else {
      console.log("Please fill all fields");
    }
  };

  return (
    <div className="flex h-[100vh] w-full  justify-center items-center bg-[#1a1a1a]">
      <div
        className=" text-white bg-black flex flex-col h-96 w-72
    rounded-md items-center ">
        <form onSubmit={handleSignup} className=" flex flex-col items-center">
          <h4 className="m-4 text-center">Create An Account</h4>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className=" pl-2 w-52 h-8 mt-8 rounded-sm  bg-gray-600"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" pl-2 w-52 h-8 mt-8 rounded-sm  bg-gray-600"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" pl-2 w-52 h-8 mt-8 rounded-sm  bg-gray-600"
          />

          <div className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-7 m-8 flex justify-center items-center rounded-sm">
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-7 m-8 flex justify-center items-center rounded-sm"
                disabled={loading}>
                Signup
              </button>
            )}{" "}
          </div>
        </form>
        <div className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
