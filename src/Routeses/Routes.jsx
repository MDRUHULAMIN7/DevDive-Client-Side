import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Card from "../Components/Card/Card";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<p>error page</p>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },

            {
                path:'/card',
                element:<Card></Card>
            }
        ]
    }
])