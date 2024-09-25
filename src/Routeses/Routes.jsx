import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Card from "../Components/Sanjida/Card";
import ErrorPage from "../Pages/ErrorPage";
import Popular from "../Pages/Popular/Popular";
import Following from "../Pages/Following/Following";
import All from "../Pages/All/All";
import CreatePost from "../components/adnan/CreatePost";
import AdminSetting from "../Pages/Ruhul/Admin/AdminSetting.jsx/AdminSetting";
import SignModal from "../Components/Nur/SignModal";
import CardRuhul from "../Components/Ruhul/Card-Ruhul/CardRuhul";
import BlogCard from "../Components/Sanjida/BlogCard";
import ReadMore from "../Components/Sanjida/ReadMore";

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
      // .......for testing......../
      {
        path: '/blogCard',
        element: <BlogCard></BlogCard>
      },
      {
        path:'/readMore',
        element:<ReadMore></ReadMore>
      },

      {
        path: "/create-post/text-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/create-post/image-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/create-post/link-post",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/signModal",
        element: <SignModal></SignModal>,
      },
      {
        path: "/ruhulcard",
        element: <CardRuhul></CardRuhul>
      },

      // for admin
      {
        path: "/admin-settings",
        element: <AdminSetting></AdminSetting>,
      },
    ],
  },
]);
