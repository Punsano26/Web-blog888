const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const srcret = process.env.SECRET;

exports.createPost = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    // json เป็นฟังก์ชันสำหรับ return
    return res.status(401).json({ message: "Token is messing" });
  }

  //File upload
  const { path } = req.file;
  const author = req.userID;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields is requires" });
  }
  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: path,
    author,
  });
  res.json(postDoc);
  // TO be continue
};
