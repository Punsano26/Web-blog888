import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import { Post } from "../components/Post";
import { useParams } from "react-router";
const AuthorPost = () => {
  const [posts, setPosts] = useState([]);
  const { id } =  useParams();
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPostByAuthor(id);
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Home",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchPosts();
  }, []);
  return (
     <>
      <div className="flex flex-col space-y-6">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return <Post key={index} {...post} />;
          })}
      </div>
    </>
  )
}

export default AuthorPost