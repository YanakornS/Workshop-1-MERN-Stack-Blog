import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import Create from "../pages/Create";
import Register from "../pages/Register";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import PostDetail from "../pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Create",
        element: <Create />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "Edit/:id",
        element: <Edit />,
      },
      {
        path: "PostDetail/:id",
        element: <PostDetail />,
      },
    ],
  },
]);

export default router;
