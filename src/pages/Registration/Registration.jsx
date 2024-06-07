import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";
import "../../App.css"
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoArrowRedoSharp } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {

    const axiosPublic = useAxiosPublic();
    const [passwordState, setPasswordState] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {updateUserProfile, createUser, setUser} = useContext(AuthContext);

    const onSubmit = (data) => {
        const name = data.name;
        const photo = data.photoURL;
        console.log(data, name, photo);

        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            updateUserProfile(name, photo)
            .then(()=>{
                // create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email
            }
            })
            .catch(()=>{   
                toast.error("Something went wrong!");
            })
        })
        .catch(()=>{
            toast.error("This email already exists!");
        })

    }

    return (
        <div className="flex items-center justify-center">
                
                <div className="hero mt-40 mb-32">
                    <div className="hero-content flex-col  md:w-full lg:w-[800px] h-[600px]">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-3">Register now!</h1>
                        </div>
                        <div className="card shrink-0 w-3/4 shadow-2xl bg-[#EDFAF6]">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
                                {/* USERNAME */}
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                        <input type="Name" placeholder="Your Name"  className="w-full" {...register("name", { required: true })}/>
                                    </label>
                                    {errors.name && <span className="mt-2 text-[#FF5A3D]">This field is required</span>}
                                </div>
                                {/* EMAIL */}
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="email" placeholder="email" className="w-full"  {...register("email", { required: true })}/>
                                    </label>
                                    {errors.email && <span className="mt-2 text-[#FF5A3D]">This field is required</span>}
                                </div>
                                {/* PHOTO URL */}
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <MdOutlineAddPhotoAlternate className="text-gray-500 text-md"/>
                                        <input type="photourl" placeholder="Photo URL" className="w-full" {...register("photoURL", { required: true })}/>
                                    </label>
                                    {errors.photoURL && <span className="mt-2 text-[#FF5A3D]">This field is required</span>}
                                </div>
                                {/* PASSWORD */}
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input type={passwordState ? 'text' : 'password'} className="w-full" placeholder="Password"  {...register("password", { 
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}/>
                                            <div onClick={()=>setPasswordState(!passwordState)} className="absolute right-5 top-[50px] text-[#2e9c7b]">
                                                {
                                                    passwordState ? <FaRegEye className="text-xl"/> : <FaRegEyeSlash className="text-xl" />
                                                }
                                            </div>
                                    </label>
                                    
                                    {errors.password?.type === 'minLength' && <span className="mt-2 text-[#FF5A3D]">Password must be atleast 6 characters</span>}
                                    {errors.password?.type === 'required' && <span className="mt-2 text-[#FF5A3D]">This field is required</span>}
                                    {errors.password?.type === 'pattern' && <span className="mt-2 text-[#FF5A3D]">Password must contain atleast one number, lowercase and uppercase letter</span>}
                                    
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-[#b6f8e4] button-styles text-lg hover:bg-[#98fbdd] text-black">Register</button>
                                </div>
                            </form>
                            <div className='mx-8 mb-8 text-center flex justify-center'>
                                <p>Already have an account? <Link className="text-[#2e9c7b] underline font-semibold" to={'/login'}>Login Now</Link></p>
                            </div>
                            <Link to="/" className='flex gap-2 z-10 text-[#2e9c7b] items-center justify-end pb-3 pr-4'>
                                <p>Back to Home </p>
                                <IoArrowRedoSharp />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Registration;