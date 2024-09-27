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

import AboutSection from "../Pages/Ruhul/Admin/AboutSection/AboutSection";
import BlogCard from "../Components/Sanjida/BlogCard";
import ReadMore from "../Components/Sanjida/ReadMore";
import CardRuhul from "../Components/Ruhul/Card-Ruhul/CardRuhul";
import PostDetails from "../Pages/PostDetails/PostDetails";
import PrivateRoute from "../Providers/PrivateRoute";

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
        path:'/readMore/:id',
        element:<ReadMore></ReadMore>
      },

      {
        path: "/create-post/text-post",
        element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>
      },
      {
        path: "/create-post/image-post",
        element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>,
      },
      {
        path: "/create-post/link-post",
        element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>,
      },
      {
        path: "/signModal",
        element: <SignModal></SignModal>,
      },
      {
        path: "/ruhulcard",
        element: <CardRuhul></CardRuhul>
      },
      {
        path: "/about",
        element: <AboutSection></AboutSection>
      },
      {
        path:'/post-details/:id',
        element:<PostDetails></PostDetails>
      },

      // for admin
      {
        path: "/admin-settings",
        element: <AdminSetting></AdminSetting>,
      },
    ],
  },
]);
