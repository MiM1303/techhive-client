import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Demo from "../pages/Demo/Demo";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Error404 from "../pages/Shared/Error404";
import PrivateRoute from "./PrivateRoute";
import ProductsPagination from "../pages/ProductsPagination/ProductsPagination";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AddProduct from "../pages/Dashboard/User/AddProduct";
import MyProducts from "../pages/Dashboard/User/MyProducts";
import Update from "../pages/Dashboard/User/Update";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ReviewQueue from "../pages/Dashboard/Moderator/ReviewQueue";
import ReportedContents from "../pages/Dashboard/Moderator/ReportedContents";
import Payment from "../pages/Dashboard/User/Payment";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";

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
            path: "/product/:id",
            element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
            loader: ({params}) => fetch(`https://techhive-server.vercel.app/products/${params.id}`)
        },
        {
          path: "/all-products",
          element: <ProductsPagination></ProductsPagination>,
          loader: () => fetch("https://techhive-server.vercel.app/all-products-count")
        },

        // DEMO & TESTING PAGES
        {
          path: "/demo",
          element: <Demo></Demo>
        },
        // WILL BE MOVED TO USER DASHBOARD SIDE
        
      ]
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <Error404></Error404>,
      loader: () => fetch("https://techhive-server.vercel.app/users/:email"),
      children: [
        {
          path: "my-profile",
          element: <MyProfile></MyProfile>,
          loader: () => fetch("https://techhive-server.vercel.app/coupons")
        },
        {
          path: "payment",
          element: <Payment></Payment>
        },
        {
          path: "add-product",
          element: <AddProduct></AddProduct>
        },
        {
          path: "my-products",
          element: <MyProducts></MyProducts>
        },
        {
          path: `my-products/update-product/:id`,
          element: <PrivateRoute><Update></Update></PrivateRoute>,
          loader: ({params}) => fetch(`https://techhive-server.vercel.app/add-product/${params.id}`)
        },
        {
          path: "manage-users",
          element: <ManageUsers></ManageUsers>
        },
        {
          path: "manage-coupons",
          element: <ManageCoupons></ManageCoupons>
        },
        {
          path: "products-review-queue",
          element: <ReviewQueue></ReviewQueue>
        },
        {
          path: "reported-products",
          element: <ReportedContents></ReportedContents>
        },
      ]
    }
  ]);
