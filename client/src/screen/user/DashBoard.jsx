import React from "react";
import Header from "../../components/bigcomponents/Header.jsx";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/dashboard/NavBar.jsx";
import { useState } from "react";
const DashBoard = () => {
  const [selection, setselection] = useState("");
  const [aside, setaside] = useState(false);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="flex">
        <div className=" absolute">
          <nav className="h-10 w-10 p-2 sticky sm:hidden ">
            <button className="h-7 w-8 bg-transparent flex flex-col justify-between ">
              <div className="h-2 w-full bg-red-500"></div>
              <div className="h-2 w-full  bg-red-500 "></div>
              <div className="h-2 w-full  bg-red-500"></div>
            </button>
          </nav>
        </div>
        <NavBar selection={selection} setselection={setselection} />
        <div className="flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
