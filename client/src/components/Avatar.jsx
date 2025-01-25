import React from "react";
import { getRandomColor } from "../utils/color"; // Adjust the path to your utility file

const Avatar = ({ size, name, className = "" }) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-sm";
      case "md":
        return "w-12 h-12 text-md";
      case "lg":
        return "w-16 h-16 text-lg";
      default:
        return "";
    }
  };

  // Get a consistent color based on the name
  const bgColor = getRandomColor(name);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${getSizeClass()} ${className}`}
      style={{ backgroundColor: bgColor }}>
      {name ? name.charAt(0).toUpperCase() : "U"}
    </div>
  );
};

export default Avatar;
