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
    <div className="relative h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-between font-mochiy">
      {/* Header */}
      <div className=" h-20 md:h-16 w-full flex items-center  md:justify-start px-14 py-4 gap-4 shadow-lg text-white">
        <Avatar size="sm" name={groupInfo?.data?.name || "Group name"} />
        <h1 className="text-lg font-bold truncate ">
          {groupInfo?.data?.name || "Group Name"}
        </h1>
      </div>

      <ul className="flex flex-col gap-3 mx-4 p-4 overflow-y-auto scroll-smooth rounded-lg shadow-inner">
        {conversation?.length === 0 && (
          <div className="h-full w-full flex justify-center items-center text-gray-400">
            <p>Start a new conversation</p>
          </div>
        )}
        {conversation?.map((chat) => {
          const isSender = user._id === chat.senderId._id;
          return (
            <li
              key={chat?._id}
              ref={scrollRef}
              className={`flex items-end ${
                isSender ? "flex-row-reverse" : "flex-row"
              } w-full`}>
              {/* Avatar */}
              <div className={`${isSender ? "ml-3" : "mr-3"}`}>
                <Avatar
                  size="sm"
                  name={chat.senderId.userName}
                  bgColor={getRandomColor(chat.senderId.userName)}
                />
              </div>

              {/* Chat Bubble */}
              <div
                className={`p-2 flex ${
                  isSender
                    ? "justify-end bg-gray-800"
                    : "justify-start bg-gray-700"
                } flex-col text-white rounded-xl max-w-[60%] shadow-md`}>
                {/* Sender Info */}
                <p
                  className={`text-xs ${
                    isSender ? "text-right" : "text-left"
                  } mb-1`}>
                  <span
                    className=""
                    style={{ color: getRandomColor(chat?.senderId?.userName) }}>
                    {chat?.senderId?.userName}
                  </span>

                  <span
                    className={`${
                      groupInfo?.admin?._id === chat.senderId._id
                        ? "inline-block"
                        : "hidden"
                    } bg-green-500 text-xs text-black px-2 ml-2 rounded-full`}>
                    admin
                  </span>
                </p>
                {/* Message */}
                <p className="font-mono text-sm leading-relaxed">
                  {chat?.message}
                </p>
                {/* Timestamp */}
                <p
                  className={`text-xs font-mono ${
                    isSender ? "text-left" : "text-right"
                  } mt-2 text-gray-400`}>
                  {formatTimestamp(chat.createdAt)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="w-full h-16 px-4 py-2 bg-gray-700 flex items-center justify-between border-t border-gray-600">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="h-10 px-4 w-[90%] text-slate-200 bg-gray-800 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-transform transform hover:scale-110">
          <VscSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
