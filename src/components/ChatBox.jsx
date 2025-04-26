import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Chat from "/images/message-icon.png";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hey! Looking for property? Let’s Chat...", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send message to backend API
      await fetch("https://estate-project-5.onrender.com/api/v1/compalint/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ description: input }),
      });

      // Simulated bot reply after sending message
      setTimeout(() => {
        const botReply = {
          text: "Thanks for reaching out! How can I assist?",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Something went wrong. Please try again later.",
          sender: "bot",
        },
      ]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="fixed top-24 right-20 w-[400px] h-[600px] bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex shadow-md items-center px-2 py-2 bg-[#F5F7F9] border-b border-[#BAC7D5] relative">
        <img
          src={Chat}
          alt="Platform Logo"
          className="w-12 h-12 transform transition-transform duration-500 hover:scale-110 rounded-full"
        />
        <div className="ml-3 flex-1">
          <h2 className="text-lg text-[#252A31] font-semibold">Name of Platform</h2>
          <p className="font-[500] text-[#697D95]">Hey! Looking for property? Let’s Chat...</p>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-black hover:text-gray-600">
          <IoClose />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-3 rounded-lg max-w-[90%] text-base font-[500] ${msg.sender === "user"
                ? "bg-[#00A58E] text-white self-end ml-auto"
                : "bg-[#E8EDF1] text-[#4F5E71]"
              } mb-2`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="px-8 py-4 bg-white border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type Here"
          className="flex-1 text-sm bg-transparent border-b border-[#697D95] placeholder:text-[#697D95] focus:outline-none focus:border-gray-600 px-5 py-2"
        />
        <button
          onClick={sendMessage}
          className="ml-3 w-10 h-10 shadow-md bg-white rounded-full flex items-center justify-center text-[#00A58E] transition-all duration-300 hover:bg-teal-700 hover:text-white"
        >
          <IoIosSend className="w-8 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
