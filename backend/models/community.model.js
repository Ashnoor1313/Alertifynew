import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you already have a User model
    required: true
  },
  content: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // Cloudinary or local path
  },
  reactions: {
    type: Map,
    of: Number, // example: { "👍": 3, "❤️": 5 }
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Post", postSchema);
