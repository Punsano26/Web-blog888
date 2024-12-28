import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import PostDetail from "../pages/PostDetail";
import Create from "../pages/Create";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserLoginPage from "../pages/UserLoginPage";
import UserRegPage from "../pages/UserRegPage";
import PostOwnerPage from "../pages/PostOwnerPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "edit/:id", element: (<PostOwnerPage><Edit /> </PostOwnerPage> )},
      { path: "create", element: (<UserLoginPage><Create/></UserLoginPage>) },
      { path: "post/:id", element: <PostDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element:( <UserRegPage><Register /></UserRegPage>) },
    ],
  },
]);
export default router;
