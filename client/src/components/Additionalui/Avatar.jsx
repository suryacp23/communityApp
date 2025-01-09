import React from "react";

const Avatar = ({ size, name, className = "", bgColor = "#ccc" }) => {
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

  return (
    <div
      className={`flex items-center justify-center rounded-full ${getSizeClass()} ${className}`}
      style={{ backgroundColor: bgColor }} // Apply background color dynamically
    >
      {name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")}
    </div>
  );
};

export default Avatar;
