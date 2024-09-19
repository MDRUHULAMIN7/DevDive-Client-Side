import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Card from "../Components/Card/Card";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Providers/PrivateRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },

            {
                path:'/card',
                element:<PrivateRoute><Card></Card></PrivateRoute>
            }
        ]
    }
])