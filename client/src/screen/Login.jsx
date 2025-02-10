import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logindata } from "../services/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mutate, isPending, error, onSuccess } = useMutation({
    mutationFn: ({ userName, password }) => logindata({ userName, password }),
    onSuccess: (data) => {
      toast.success("Login Successful");
      localStorage.setItem("token", JSON.stringify(data));
      setUser(data);
      setuserName("");
      setPassword("");
      navigate("/events");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error.message);
    },
  });
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { userName, password },
         );

    setuserName("");
    setPassword("");
  };

  return (
    <div className="h-screen max-w-screen-2xl relative bg-background flex justify-center md:justify-end items-center">
      <div className="h-7 md:h-10 w-[90vw] md:w-[75vw] bg-lightrose absolute top-0 left-0 rounded-br-full"></div>
      <div className="h-7 md:h-10 w-[90vw] md:w-[75vw] bg-lightblue absolute  right-0 bottom-0 rounded-tl-full"></div>
      <div className="h-4/5 w-3/5  lg:w-4/5 hidden md:flex flex-col justify-center items-center">
        <div className="h-3/5 w-full lg:w-3/5 hidden md:flex justify-center relative items-center capitalize">
          <h4 className="absolute left-0 text-xl  lg:text-4xl p-10 font-mochiy  hidden md:flex items-center h-full w-full text-white">
            Unlock your potential log in and take the first step toward
            greatness!
          </h4>
        </div>
      </div>
      <div className="h-4/5 w-5/6  md:w-3/4 lg:w-1/2 bg-secondary rounded-md md:rounded-l-[20%] flex flex-col justify-center items-center text-sm md:text-xl">
        <h1 className="text-lg h-1/5 w-full flex justify-center items-end  md:text-2xl font-mochiy text-white">
          LOGIN
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="h-4/5 w-4/5  md:w-3/5 flex flex-col gap-9 justify-center text-slate-950 items-center "
        >
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="UserName"
            className="bg-slate-100 h-9 md:h-12 w-full text-xs md:text-base lg:text-xl rounded-md placeholder-slate-600 pl-4  "
          />
          <PasswordInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-slate-100 h-9 md:h-12 w-full text-xs md:text-base lg:text-xl rounded-md  placeholder-slate-600 pl-4  "
          />

          <div className="bg-slate-950 h-9 md:h-10 w-full text-slate-100 rounded-md md:text-lg lg:text-xl">
            {isPending ? (
              <div className="h-9 md:h-10 w-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-slate-950 h-9 md:h-10 w-full text-slate-100 rounded-md md:text-lg lg:text-xl"
                disabled={isPending}
              >
                Login
              </button>
            )}
          </div>
        </form>
        <div className="h-1/6 w-full flex justify-center items-start  text-xs md:text-base lg:text-xl ">
          <h2 className="flex gap-2">
            <span>don’t have account?</span>
            <Link to={"/signup"} className="text-blue-950 underline">
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
