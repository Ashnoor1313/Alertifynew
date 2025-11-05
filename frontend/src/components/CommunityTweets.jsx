//communityTweets.jsx
import React, { useState } from "react";

const initialPosts = [
  {
    id: 1,
    username: "ananya_dev",
    content: "🚨 Got a fake job offer via email asking for ₹2000 for verification. Stay safe!",
    reactions: { "👍": 1, "😡": 1 },
    comments: ["That happened to me too!"],
  },
  {
    id: 2,
    username: "rahul_tech",
    content: "Beware of fake electricity bill messages. Don't click links!",
    reactions: { "⚠️": 3 },
    comments: [],
  },
];

const CommunityTweets = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      username: "guest_user",
      content: newPost,
      reactions: {},
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleReact = (postId, emoji) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const updatedReactions = { ...post.reactions };
        updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
        return { ...post, reactions: updatedReactions };
      }
      return post;
    }));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white p-6">
      <h2 className="text-3xl font-bold text-green-300 mb-4">💬 Alertify Community</h2>

      {/* New Post Box */}
      <div className="bg-black/40 rounded-lg p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your experience..."
          className="w-full p-3 rounded bg-black/20 text-white mb-2 resize-none"
        />
        <button
          onClick={handleAddPost}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Post
        </button>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-black/30 p-4 rounded mb-4 shadow-md">
          <h4 className="font-semibold text-green-400">@{post.username}</h4>
          <p className="text-sm mt-1">{post.content}</p>

          {/* Reactions */}
          <div className="flex gap-3 mt-3">
            {["👍", "😡", "⚠️", "❤️"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReact(post.id, emoji)}
                className="bg-green-700 hover:bg-green-800 px-2 py-1 rounded"
              >
                {emoji} {post.reactions[emoji] || 0}
              </button>
            ))}
          </div>

          {/* Comments */}
          <div className="mt-4">
            <strong className="text-green-300">Comments:</strong>
            <ul className="list-disc list-inside text-sm text-green-100 mb-2">
              {post.comments.map((cmt, index) => (
                <li key={index}>{cmt}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleComment(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full mt-1 p-2 rounded bg-black/10 text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityTweets;
