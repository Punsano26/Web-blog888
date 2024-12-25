const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
  //File upload
  const { path: cover } = req.file;

  const author = req.userID;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields is requires" });
  }
  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover,
    author,
  });
  res.json(postDoc);
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
  if (!id) return res.status(400).json({ message: "Post ID is required" });

  try {
    const authorId = req.userId;
    const postDoc = await PostModel.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (authorId !== postDoc.author.toString()) {
      return res.status(403).send({
        message: "You are not allowed to update this post!",
      });
    }

    const { title, summary, content } = req.body;
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;

    if (req.file) {
      postDoc.cover = req.file.path;
    }

    await postDoc.save();
    console.log(`Post with ID ${id} updated successfully by user ${authorId}.`); // Log the success message
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating the post.",
    });
  }
};
