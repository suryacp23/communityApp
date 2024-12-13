import React from "react";
import { PasswordInput } from "../components/ui/password-input";
import { Link } from "react-router-dom";

const Signup1 = () => {
  
  return (
    <div className="h-screen w-screen relative bg-primary1 flex justify-end items-center  font-mochiy">
      <div className="h-10 w-[75vw] bg-pink-600 absolute top-0 left-0 rounded-br-full"></div>
      <div className="h-10 w-[75vw] bg-blue-500 absolute  right-0 bottom-0 rounded-tl-full"></div>
      <div className="h-4/5 w-4/5 flex flex-col justify-center items-center">
        <div className="h-3/4 w-3/4  flex justify-center relative items-center capitalize">
          <h4 className="absolute left-0  text-4xl p-10 font-mochiy  flex items-center h-full w-full">
            Unlock your potential log in and take the first step toward
            greatness!
          </h4>
        </div>
      </div>
      <div className="h-4/5 w-2/4 bg-violet-600 rounded-l-[20%] flex flex-col justify-center items-center">
        <form
          action=""
          className="h-4/5 w-3/5  flex flex-col gap-9 justify-center text-slate-950 items-center ">
          <input
            type="text"
            placeholder="UserName"
            className="bg-slate-100 h-12 w-full rounded-md placeholder-slate-700 pl-4  "
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-100 h-12 w-full rounded-md placeholder-slate-700 pl-4  "
          />
          <PasswordInput
            type="password"
            placeholder="Password"
            className="bg-slate-100 h-12 w-full rounded-md  placeholder-slate-700 pl-4  "
          />
          <button className="bg-slate-950 h-12 w-full text-slate-100 rounded-md text-xl ">
            LOGIN
          </button>
        </form>
        <div className="h-1/6 w-full flex justify-center items-start ">
          <h2>
            Already have account?
            <Link to={"/login1"} className="text-black">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup1;
