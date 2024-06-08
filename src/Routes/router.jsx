import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Demo from "../pages/Demo/Demo";
import AddProduct from "../pages/AddProduct/AddProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Error404 from "../pages/Shared/Error404";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error404></Error404>,
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
            path: "/product-details",
            element: <ProductDetails></ProductDetails>
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
