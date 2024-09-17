import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";

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
        ]
    }
])