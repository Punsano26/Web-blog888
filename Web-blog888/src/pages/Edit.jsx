import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const EditPost = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: value });
  };

  useEffect(() => {

      PostService.getPostByID(id).then((response) => {
        if (response.status === 200) {
          const { title, summary, content } = response.data;
          setPostDetail({ title, summary, content, file: null });
          setContent(content);
          if (editorRef.current) {
            editorRef.current.getQuill().setText(content); // Use setText instead of setEditorValue
          }
        }
      });

  }, [id]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);

      const response = await PostService.updatePost(id, data); // Pass postID here
      if (response.status === 200) {
        Swal.fire({
          title: "Post Updated",
          text: response.data.message || "Post has been Updated successfully!",
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: null,
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Update Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Edit a Post
      </h2>
      <label>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={postDetail.title}
            onChange={handleChange}
            name="title"
            className="input input-bordered input-info w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Summary"
            value={postDetail.summary}
            onChange={handleChange}
            name="summary"
            className="input input-bordered input-info w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <div className="h-64">
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            />
          </div>
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="file-input file-input-bordered file-input-accent w-full"
          />
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Submit
        </button>
      </label>
    </div>
  );
};

export default EditPost;
