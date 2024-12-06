import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { groups } from "../../test";
import { Avatar } from "../../components/ui/avatar";
import { MdVerified } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="relative sm:w-[80vw]  h-[88vh] w-[95vw] mx-auto flex flex-col justify-center items-center shadow-md rounded-lg">
      <div className="w-4/5 h-1/2 flex flex-col justify-around items-center rounded-2xl ">
        <div className="  h-1/3 relative flex w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl">
          <BiSolidPencil className="text-white absolute top-5 right-5 h-10 w-10 bg-black rounded-full p-2 hover:cursor-pointer" />
          <div className=" h-full w-1/4  flex flex-col gap-4 justify-center items-center absolute -translate-y-[-60%]">
            <Avatar
              name={user.userName}
              size="2xl"
              src="https://yt3.googleusercontent.com/g_bEA4DiQjWzCdRluwELXUOZ4zWelOaz_sFb61X6S2swcVTuGevoD1v-MDFZ0WS44IZ4zjNPEg=s900-c-k-c0x00ffffff-no-rj"
              className=" sm:h-44 sm:w-44 z-10"
            />
            <p className="text-3xl text-center  font-poppins capitalize flex gap-2  relative">
              <span>{user.userName}</span>{" "}
              <MdVerified className="absolute -right-8 top-1" />
            </p>
          </div>
        </div>
        <div className=" bg-oxford_blue w-full h-2/3 rounded-b-3xl flex justify-center items-center font-sans ">
          <div className="h-full w-1/5 flex justify-center items-center"></div>
          <div className="h-full w-4/5 flex justify-around items-center font-poppins">
            <FaLinkedin className="text-pink-400 h-10 w-10" />
            <BsGithub className="text-pink-400 h-10 w-10" />
            <div className="flex h-2/3 justify-around  flex-col">
              <p className=" font-poppins text-xl">
                <span>{user.email}</span>
              </p>
              <p className="">
                groups{" "}
                <span className=" text-pink-400 text-2xl">{groups.length}</span>
              </p>
            </div>
            <div className="flex h-2/3 justify-around flex-col">
              <p className="">
                most liked{" "}
                <span className=" text-pink-400 text-2xl">{groups.length}</span>
              </p>
              <p className="">
                most commented{" "}
                <span className=" text-pink-400 text-2xl">{groups.length}</span>
              </p>
            </div>
            <div className="flex h-2/3 justify-around flex-col">
              <p className="">
                events organised{" "}
                <span className=" text-pink-400 text-2xl">{groups.length}</span>
              </p>
              <p className="">
                events attended{" "}
                <span className=" text-pink-400 text-2xl">{groups.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
