import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { groups } from "../../test";
import { Avatar } from "../../components/ui/avatar";
import { MdVerified } from "react-icons/md";
const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="relative sm:w-[80vw]  h-[88vh] w-[95vw] mx-auto flex flex-col justify-center items-center shadow-md rounded-lg">
      <div className="w-4/5 h-1/2 flex flex-col justify-around items-center rounded-2xl ">
        <div className="  h-1/3 relative flex w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl">
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
          <div className="h-full w-1/2 flex justify-center items-center relative"></div>
          <div className="h-full w-1/2 flex flex-col justify-around">
            <p>
              Email <span>{user.email}</span>
            </p>

            <div>
              <p>
                Events organized: <span>{groups.length}</span>
              </p>
            </div>
            <div>
              <p>Popularity/credits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
