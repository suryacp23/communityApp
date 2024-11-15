import { Link, UNSAFE_ViewTransitionContext } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {Spinner} from "@chakra-ui/react"

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
    <div className="flex h-[100vh] w-full  justify-center items-center">
      <div className=" text-white flex flex-col h-96 w-72 bg-black rounded-md items-center ">
        <div className=" h-1/6">
          <h4 className="m-4">Create An Account</h4>
        </div>

        <form
          className="flex flex-col w-full h-5/6 items-center justify-between "
          onSubmit={handleSignup}>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="username"
            maxLength={12}
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className=" pl-2 w-52 h-8 rounded-sm  bg-gray-600"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" pl-2 w-52 h-8 rounded-sm  bg-gray-600"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" pl-2 w-52 h-8 rounded-sm  bg-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-8  flex justify-center rounded-sm"
            disabled={loading}>
            {loading ? "loading..." : "Sign Up"}
            {loading && <Spinner size={"lg"} color={"white"} />}
          </button>
        </form>
        <div className="text-center h-2/5 pt-7">
          {" "}
          Already have an account?
          <Link to="/login" className="text-blue-500 ">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
