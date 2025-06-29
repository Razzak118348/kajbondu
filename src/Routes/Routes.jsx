import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivetRout from "./PrivateRoute";
import Service from "../Pages/Service/Service";
import MyBooking from "../Pages/MyBooking/MyBooking";
import SingleBooking from "../Pages/SingleBooking/SingleBooking";
import FindByCategory from "../Pages/FindByCategory/FindByCategory";
import About from "../Pages/About/About";
import WorkerApplication from "../Pages/WorkerApplication/WorkerApplication";
import Admin from "../Pages/Admin/Admin";
import AdminRoute from "./AdminRoute";

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
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/service',
                element: <Service></Service>
            },
            {
                path: '/my-booking',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/services/id/:id',
                element: <PrivetRout children={<SingleBooking></SingleBooking>}></PrivetRout>,
                loader: ({ params }) => fetch(`http://localhost:3000/services/id/${params.id}`)
            },
            {
                path: '/services/category/:category',
                element:<FindByCategory ></FindByCategory>,
                loader: ({ params }) => fetch(`http://localhost:3000/services/category/${params.category}`)
            },
            {
                path:'/about',
                element:<About></About>,
                loader: () => fetch('/contact.json')
            },
            {
                path:'/workerApplication',
                element:<WorkerApplication></WorkerApplication>
            },
            {
                path:'/admin',
                element:<AdminRoute>
                    <Admin></Admin>
                </AdminRoute>,
                loader:()=> fetch('http://localhost:3000/worker')
            }
        ]

    }
])

export default Routes;