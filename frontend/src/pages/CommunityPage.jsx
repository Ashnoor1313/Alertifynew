import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const dummyTweets = [
  {
    id: 1,
    username: "ananya_dev",
    content: "🚨 Got a fake job offer via email asking for ₹2000 for verification. Stay safe!",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    time: "2025-07-25 08:45 AM",
    image: null,
    reactions: { "⚠️": 2, "😡": 1 },
  },
  {
    id: 2,
    username: "rahul_tech",
    content: "Beware of calls claiming to be from banks asking for OTP. Almost lost ₹10k.",
    profilePic: "https://randomuser.me/api/portraits/men/42.jpg",
    time: "2025-07-24 06:30 PM",
    image: null,
    reactions: { "😡": 3, "👍": 2 },
  },
  {
    id: 3,
    username: "kavita_sharma",
    content: "This site claimed to give laptops for ₹500. Total scam!",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
    time: "2025-07-23 02:10 PM",
    image: null,
    reactions: { "❌": 1 },
  },
  {
    id: 4,
    username: "arjun24",
    content: "Got scammed on OLX selling my phone. Buyer sent fake UPI screenshot.",
    profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
    time: "2025-07-22 11:55 AM",
    image: null,
    reactions: { "😢": 1 },
  },
  {
    id: 5,
    username: "neha_online",
    content: "Crypto giveaway on Telegram was a scam. Lost ₹5k.",
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
    time: "2025-07-21 07:40 PM",
    image: null,
    reactions: { "👎": 2 },
  },
  {
    id: 6,
    username: "vishalX",
    content: "Received call saying electricity would be cut if I don’t pay ₹1. Fake!",
    profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
    time: "2025-07-20 09:20 AM",
    image: null,
    reactions: { "😤": 1, "⚠️": 1 },
  },
];

const CommunityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/3 p-6 flex flex-col justify-center border-r border-green-800">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-green-400 text-center">
            🤝 Welcome to Sakhi Community
          </h1>
          <p className="text-center text-green-100 text-sm leading-relaxed">
            Real stories. Real awareness. A safer space for all.
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/security-concept-illustration_114360-4973.jpg"
          alt="Awareness"
          className="rounded-xl shadow-lg w-full max-w-xs mx-auto"
        />
      </div>

      {/* Right Section */}
      <div className="md:w-2/3 p-12 flex flex-col h-screen overflow-hidden">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-3">
           💬 Sakhi Community Feed
        </h2>

        <div className="flex-1 overflow-y-auto bg-black/10 p-4 rounded-lg shadow-inner">
          {dummyTweets.map((post) => (
            <div
              key={post.id}
              className="bg-black/30 rounded-md p-4 mb-4 shadow-md hover:shadow-emerald-500/40 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={post.profilePic}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border border-green-500"
                />
                <div className="flex-1">
                  <span className="font-semibold text-green-300 text-sm">
                    @{post.username}
                  </span>
                  <div className="text-xs text-gray-400">{post.time}</div>
                </div>
              </div>
              <p className="mb-2 text-sm">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Scam"
                  onClick={() => setModalImage(post.image)}
                  className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-90 transition"
                />
              )}
              <div className="flex gap-2 mt-2 flex-wrap items-center text-sm">
                {Object.entries(post.reactions || {}).map(([emoji, count]) => (
                  <span
                    key={emoji}
                    className="bg-green-700 px-2 py-1 rounded-full"
                  >
                    {emoji} {count}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {location.pathname !== "/tweets" && (
  <div className="text-center mt-4">
    <button
      onClick={() => navigate("/tweets")}
      className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 text-white rounded-full shadow"
    >
      View More Tweets →
    </button>
  </div>
)}

      {/* Fullscreen Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full screen"
            className="max-w-full max-h-full rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  </div>
  );
};

export default CommunityPage;
