import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"
import { FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosAlbums } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { TbLogout } from "react-icons/tb";


const Dashboard = () => {

    const {user, logOut, setLoading} = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch(`https://techhive-server.vercel.app/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
            setUserData(data);
            setLoading(false);
        });
    }, []);

    // console.log('username', user.user_name, isAdmin)
    const handleLogOut = () => {
		logOut()
			.then(() => { })
			.catch(error => console.log(error));
	}



    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] drawer-button lg:hidden">Open Sidebar</label>
                {/* <h2 className="text-2xl mt-10 font-bold">Welcome to Dashboard, {user.user_name}!</h2> */}
                <div className="flex-1 lg:p-8">
                    <Outlet></Outlet>
                </div>
            
            </div> 
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 space-y-3 w-fit md:w-80 min-h-full bg-[#EDFAF6] text-base-content">
                <li className="mx-auto"><NavLink to="/"><img src={logo} alt="" className="w-36 md:w-44 lg:w-48 md:mb-6 lg:mb-16" /></NavLink></li>
                    {
                        // ADMIN
                        userData.role==='Admin'? <>
                        <li className="px-4"><NavLink to="/dashboard/manage-users" className="flex gap-5"><FaRegListAlt className="text-xl"/><span className="text-lg">Manage Users</span></NavLink></li>
                        <li className="px-4"><NavLink to="/dashboard/manage-coupons" className="flex gap-5"><FaRegListAlt className="text-xl"/><span className="text-lg">Manage Coupons</span></NavLink></li>
                        </>
                        :
                        <>
                        {
                            // MODERATOR
                            userData.role==='Moderator'?<>
                            <li className="px-4"><NavLink to="/dashboard/products-review-queue" className="flex gap-5"><FaRegListAlt className="text-xl"/><span className="text-lg">Product Review Queue</span></NavLink></li>
                            <li className="px-4"><NavLink to="/dashboard/reported-products" className="flex gap-5"><FaRegListAlt className="text-xl"/><span className="text-lg">Reported Contents</span></NavLink></li>
                            </>
                            :
                            <>
                                {/* USER */}
                                <li className="px-4 pt-8"><NavLink to="/dashboard/my-profile" className="flex gap-5 "><FaUser className="text-xl"/><span className="text-lg">My Profile</span></NavLink></li>
                                <li className="px-4"><NavLink to="/dashboard/add-product" className="flex gap-5"><IoMdAdd className="text-xl"/><span className="text-lg">Add Product</span></NavLink></li>
                                <li className="px-4"><NavLink to="/dashboard/my-products" className="flex gap-5"><FaRegListAlt className="text-xl"/><span className="text-lg">My Products</span></NavLink></li>
                            </>
                        }
                        </>
                        
                    }
                
                
                {/* SHARED LINKS */}
                <div className="divider px-6"></div>
                <li className="px-4"><NavLink to="/" className="flex gap-5"><IoHome className="text-xl"/><span className="text-lg">Home</span></NavLink></li>
                <li className="px-4"><NavLink to="/all-products" className="flex gap-5"><IoIosAlbums className="text-xl"/><span className="text-lg">Products</span></NavLink></li>
                <li className="px-4 flex gap-5" onClick={handleLogOut}><span className="text-lg"><TbLogout className="text-2xl mr-2"/>Logout</span></li>
                </ul>
            
            </div>
        </div>
        
        // <div className="flex">
        //     <div className="w-72 min-h-screen bg-[#EDFAF6]">
        //         <ul className="menu space-y-4 text-lg font-medium">
        //             <li ><NavLink to="/"><img src={logo} alt="" /></NavLink></li>
        //             <li className="px-4 pt-8"><NavLink to="/dashboard/my-profile" className="flex gap-5 "><FaUser className="text-xl"/><span>My Profile</span></NavLink></li>
        //             <li className="px-4"><NavLink to="/dashboard/add-product" className="flex gap-5"><IoMdAdd className="text-xl"/><span>Add Product</span></NavLink></li>
        //             <li className="px-4"><NavLink to="/dashboard/my-products" className="flex gap-5"><FaRegListAlt className="text-xl"/><span>My Products</span></NavLink></li>
        //             <li className="px-4"><NavLink to="/dashboard/manage-users" className="flex gap-5"><FaRegListAlt className="text-xl"/><span>Manage Users</span></NavLink></li>
        //             <div className="divider px-6"></div>
        //             <li className="px-4"><NavLink to="/" className="flex gap-5"><IoHome className="text-xl"/><span>Home</span></NavLink></li>
        //             <li className="px-4"><NavLink to="/all-products" className="flex gap-5"><IoIosAlbums className="text-xl"/><span>Products</span></NavLink></li>
        //             <li className="px-4 flex gap-5" onClick={handleLogOut}><IoIosAlbums className="text-xl"/><span>Logout</span></li>
        //         </ul>
        //     </div>
        //     <div className="flex-1">
        //         <Outlet></Outlet>
        //     </div>
        // </div>
    );
};

export default Dashboard;