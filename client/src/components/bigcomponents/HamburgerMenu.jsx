import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative font-mochiy z-30">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="fixed top-3 left-3 text-gray-800 text-xl">
        <IoMenu className="text-3xl text-gray-400" />
      </button>

      <nav
        className={`fixed top-0 left-0 h-full bg-[#5C5C5C] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[84vw] md:w-[90vw] `}>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-300 text-xl">
          &times;
        </button>
        <ul className="flex flex-col space-y-4 p-6">
          <li>
            <Link
              to={"/"}
              className="text-gray-300 hover:text-blue-500 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/events"}
              className="text-gray-300 hover:text-blue-500 transition-colors">
              Events
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              className="text-gray-300 hover:text-blue-500 transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={"/groups"}
              className="text-gray-300 hover:text-blue-500 transition-colors">
              Groups
            </Link>
          </li>
          <li>
            <Link
              to={"createEvents"}
              className="text-gray-300 hover:text-blue-500 transition-colors">
              CreateEvents
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
