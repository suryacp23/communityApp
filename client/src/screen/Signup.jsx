import { Link, UNSAFE_ViewTransitionContext } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="flex bg items-center justify-center min-h-screen bg-black-50">
      <div className="bg-black p-6 rounded-lg w-80 hover:shadow-gray-500 shadow-md">
        <form onSubmit={handleSignup}>
          <h4 className="m-4 text-center">Create An Account</h4>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  shadow-[0_0_20px_10px_rgba(59,130,246,0.6),_0_0_30px_rgba(59,130,246,0.4) w-full h-15 mb-0 p-2  justify-center rounded-md"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign Up"}
            {loading && <Spinner size={"lg"} color={"white"} />}
          </button>
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
