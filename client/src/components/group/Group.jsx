import React from "react";
import { Link } from "react-router-dom";
const Group = ({ group }) => {
  return (
    <div
      className="border rounded-md 2xl:text-xl 2xl:h-72 2xl:w-72 min-w-64 min-h-60
     text-sm lg:text-base bg-ultra_violet  flex flex-col text-left">
      <div className="flex flex-col justify-around h-full w-full pl-2 pt-2">
        <div className="h-4/6 w-full flex flex-col gap-2  ">
          <h2 className="text-xl 2xl:text-2xl font-bold text-green-500 h-1/6 w-full uppercase gap-2">
            {group.name}
          </h2>
          <h2> @{group.blogId}</h2>
          <p className=" line-clamp-4 capitalize">{group.description}</p>
        </div>
        <div className="h-2/6 w-full gap flex flex-col">
          <p>
            Moderators: <span>{group.moderators.length}</span>
          </p>
          <p>
            Members: <span>{group.members.length}</span>
          </p>
        </div>
      </div>

      <div className="text-center pl-2 h-2/6 w-full flex  justify-center  ">
        <div className="h-7 w-14 2xl:h-11 2xl:w-2/5 bg-violet-600 rounded-md">
          <Link
            className="h-7 w-14 2xl:h-11 2xl:w-2/5  text-center rounded-md "
            to={`/dashboard/groups/${group._id}`}>
            Go to
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Group;
