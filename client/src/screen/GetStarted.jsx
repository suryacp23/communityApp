import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GetStarted = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/events");
      return;
    }
  }, [user]);
  return (
    <div className=" bg-background  relative h-screen select-none flex flex-col justify-center items-center">
      <div className=" h-full w-full flex pt-6  flex-col justify-center items-center ">
        <div className=" h-3/5 w-4/6  md:w-3/5 bg-primary rounded-3xl flex  justify-center items-center ">
          <h2 className=" text-base md:text-2xl lg:text-4xl p-3 md:p-10 font-mochiy text-white text-center  capitalize ">
            Simple registration, clear plans, and smooth communication for
            flawless events.
          </h2>
        </div>
        <div className=" h-1/5 w-full gap-4  md:w-3/5 flex justify-center items-end text-base md:text-xl ">
          <Link
            to={"/login"}
            className="flex justify-around h-12 md:h-14 w-4/6 text-base md:text-xl items-center rounded-full text-blue-800  bg-black select-none"
          >
            get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
