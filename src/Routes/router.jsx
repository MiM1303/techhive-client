import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Demo from "../pages/Demo/Demo";
import AddProduct from "../pages/AddProduct/AddProduct";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Registration></Registration>
        },
        {
          path: "/demo",
          element: <Demo></Demo>
        },
        // WILL BE MOVED TO USER DASHBOARD SIDE
        {
          path: "/add-product",
          element: <AddProduct></AddProduct>
        }
      ]
    },
  ]);
