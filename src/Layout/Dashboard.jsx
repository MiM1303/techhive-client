import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"
import { FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosAlbums } from "react-icons/io";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-72 min-h-screen bg-[#EDFAF6]">
                <ul className="menu space-y-4 text-lg font-medium">
                    <li ><NavLink to="/"><img src={logo} alt="" /></NavLink></li>
                    <li className="px-4 pt-8"><NavLink to="/dashboard/my-profile" className="flex gap-5 "><FaUser className="text-xl"/><span>My Profile</span></NavLink></li>
                    <li className="px-4"><NavLink to="/dashboard/add-product" className="flex gap-5"><IoMdAdd className="text-xl"/><span>Add Product</span></NavLink></li>
                    <li className="px-4"><NavLink to="/dashboard/my-products" className="flex gap-5"><FaRegListAlt className="text-xl"/><span>My Products</span></NavLink></li>
                    <li className="px-4"><NavLink to="/dashboard/manage-users" className="flex gap-5"><FaRegListAlt className="text-xl"/><span>Manage Users</span></NavLink></li>
                    <div className="divider px-6"></div>
                    <li className="px-4"><NavLink to="/" className="flex gap-5"><IoHome className="text-xl"/><span>Home</span></NavLink></li>
                    <li className="px-4"><NavLink to="/all-products" className="flex gap-5"><IoIosAlbums className="text-xl"/><span>Products</span></NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;