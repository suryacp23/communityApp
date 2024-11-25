import React from "react";
import logo from "../../assets/logo.svg";

const SpinnerLogo = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className=" animate-spin">
        <img src={logo} alt="logo" className="h-10 w-10 ml-3" />
      </div>
    </div>
  );
};

export default SpinnerLogo;
