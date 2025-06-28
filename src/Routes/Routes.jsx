import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivetRout from "./PrivateRoute";
import Booking from "../Pages/Booking/Booking";
import Service from "../Pages/Service/Service";

const Routes = createBrowserRouter([
    {

        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            },
            {
                path:'/booking',
                element:<PrivetRout children={<Booking></Booking>}></PrivetRout>
            },
            {
                path:'/service',
                element:<Service></Service>
            }
        ]

    }
])

export default Routes;