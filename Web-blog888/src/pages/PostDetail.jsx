import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router";
const Post = () => {
  const [postDeatail, setPostsDetail] = useState(null)
  const {id} = useParams();
  useEffect(()=>{
    const fetchPost = async () => {
      try {
     const response = await PostService.getPostByID();
      if (response.status === 200) {
        setPostsDetail(response.data);
      }
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
  
  return (
    <>
    <div className="container mx-auto max-w-3xl mt-20 px-4">  
      <div className="card card-side bg-base-100 shadow-xl rounded-lg">
        {postDeatail && (
          <>
          <figure className="md:1/2 flex items-center justify-center">
            <img
              src={`${baseURL}/${postDeatail.cover}`}
              alt={postDeatail.title}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="p-6 md:1/2 flex flex-col justify-between card-body">
            <h2 className="card-title">{postDeatail.title}</h2>
            <p>
              {postDeatail.author.username}-{postDeatail.createdAt}
            </p>
            <p>{postDeatail.summary}</p>
            <p>{postDeatail.content}</p>
          </div>
          </>
        )}
      </div>
    </div>
    </>
  )
};

export default Post;
