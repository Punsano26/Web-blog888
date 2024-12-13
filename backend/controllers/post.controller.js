const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const srcret = process.env.SECRET;

exports.createPost = async (requestAnimationFrame,res) => {
    const token = req.headers["x-access-token"];
    // TO be continue
}