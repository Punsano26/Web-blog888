import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
const Post = () => {
  const [postDeatail, setPostsDetail] = useState(null)
  const {id} = useParams();
  useEffect(()=>{
    const fetchPost = async () => {
      try {
     const response = await PostService.getPostByID();
    } catch (error) {
       Swal.fire({
        title: "Post Detail",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
    }
    fetchPost();
  },[id])
  
  return <div>is Athor {postDeatail?.author?._id === user?.id && <p>true</p>}</div>;
};

export default Post;
