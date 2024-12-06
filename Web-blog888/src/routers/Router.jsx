import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import PostDetail from "../pages/PostDetail";
import Create from "../pages/Create";
import Register from "../pages/Register";
import Login from "../pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "create", element: <Create /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
export default router;
