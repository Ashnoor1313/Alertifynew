import { FaRobot } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"; // Cross icon

function ChatButton({ chatOpen, setChatOpen }) {
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`flex items-center gap-3 ${
          chatOpen
            ? "bg-red-400 hover:from-red-500 hover:to-red-500"
            : "bg-gradient-to-r from-green-400 to-lime-400 hover:from-green-500 hover:to-lime-500"
        } text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white`}
      >
        <div
          className={`${
            chatOpen ? "bg-red-300" : "bg-green-300"
          } p-2 rounded-full shadow-inner`}
        >
          {chatOpen ? (
            <IoMdClose className="text-white text-lg" />
          ) : (
            <FaRobot className="text-white text-lg" />
          )}
        </div>
        <span className="font-bold text-md">
          {chatOpen ? "Close Chat" : "Chat with Sakhi"}
        </span>
      </button>

      {!chatOpen && (
        <div className="absolute -bottom-2 left-7 w-3 h-3 bg-green-400 rotate-45 border-l border-t border-white"></div>
      )}
    </div>
    
  );
}


export default ChatButton;

