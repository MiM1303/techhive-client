import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
	const {user, logOut} = useContext(AuthContext);
	const axiosPublic = useAxiosPublic();
    const navOptions = <>
        <li><Link to="/">Home</Link ></li>
        <li><Link >Products</Link ></li>
    </>

	const handleLogOut = () => {
		logOut()
			.then(() => { })
			.catch(error => console.log(error));
	}

	console.log(user);
	return (
		<div className="navbar bg-[#EDFAF6] text-black py-3 px-10">
			<div className="navbar-start">
				<div className="dropdown text-[#0CC0DF] bg-[#EDFAF6]">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
                        {navOptions}
					</ul>
				</div>
				<Link to="/" className="bg-[#EDFAF6] text-xl">
                    <img className="h-12" src={logo} alt="" />    
                </Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{navOptions}
				</ul>
			</div>
			<div className="navbar-end">
				{user? 
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img alt="Tailwind CSS Navbar component" src={user.photoURL} />
						</div>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-[#EDFAF6] text-[#0CC0DF] rounded-box w-52">
						<li className="text-center my-2 text-base font-semibold">{user.displayName}</li>
						<li className="hover:bg-[#98fbdd] hover:text-black"><a>Dashboard</a></li>
						<li className="hover:bg-[#98fbdd] hover:text-black"><a onClick={handleLogOut}>Logout</a></li>
					</ul>
				</div>
			
				:
				<div className="">
					<Link to="/login"><button className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] ">Login</button></Link>
				</div>}
			</div>
		</div>
	);
};

export default Navbar;
