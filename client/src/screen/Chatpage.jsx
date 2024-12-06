import React, { useEffect, useState } from "react";
import GroupChat from "../components/group/GroupChat";
import { useGroup } from "../hooks/useGroup";
import Header from "../components/bigcomponents/Header";

const Chatpage = () => {
  const { getGroups } = useGroup();
  const [currentGroup, setCurrentGroup] = useState("");
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const data = await getGroups();
      console.log(data);
      setGroups(data);
    };
    fetchGroup();
  }, []);
  return (
    <>
      <Header />
      <div className="h-[88vh] w-full flex justify-center items-center">
        <div className="h-full w-1/4 flex justify-center items-center">
          <ul className="h-5/6 w-full flex flex-col gap-2 justify-start items-center">
            {groups?.map((group) => {
              return (
                <li
                  className={` hover:bg-purple-600 h-10 w-full p-2 cursor-pointer ${
                    currentGroup == group._id
                      ? "bg-purple-600"
                      : "bg-purple-950"
                  }`}
                  onClick={() => setCurrentGroup(group?._id)}
                >
                  {group?.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="h-full w-3/4
      "
        >
          <GroupChat currentGroup={currentGroup} />
        </div>
      </div>
    </>
  );
};

export default Chatpage;
