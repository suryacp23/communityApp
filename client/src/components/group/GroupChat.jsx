import React, { useEffect, useRef, useState } from "react";
import { useGroup } from "../../hooks/useGroup";
import Avatar from "../Additionalui/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { useSocketContext } from "../../context/socketContext";
import { VscSend } from "react-icons/vsc";
import { chat } from "../../test";
import { getRandomColor } from "../../utils/color";

const GroupChat = ({ currentGroup }) => {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const groupid = currentGroup;
  const { getGroupInfo } = useGroup();
  const [groupInfo, setGroupInfo] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchGroup = async (groupid) => {
      const data = await getGroupInfo(groupid);
      setGroupInfo(data);
    };
    fetchGroup(groupid);
  }, [groupid, user]);

  useEffect(() => {
    socket?.emit("joinRoom", groupid);

    socket?.on("newMessage", (message) => {
      setConversation((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [groupid, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch("/api/message/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message: input, groupId: groupid }),
    });
    const data = await res.json();
    socket.emit("newMessage", data);
    setInput("");
  };
  const color = getRandomColor();

  return (
    <div className="relative h-full w-full bg-background flex justify-between flex-col">
      <div className="h-20 w-full  flex justify-center md:justify-start items-center p-3 gap-3 bg-gray-700 text-white">
        <Avatar size={"sm"} name={groupInfo?.name || "Group"} />
        <h1 className="text-lg font-semibold">
          {groupInfo?.name || "Group Name"}
        </h1>
      </div>

      <div className="flex flex-col overflow-y-scroll ">
        {chat.map((message, index) => {
          const isSender = message.id === 1;
          return (
            <div
              key={index}
              className={`flex items-end p-2 gap-1 ${
                isSender ? "flex-row-reverse" : "justify-start"
              }`}>
              <Avatar
                size="sm"
                name={message.name}
                className=""
                bgColor={getRandomColor()}
              />
              <div
                className={`max-w-[85%] w-fit md:max-w-[70%] rounded-lg text-justify p-2 ${
                  isSender
                    ? "bg-[#3c74d4fb] text-white rounded-br-none text-right"
                    : "bg-[#4c5259] text-white rounded-bl-none text-left"
                }`}>
                <p
                  className={`text-xs md:text-sm pb-1 text-slate-950 opacity-50 `}>
                  {message.name}
                </p>
                <p className="text-xs md:text-sm">{message.message}</p>
                <span
                  className={`text-xs text-slate-900 opacity-55 p-1 " ${
                    isSender ? " flex justify-start" : " flex justify-end"
                  }`}>
                  {message.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <form
      
        onSubmit={handleSend}
        className=" w-full md:w-full h-16 p-4 bg-gray-600 flex  items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex h-10 p-2 w-[95%] text-slate-200 bg-slate-700 rounded-full  border border-gray-500"
        />
        <button
          type="submit"
          className=" bg-slate-200 text-black p-2 rounded-full">
          <VscSend size={20} />
         
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
