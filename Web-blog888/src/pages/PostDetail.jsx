import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { compareAsc, format } from "date-fns";

const Post = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostByID(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchPost();
  }, [id]);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    Swal.fire({
      title: "Delete Post",
      text: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await PostService.deletePostById(id);
          Swal.fire({
            title: "Delete Post",
            text: "Post deleted successfully",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } catch (error) {
          Swal.fire({
            title: "Delete Post",
            text: error?.response?.data?.message || error.message,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="post-page min-h-full min-w-full flex items-center justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-grey-800">
          {postDetail.title}
        </h1>
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">
            {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
          </time>
          <div className="author mb-2">
            <span className="text-blue-500">@{postDetail.author.username}</span>
          </div>
          {user && user.id === postDetail.author._id && (
            <>
              <a
                href={`/edit/${postDetail._id}`}
                className="btn btn-warning items-center justify-center mr-1"
              >
                Edit post
              </a>
              <a
                onClick={() => handleDelete(postDetail._id)}
                className="btn btn-error items-center justify-center"
              >
                Delete
              </a>
            </>
          )}
        </div>

        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        ></div>
      </div>
    </div>
  );
};

export default Post;
