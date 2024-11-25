import React, { useState } from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaTelegram,
  FaEnvelope,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { RiShareFill } from "react-icons/ri";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";

function ShareButton({ message }) {
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;
  const messageContent = message;

  const platforms = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(
        messageContent + " " + currentUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-blue-400" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        messageContent
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-gray-500" />,
      url: `mailto:?subject=${encodeURIComponent(
        "Amazing Website"
      )}&body=${encodeURIComponent(messageContent + " " + currentUrl)}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="text-blue-500" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(messageContent)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl); // Copy URL to clipboard
      setIsCopied(true); // Set success state
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild className="flex items-center justify-center">
        <RiShareFill />
      </MenuTrigger>
      <MenuContent>
        {platforms.map((platform) => (
          <MenuItem
            key={platform.name}
            as="a"
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-pointer hover:bg-black"
          >
            <div className="flex items-center gap-2">
              {platform.icon}
              {platform.name}
            </div>
          </MenuItem>
        ))}
        <MenuItem
          onClick={copyToClipboard}
          className="flex items-center gap-2 hover:cursor-pointer hover:bg-black"
        >
          {isCopied ? <FaCheck className="text-green-600" /> : <FaCopy />}
          {isCopied ? "Copied!" : "Copy URL"}
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}

export default ShareButton;
