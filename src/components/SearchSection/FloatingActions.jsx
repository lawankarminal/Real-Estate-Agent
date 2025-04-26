import { useState } from "react";
import ChatBox from "../ChatBox";

const FloatingActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCloseChat = (e) => {
    if (e.target.id === "overlay") {
      setIsChatOpen(false);
    }
  };

  return (
    <>
      <div className="fixed  right-[5%] flex flex-col gap-3 z-[40]">
        {/* Notifications Button */}

        {/* Messages Button */}
        <button
          className="transition-shadow p-0 hover:scale-105"
          onClick={() => setIsChatOpen(true)}
        >
          <img
            src="/images/message-icon.png"
            alt="Messages"
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </button>
      </div>

      {isChatOpen && (
        <div
          id="overlay"
          className="fixed inset-0 flex justify-end items-end z-[50] "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseChat}
        >
          <div className="z-[70]">
            <ChatBox onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
