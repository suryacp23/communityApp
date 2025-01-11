import React, { useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar";
import { useSocketContext } from "../context/socketContext";
import { VscSend } from "react-icons/vsc";
import { getRandomColor } from "../utils/color";
import { fetchChat, getgroupInfo } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { formatTimestamp } from "../utils/time";

const GroupChat = ({ currentGroup }) => {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const { socket } = useSocketContext();
  const groupid = currentGroup;
  const { user } = useAuth();

  const scrollRef = useRef(null);

  // Fetch Group Info
  const { data: groupInfo } = useQuery({
    queryKey: ["getgroups", groupid],
    queryFn: () => getgroupInfo(groupid),
    enabled: !!groupid, // Only fetch if groupid exists
  });
  console.log(groupInfo?.data);
  // Fetch Chat Messages
  const { data: conversationData } = useQuery({
    queryKey: ["fetchChat", groupid],
    queryFn: () => fetchChat(groupid),
    enabled: !!groupid, // Only fetch if groupid exists
    onSuccess: (data) => {
      setConversation(data); // Update conversation when chat data is fetched
    },
  });
  console.log(conversationData?.data);
  useEffect(() => {
    setConversation(conversationData?.data);
  }, [conversationData]);
  useEffect(() => {
    if (!groupid || !socket) return;

    socket.emit("joinRoom", groupid);

    socket.on("newMessage", (message) => {
      setConversation((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
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

  return (
    <div className="relative h-full w-full bg-background flex flex-col justify-between font-mochiy">
      <div className="h-20 w-full flex items-center p-3 gap-3 bg-gray-700 text-white">
        <Avatar size={"sm"} name={groupInfo?.data?.name || "Group name"} />
        <h1 className="text-lg font-semibold">
          {groupInfo?.data?.name || "Group Name"}
        </h1>
      </div>

      <ul className="flex flex-col gap-2 mx-auto p-2 overflow-y-scroll scroll-smooth">
        {conversation?.length == 0 && (
          <div
            className="h-full w-full flex
             justify-center items-center"
          >
            <p>start new conversation</p>
          </div>
        )}
        {conversation?.map((chat) => {
          const isSender = user._id === chat.senderId._id;
          // console.log(groupInfo);
          // console.log("group" + groupInfo.admin?._id);
          // console.log(groupInfo.admin?._id == chat.senderId._id);

          return (
            <li
              key={chat?._id}
              ref={scrollRef}
              className={`flex items-end ${
                isSender ? "flex-row-reverse" : "flex-row"
              } w-full`}
            >
              <div className={`${isSender ? "ml-2" : "mr-2"}`}>
                <Avatar size="sm" name={"u"} bgColor={getRandomColor()} />
              </div>

              <div
                className={`p-2 flex ${
                  isSender
                    ? "justify-end bg-[#3c74d4fb] "
                    : "justify-start bg-[#4c5259]"
                } flex-col text-slate-950 rounded-lg p-2 max-w-[50%] w-fit`}
              >
                <p
                  className={`text-xs ${
                    isSender ? "text-right" : "text-left"
                  }  p-1`}
                >
                  <span className="pr-2">{"~" + chat?.senderId?.userName}</span>
                  <span
                    className={`${
                      groupInfo?.admin?._id == chat.senderId._id
                        ? "inline-block"
                        : "hidden"
                    } bg-green-500 text-xs text-black px-2 rounded-full`}
                  >
                    admin
                  </span>
                </p>
                <p
                  className={` ${
                    isSender ? "ml-auto" : "mr-auto"
                  } font-mono p-2 `}
                >
                  {chat?.message}
                </p>
                <p
                  className={`text-xs ${
                    isSender ? "text-left" : "text-right"
                  }  p-1`}
                >
                  <span className="italic font-light text-slate-900 opacity-55">
                    {" "}
                    {formatTimestamp(chat.createdAt)}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={handleSend}
        className="w-full h-16 p-4 bg-gray-600 flex items-center justify-between"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="h-10 p-2 w-[95%] text-slate-200 bg-slate-700 rounded-full border border-gray-500"
        />
        <button
          type="submit"
          className="bg-slate-200 text-black p-2 rounded-full"
        >
          <VscSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
