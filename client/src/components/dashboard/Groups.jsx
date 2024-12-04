import React from "react";
import { groups } from "../../test";
import Group from "../group/Group";
const Groups = () => {
  return (
    <div className=" w-[100vw] sm:w-[80vw] h-[88vh] flex justify-around   p-5 overflow-y-scroll ">
      <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 pt-9 2xl:gap-24 ">
        {groups.map((group, i) => (
          <Group key={i} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
