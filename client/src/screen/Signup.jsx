import { Link, UNSAFE_ViewTransitionContext } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Spinner from "../components/Additionalui/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { PasswordInput } from "../components/ui/password-input";

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
    <div className="flex h-[100vh] w-full  justify-center items-center bg-[url('./assets/bg-02.webp')]">
      <div
        className=" text-white bg-transparent flex flex-col h-4/6 w-72
      shadow-slate-300 shadow-sm items-center justify-around backdrop-blur-xl ">
        <div className="h-1/6 flex w-full justify-center items-center">
          <h4 className="text-center">Create An Account</h4>
        </div>
        <form
          onSubmit={handleSignup}
          className=" flex flex-col items-center justify-between h-3/6 ">
          <input
            type="username"
            id="username"
            name="username"
            placeholder="username"
            maxLength={10}
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="pl-2 w-52 h-8  rounded-sm text-slate-950 bg-slate-300"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-2 w-52 h-8  rounded-sm text-slate-950 bg-slate-300"
          />
          <PasswordInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            maxLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-2 w-52 h-8  rounded-sm text-slate-950 bg-slate-300"
          />
          <div className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-8 flex justify-center items-center rounded-sm">
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-52 h-8 flex justify-center items-center rounded-sm"
                disabled={loading}>
                Signup
              </button>
            )}
          </div>
        </form>
        <div className="text-center w-full h-1/5 flex justify-center items-center">
          Already have an account?
          <Link to="/login" className="text-blue-900 font-semibold pl-1">
            Log In
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
