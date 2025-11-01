import express from "express";
import {
  createPost,
  getPosts,
  addReaction
} from "../controllers/community.controller.js";
import upload from "../middleware/uploadMiddleware.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/post", verifyToken, upload.single("image"), createPost);
router.get("/posts", getPosts);
router.patch("/react/:id", verifyToken, addReaction);

export default router;
