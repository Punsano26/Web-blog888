const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
  //File upload
  const { path } = req.file;
  console.log("path =", req.file);
  
  const author = req.userId;
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

exports.getPost = async (req, res) => {
  const posts = await PostModel.find().populate("author", ["username"]).sort
  ({"createdAt":-1}).limit(20);
  //SELECT * FROM  POST, USER WHERE POST.author = USER._id
  res.json(posts);
};

exports.getPostByID = async (req, res) => {
  const {id} = req.params.id;
  const postDoc = await PostModel.findById(id).populate("author", ["username"]);
  res.json(postDoc);
}

