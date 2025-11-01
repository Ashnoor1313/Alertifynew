import Post from "../models/community.model.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      user: req.user._id,
      content,
      image
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });
  res.json(posts);
};

export const addReaction = async (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.reactions.set(emoji, (post.reactions.get(emoji) || 0) + 1);
  await post.save();

  res.json(post);
};
