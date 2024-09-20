import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Card from "../Components/Card/Card";
import ErrorPage from "../Pages/ErrorPage";
import Popular from "../Pages/Popular/Popular";
import Following from "../Pages/Following/Following";
import All from "../Pages/All/All";
import CreatePost from "../components/adnan/CreatePost";
import AdminSetting from "../Pages/Ruhul/Admin/AdminSetting.jsx/AdminSetting";
import SignModal from "../Components/Nur/SignModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/popular",
        element: <Popular></Popular>,
      },
      {
        path: "/following",
        element: <Following></Following>,
      },
      {
        path: "/all",
        element: <All></All>,
      },

      {
        path: "/card",
        element: <Card></Card>,
      },
      {
        path: "/create-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/create-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/signModal",
        element: <SignModal></SignModal>,
      },

      // for admin
      {
        path: "/admin-settings",
        element: <AdminSetting></AdminSetting>,
      },
    ],
  },
]);
