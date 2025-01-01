import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { usePostContext } from "../context/PostContext";

const PostOwnerPage = ({ children }) => {
  const { user } = useAuthContext();
  const { post } = usePostContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if ( user.id !== post.author._id) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PostOwnerPage;
