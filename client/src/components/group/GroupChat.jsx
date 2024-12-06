import React, { useEffect, useRef, useState } from "react";
import { useGroup } from "../../hooks/useGroup";
import { Avatar } from "../../components/ui/avatar";
import { useAuth } from "../../hooks/useAuth";
import { useSocketContext } from "../../context/socketContext";
import { formatTimestamp } from "../../utils/time.js";
import { RiSendPlaneFill } from "react-icons/ri";

const GroupChat = ({ currentGroup }) => {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const groupid = currentGroup;
  const { getGroupInfo } = useGroup();
  const [groupInfo, setGroupInfo] = useState(null);
  // console.log(getGroupInfo(groupid));
  console.log(currentGroup);
  useEffect(() => {
    const fetchGroup = async (groupid) => {
      const data = await getGroupInfo(groupid);
      setGroupInfo(data);
      console.log(data);
    };
    fetchGroup(groupid);
  }, [groupid, user]);

  const scrollRef = useRef(null);
  console.log(groupInfo);

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
  const fetchChat = async () => {
    try {
      const data = await fetch(`/api/message/${groupid}`, {
        credentials: "include",
      });
      const chat = await data.json();
      setConversation(chat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChat();
    console.log(conversation);
  }, [groupid]);
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
    console.log(data);
    socket.emit("newMessage", data);
    setInput("");
  };
  return (
    <div className="relative h-full w-full shadow-md rounded-lg">
      <div className="w-full h-5/6 flex items-center justify-center">
        <ul className="flex flex-col gap-2 w-4/5 mx-auto h-[60vh] overflow-y-scroll scroll-smooth">
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
                  <Avatar name={chat?.senderId?.userName} />
                </div>

                <div
                  className={`p-2 flex ${
                    isSender ? "justify-end" : "justify-start"
                  } flex-col bg-violet-950 rounded-lg p-2 max-w-[50%] w-fit`}
                >
                  <p
                    className={`text-xs ${
                      isSender ? "text-right" : "text-left"
                    }  p-1`}
                  >
                    <span className="pr-2">
                      {"~" + chat?.senderId?.userName}
                    </span>
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
                    <span className="italic font-light">
                      {" "}
                      {formatTimestamp(chat.createdAt)}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <form onSubmit={handleSend} className="w-4/5 mx-auto flex gap-2 p-2">
        <input
          type="text"
          value={input}
          className="h-10 w-full rounded-full text-white bg-oxford_blue px-2"
          placeholder="Message"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="h-10 bg-purple-950 p-2 w-10 rounded-full flex justify-center items-center">
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
