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
import PrivateRoute from "../Providers/PrivateRoute";
import DetailsWithComments from "../Pages/PostDetails/DetailsWithComments";
import UserProfile from "../Pages/Ruhul/UserProfile/UserProfile";
import EditProfile from "../Pages/Ruhul/UserProfile/EditProfile";
import LeaderBoard from "../Components/Nur/Leaderboard";
import ContactForm from "../components/adnan/ContactForm";
import AdminRoute from "../Providers/AdminRoute";
import Message from "../Pages/Ruhul/Message/Message";
import VideoRoom from "../Pages/Ruhul/Message/VideoRoom";
import ArchiveDetails from "../Components/Nur/ArchiveDetails";
import CodeEditor from "../components/adnan/codeEditor/codeEditorComponents/CodeEditor";
import GetPremium from "../Pages/Ruhul/UserProfile/GetPremium";
import PaymentSucces from "../Pages/Ruhul/UserProfile/PaymentSucces";
import PaymentFailed from "../Pages/Ruhul/UserProfile/PaymentFailed";
import UserP from "../Pages/Ruhul/UserProfile/UserP";
import UserPosts from "../Pages/Ruhul/UserProfile/UserPosts";
import PaymentHistory from "../Pages/Ruhul/UserProfile/PaymentHistory";

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
        path: "/contact",
        element: <ContactForm></ContactForm>,
      },
      {
        path: "/code-editor",
        element: <CodeEditor></CodeEditor>,
      },
      // .......for testing......../
      {
        path: "/blogCard",
        element: <BlogCard></BlogCard>,
      },
      {
        path: "/readMore/:id",
        element: <ReadMore></ReadMore>,
      },

      {
        path: "/create-post/text-post",
        element: (
          <PrivateRoute>
            <CreatePost></CreatePost>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-post/image-post",
        element: (
          <PrivateRoute>
            <CreatePost></CreatePost>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-post/link-post",
        element: (
          <PrivateRoute>
            <CreatePost></CreatePost>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-post/poll",
        element: (
          <PrivateRoute>
            <CreatePost></CreatePost>
          </PrivateRoute>
        ),
      },
      {
        path: "/signModal",
        element: <SignModal></SignModal>,
      },
      {
        path: "/ruhulcard",
        element: <CardRuhul></CardRuhul>,
      },
      {
        path: "/about",
        element: <AboutSection></AboutSection>,
      },
      {
        path: "/post-details/:id",
        element: <DetailsWithComments></DetailsWithComments>,
      },
      {
        path: "/detailsWithComments/:id",
        element: <DetailsWithComments></DetailsWithComments>,
      },

      {
        path: "/edit-profile/:email",
        element: <EditProfile></EditProfile>,
      },
      {
        path: "/leaderBoard",
        element: <LeaderBoard></LeaderBoard>,
      },
      {
        path: "/room/:roomId",
        element: <VideoRoom></VideoRoom>,
      },
      {
        path: "/get-premium",
        element: (
          <PrivateRoute>
            {" "}
            <GetPremium></GetPremium>
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-success/:tran_id",
        element: <PaymentSucces> </PaymentSucces>,
      },
      {
        path: "/premium-failed/:tran_id",
        element: <PaymentFailed></PaymentFailed>,
      },

      // for admin
      {
        path: "/admin-settings",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminSetting></AdminSetting>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "/chat/:email",
        element: (
          <PrivateRoute>
            <Message></Message>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/users/:email",
    element: <UserProfile></UserProfile>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/users/:email/profile",
        element: <UserP></UserP>,
      },

      {
        path: "/users/:email/posts",
        element: <UserPosts></UserPosts>,
      },
      {
        path: "/users/:email/payment-hitory/:email",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/users/:email/archive/:testEmailWithRuhul",
        element: <ArchiveDetails></ArchiveDetails>,
      },
    ],
  },
]);
