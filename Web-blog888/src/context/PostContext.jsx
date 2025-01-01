import React, { createContext, useContext, useState } from "react";

// สร้าง Context
const PostContext = createContext();

// สร้าง Provider สำหรับแชร์ข้อมูล Post
export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Hook สำหรับการใช้งาน Context
export const usePostContext = () => {
  return useContext(PostContext);
};

export default PostContext;
