import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor"
const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [ content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.file[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

const handleContentChange = (value) => {
  setContent(value);
  setPostDetail({ ...postDetail,content:content});
}

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);

      const response = await PostService.createPost(data);
      if (response.status === 200) {
        Swal.fire({
          title: "User Login",
          text: response.data.message,
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: null,
          });
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div class="bg-white p-8 rounded-lg max-w-4xl w-full shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Post
      </h2>
      <label>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={postDetail.title}
            onChange={handleChange}
            name="title"
            class="input input-bordered input-info w-full"
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Summary"
            value={postDetail.summary}
            onChange={handleChange}
            name="summary"
            class="input input-bordered input-info w-full"
          />
        </div>
        <div class="mb-4">
          {/* <textarea
            placeholder="Content"
            value={postDetail.content}
            onChange={handleChange}
            name="content"
            class="textarea textarea-bordered textarea-info w-full"
          ></textarea> */}
          <div className="h-64">
            <Editor value={content} onChange={handleContentChange} ref= {editorRef}/>
          </div>
          
        </div>
        <div class="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleChange}
            class="file-input file-input-bordered file-input-accent w-full"
          />
        </div>
        <button class="btn btn-primary w-full" onClick={handleSubmit}>
          Submit
        </button>
      </label>
    </div>
  )
}

export default Create;
