const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createPost = async (req, res) => {
  //File upload
  const { path: cover } = req.file;

  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields is requires" });
  }
  try {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover,
      author,
    });
    if (!postDoc) {
      res.status(400).send({
        message: "Cannot create new post!",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating a new post.",
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    //SELECT * FROM  POST, USER WHERE POST.author = USER._id
    if (!posts.length) {
      res.status(404).send({
        message: "Post not found!",
      });
      return;
    }
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting post detail",
    });
  }
};

exports.getPostByID = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      res.status(404).send({
        message: "Post not found!",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting post detail",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({
        message: "You are not allowed to delete this post!",
      });
      return;
    }
    await postDoc.deleteOne();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while deleting a post.",
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Post ID is not provided" });

  const authorId = req.userId;
  if (!authorId) return res.status(400).json({ message: "User ID is required" });

  try {
    const postDoc = await PostModel.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!postDoc.author) {
      return res.status(400).json({ message: "Post author is not defined" });
    }

    if (authorId.toString() !== postDoc.author.toString()) {
      return res.status(403).send({
        message: "You cannot update this post",
      });
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;

    if (req.file) {
      const { path } = req.file;
      postDoc.cover = path;
    }

    await postDoc.save();
    console.log(`Post with ID ${id} updated successfully by user ${authorId}.`);
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating the post.",
    });
  }
};


