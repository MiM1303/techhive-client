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
import AllProducts from "../pages/AllProducts/AllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductsPagination from "../pages/ProductsPagination/ProductsPagination";

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
        // {
        //     path: "/all-products",
        //     element: <AllProducts></AllProducts>
        // },
        {
            path: "/product/:id",
            element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
          path: "/all-products",
          element: <ProductsPagination></ProductsPagination>,
          loader: () => fetch("http://localhost:5000/all-products-count")
        },
        {
          path: `/all-products/search/:searchText`,
          element: <ProductsPagination></ProductsPagination>,
          loader: ({params}) => fetch(`http://localhost:5000/all-products/search/${params.searchText}`)
      },
        // DEMO & TESTING PAGES
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
