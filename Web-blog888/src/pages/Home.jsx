import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import { Post } from "../components/Post";
const Home = () => {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPost();
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
        {post.length > 0 &&
          post.map((post, index) => {
            return <Post key={index} {...post} />;
          })}
      </div>
    </>
  );
};

export default Home;
