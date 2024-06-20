import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)
    
    // SIGN IN WITH EMAIL PASSWORD
    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Logged in successfully!");
                
            })
        navigate(from, { replace: true });
    }



    const handleGoogleLogin = ()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user);
            // create user entry in the database
            const userInfo = {
                user_name: result.user?.displayName,
                user_image: result.user?.photoURL,
                user_email: result.user?.email,
                membership_status: 'Not Verified',
                product_add_count: 0,
                role: "User"
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
            })
            // navigate after login
            navigate(from, { replace: true });
            toast.success("Logged in successfully!");

            
        })
        
    }


    return (
        <div>
            <div className='flex lg:flex-row items-center justify-center mt-10 md:mt-24'>
                <div className="hero mt-16 lg:w-1/2 ">
                    <div className="hero-content  flex-col md:w-full lg:w-[800px] h-[600px] mb-2 lg:mb-44">
                        
                        <div className="card shrink-0 pt-10 shadow-2xl  bg-[#EDFAF6] w-3/4">
                        <div className="text-center ">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-5">Login now!</h1>
                        </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl p-6  bg-[#EDFAF6]">
                                {/* EMAIL */}
                                <div className="form-control mb-3">
                                <label className="label">
                                        <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input type="email" {...register("email", { required: true })} placeholder="Email" />
                                </label>
                                {errors.email && <span className="mt-3 text-[#FF5A3D]">This field is required</span>}
                                </div>
                                {/* PASSWORD */}
                                <div className="form-control">
                                <label className="label">
                                        <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input type="password" {...register("password", { required: true })} placeholder="Password" />
                                </label>
                                {errors.password && <span className="my-2 text-[#FF5A3D]">This field is required</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-[#b6f8e4] text-black button-styles hover:bg-[#98fbdd] text-base md:text-lg ">Login</button>
                                </div>
                            </form>
                           <div className='flex flex-col md:flex-row lg:flex-row lg:gap-4 mx-auto bg-[#EDFAF6]'>
                                <div className='mx-8 lg:mb-8 mb-4 justify-center  bg-[#EDFAF6]'>
                                    <p className='text-center mb-2 text-base md:text-lg font-semibold text-[#2e9c7b]'>Or Login With:</p>
                                    <button onClick={handleGoogleLogin} className="btn text-lg  bg-[#EDFAF6] hover:bg-[#98fbdd] ">
                                        <FcGoogle className='text-lg md:text-2xl'></FcGoogle>
                                        Google
                                    </button>
                                </div>
                           </div>
                            <div className='mx-8 mb-8 flex justify-center text-center'>
                                <p>Don&apos;t have an account? <Link className="text-[#2e9c7b] underline font-semibold" to={'/register'}>Register Now</Link></p>
                            </div>
                            <Link to="/" className='flex gap-2 z-10 text-[#2e9c7b] items-center justify-end pb-3 pr-4'>
                                <p>Back to Home </p>
                                <IoArrowRedoSharp />
                            </Link>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default Login;