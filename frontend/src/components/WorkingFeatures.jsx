import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingShape from '../components/FloatingShape';
import { useAuthStore } from '../store/authStore';
import FancyHeading from '../components/FancyHeading';
import Robot from './Robot';
import ChatBot from '../components/ChatBot';
import ChatButton from '../components/Chatbutton';
import {
  FaQrcode, FaCommentDots, FaPhoneAlt, FaLink,
  FaShieldAlt, FaWallet
} from 'react-icons/fa';

const actionsLeft = [
  { icon: <FaQrcode size={24} />, title: 'QR Scan', tip: 'Scan payment QR codes securely' },
  { icon: <FaCommentDots size={24} />, title: 'Messages', tip: 'Detect scam SMS/WhatsApp messages' },
  { icon: <FaPhoneAlt size={24} />, title: 'Phone Number', tip: 'Verify spam callers' },
];

const actionsRight = [
  { icon: <FaLink size={24} />, title: 'URL Check', tip: 'Check website safety before clicking' },
  { icon: <FaShieldAlt size={24} />, title: 'UPI ID', tip: 'Validate UPI for authenticity' },
  { icon: <FaWallet size={24} />, title: 'Crypto Wallet', tip: 'Prevent wallet phishing attempts' },
];

const WelcomeBanner = ({ userName }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-4xl mx-auto mt-0 bg-gradient-to-r from-emerald-800/50 to-teal-800/50 backdrop-blur-md rounded-2xl px-8 py-6 text-center text-white border border-emerald-400/20 shadow-lg"
  >
    <h1 className="text-3xl font-bold mb-3 text-white">
      Welcome Back, <span className="text-emerald-300">{userName}!</span>
    </h1>
    <p className="text-lg text-emerald-100 mb-4">
      Explore secure verification with QR, Phone, UPI, Crypto and more
    </p>

    <div className="relative">
      <FancyHeading
        text="I'm Sakhi, how can I help?"
        fontSize="1.8rem"
        colorFrom="#4fd1c5"
        colorTo="#38b2ac"
        className="py-2"
      />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuthStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const welcomeMessage = `Hello ${user?.name || 'User'}, I'm Sakhi. How can I help you today?`;
    const synth = window.speechSynthesis;

    if ('speechSynthesis' in window && !synth.speaking) {
      const utter = new SpeechSynthesisUtterance(welcomeMessage);
      utter.pitch = 1;
      utter.rate = 1;
      synth.speak(utter);
    }
  }, []);

  const handleUserChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput };
    const botMsg = {
      sender: 'sakhi',
      text: `That's interesting! Let's look into "${chatInput}"...`,
    };
    setChatMessages([...chatMessages, userMsg, botMsg]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.5} />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:block fixed top-[80px] left-0 w-[260px] min-h-screen bg-gradient-to-br from-[#013D34] to-[#015C4A] p-6 text-white shadow-lg z-10"
      >
        <h2 className="text-lg font-semibold mb-4">🛡️ Scan Protection Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-emerald-200 text-sm">
          <li>3 Suspicious URLs flagged</li>
          <li>2 UPI scam attempts blocked</li>
          <li>1 Crypto fraud attempt prevented</li>
          <li>5 Messages scanned</li>
        </ul>

        <div className="mt-4">
          <h3 className="text-sm text-white mb-2">🔒 Threat Level:</h3>
          <div className="h-2 rounded bg-red-500 w-[80%] mx-auto animate-pulse"></div>
        </div>

        <div className="mt-6 text-xs italic text-emerald-200">
          💡 Never share OTPs with unknown callers.
        </div>
      </motion.aside>

      {/* Main Content */}
      <section className="lg:ml-[260px] mt-[80px] min-h-screen w-full px-4 py-6">
        <WelcomeBanner userName={user?.name || 'User'} />

        <div className="max-w-6xl mx-auto mt-10 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Section - Hidden on mobile */}
          <div className="hidden md:flex flex-col gap-10 w-[350px]">
            {actionsLeft.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="w-full h-[90px] bg-gradient-to-br from-[#014F43] to-[#02735E] rounded-xl flex flex-col items-center justify-center shadow-md transition group relative"
              >
                <div className="mb-1">{action.icon}</div>
                <span className="font-semibold text-sm">{action.title}</span>
                <div className="absolute bottom-[-30px] opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 text-white p-1 px-2 rounded">
                  {action.tip}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Section */}
          <div className="flex flex-col items-center w-full md:w-auto relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 0.6, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-[500px] h-[400px] md:h-[300px] flex flex-col items-center justify-center"
            >
              <Robot />
            </motion.div>

            {/* Chat Button - Now positioned below the Robot */}
            <motion.div 
              className="mt-8 z-30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => setChatOpen(!chatOpen)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md transition-all duration-200"
              >
                <span className="text-xl">💬</span>
                <span>Chat with Sakhi</span>
              </button>
            </motion.div>

            {chatOpen && <ChatBot />}

            {/* Mobile Actions Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
              {[...actionsLeft, ...actionsRight].map((action, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[80px] bg-gradient-to-br from-[#014F43] to-[#02735E] rounded-xl flex flex-col items-center justify-center shadow-md p-2"
                >
                  <div className="mb-1">{action.icon}</div>
                  <span className="font-semibold text-sm text-center">{action.title}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Section - Hidden on mobile */}
          <div className="hidden md:flex flex-col gap-10 w-[350px]">
            {actionsRight.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="w-full h-[90px] bg-gradient-to-br from-[#014F43] to-[#02735E] rounded-xl flex flex-col items-center justify-center shadow-md transition group relative"
              >
                <div className="mb-1">{action.icon}</div>
                <span className="font-semibold text-sm">{action.title}</span>
                <div className="absolute bottom-[-30px] opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 text-white p-1 px-2 rounded">
                  {action.tip}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;