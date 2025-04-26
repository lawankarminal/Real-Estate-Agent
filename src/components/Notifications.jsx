import { useState } from "react";
import { IoClose } from "react-icons/io5";
import bell from "../assets/bell-icon.png";
import profile from "../assets/profile.png";

const NotificationCard = ({ image, text, date, onDelete }) => (
  <div className="flex items-center space-x-2 p-2 rounded-lg relative bg-[#DEF3F0]">
    <img src={image} alt="User avatar" className="w-12 h-12 rounded-full" />
    <div className="flex-1">
      <p className="text-[#4F5E71] font-medium">{text}</p>
      <span className="text-sm text-[#4F5E71]">{date}</span>
    </div>
    <button 
      onClick={onDelete} 
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800"
    >
      <IoClose />
    </button>
  </div>
);

export default function Notifications({ onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, image: "https://randomuser.me/api/portraits/women/1.jpg", text: "Lorem ipsum dolor sit amet consectetur.", date: "21 Feb 2025" },
    { id: 2, image: profile, text: "New property added to your list.", date: "22 Feb 2025" },
    { id: 3, image: profile, text: "A client has sent an enquiry.", date: "23 Feb 2025" },
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-10"
        onClick={onClose}
      ></div>

      {/* Notification Box Positioned at Top-Right */}
      <div 
        className="fixed top-20 right-20 w-[400px] h-[500px] bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex shadow-md items-center px-2 py-2 bg-[#F5F7F9] border-b border-[#BAC7D5] relative">
          <img
            src={bell}
            alt="Platform Logo"
            className="w-14 h-14 transform transition-transform duration-500 hover:scale-110 rounded-full"
          />
          <div className="ml-3 flex-1">
            <h2 className="text-lg text-[#252A31] font-semibold">Notifications</h2>
            <p className="font-[500] text-[#697D95]">See your updates here...</p>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-black hover:text-gray-600"
          >
            <IoClose />
          </button>
        </div>

        <div className="space-y-2 pt-3 px-2 overflow-auto flex-1">
          {notifications.length > 0 ? (
            notifications.map(({ id, image, text, date }) => (
              <NotificationCard
                key={id}
                image={image}
                text={text}
                date={date}
                onDelete={() => deleteNotification(id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-5">No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}
