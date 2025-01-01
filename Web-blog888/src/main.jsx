import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routers/Router.jsx";
import { RouterProvider } from "react-router";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
);
