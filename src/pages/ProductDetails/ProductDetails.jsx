import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import "../Home/Banner.css"
import { BiSolidUpArrow } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"
import useReviews from "../../hooks/useReviews";
import { FaUserCircle } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Controller, useForm } from 'react-hook-form';
import SectionTitle from "../Shared/SectionTitle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = () => {
    const product = useLoaderData();
    const { _id, product_name, product_image, description, product_tags, upvote_count, external_links, owner_email, owner_name, owner_image, reported } = product;
    const [upvoteCount, setUpvoteCount] = useState(upvote_count);
    const {user, loading, voted, setVoted} = useContext(AuthContext);
    // const [voted, setVoted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [action, setAction] = useState('');
    

    // const [reviews] = useReviews(_id);
    const [productReviews, setProductReviews] = useState([])

    useEffect(()=>{
        fetch(`https://techhive-server.vercel.app/reviews/${_id}`)
        .then(res=>res.json())
        .then(data=>setProductReviews(data))
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        mode: 'onBlur',
        defaultValues: {
          rating: 0,
        },
      });

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    // TESTING
    if(upvote_count.includes(user.email))
        {
            console.log('upvote count array contains user email')
        }
    else{
        console.log('upvote count array DOES NOT contain user email')
    }

    const handleVote = async() =>{
        // redirect user to login if no user
        if(!user){
            //   send the user to the login page
            navigate('/login', { state: { from: location } })
        }

         // do not let vote is user is owner
         if(user.email===owner_email){
            toast.error("You are the owner of this product");
            return;
        }
        // do not let vote is user has already upvoted this product
        else if(upvoteCount.includes(user.email)){
            toast.error('You have already upvoted this product');
            return;
        }
        // update upvote_count if used has not voted yet
        else{
            // upvote_count.push(user.email);
            fetch(`https://techhive-server.vercel.app/products/upvote/${_id}?email=${user.email}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(data=>{
                setUpvoteCount([user.email, ...upvoteCount]);
                // console.log(data);

            })
        }
    }

    const handleReport = () =>{
        
            // console.log('report')
            fetch(`https://techhive-server.vercel.app/products/report/${_id}/`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(data=>{
                toast.success(`${product_name} was reported!`);
                // console.log(data);
            })
        
    }

    // ADD REVIEW
    const onSubmit = (review) => {
        if(user && user.email){
            review.reviewer_image = user.photoURL;
            review.reviewer_name = user.displayName;
            review.product_Id = _id;
            // console.log(review);
            
            // send review data to server
            fetch('https://techhive-server.vercel.app/reviews', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(review)
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                
                if(data.insertedId)
                {
                    toast.success("Added review successfully!");
                    console.log(review);
                    setProductReviews([review, ...productReviews]);
                }
                
                
            })
        }
        else
		{
			toast.error("Something went wrong. Please try again later.");
		}
    }

  return (
    <div>
        <ToastContainer />
        {/* PRODUCT DETIALS */}
        <div
            className="hero  h-[300px] lg:h-[600px] lg:w-1/2 mx-auto my-20 "
            style={{
                backgroundImage:
                `url(${product_image})`,
            }}
            >
            <div className="hero-overlay detail-bg"></div>
            <div className="hero-content text-center text-neutral-100  md:p-14">
                <div className="">
                    <div className="hero-content text-left md:gap-14 flex-col lg:flex-row">
                        <Link to={`${external_links}`}><img src={product_image} className="w-1/3 lg:w-full rounded-lg shadow-2xl mx-auto" /></Link>
                        <div>
                        <div className="flex flex-col gap-2 md:flex-row justify-between items-center">
                            <h1 className="text-3xl md:text-5xl font-bold">{product_name}</h1>
                            <div className="flex  justify-center items-center mr-4">
                                <div className="flex gap-2 justify-center items-center mr-4 bg-green-500  px-1 md:py-1 md:px-2 rounded-lg md:rounded-2xl">
                                    <p className="text-lg font-bold">{upvoteCount.length}</p>
                                    {/* if there is user check if user is product owner */}
                                    {user?
                                        <button onClick={handleVote} id="upvote_btn" className={` ${user.email===owner_email? 'disabled' : ''}`} >
                                            <BiSolidUpArrow className={`text-lg md:text-2xl  ${user.email===owner_email? '':'hover:text-[#98fbdd]'} `}></BiSolidUpArrow>
                                        </button>
                                    :
                                    // user is null so redirect to login page
                                        <button onClick={handleVote} >
                                            <BiSolidUpArrow className="text-lg md:text-2xl hover:text-[#98fbdd]"></BiSolidUpArrow>
                                        </button>
                                    }
                                </div>
                                <button onClick={handleReport} className="bg-red-500 border-none text-white rounded-lg md:rounded-2xl py-1 md:py-2 px-2 md:px-3 text-sm font-bold">Report</button>
                            </div>
                        </div>
                        <p className="py-6 text-base md:text-lg font-semibold">{description}</p>
                        <div className="flex gap-4  flex-wrap">
                            {
                                product_tags.map(tag=><span key={_id} className="grid grid-cols-1 w-fit text-sm font-semibold rounded-xl shadow-md py-1 px-2 md:px-3 bg-[#EEF2FF] text-black">{tag}</span>)
                            }
                        </div>
                        <div className="my-5">
                            <Link to={`${external_links}`} className=" text-base md:text-lg font-semibold">Check out {product_name} here!</Link>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* REVIEW FORM AND SLIDER */}
        <div className="mt-64 md:mt-[380px] lg:mt-0">
            {/* REVIEW FORM */}
            <div className="hero md:mt-16 w-full md:w-full lg:w-full mx-auto">
                    <div className="hero-content md:p-0  flex-col md:w-full lg:w-full mb-2 ">
                        <div className="card shrink-0  shadow-2xl bg-[#EDFAF6] md:w-3/4">
                            <form onSubmit={handleSubmit(onSubmit)} className=" card-body rounded-xl  md:p-6 bg-[#EDFAF6]">
                                {/* disabled username and image */}
                                <div className="flex gap-10 items-center justify-center">
                                    <input type="image" src={`${user.photoURL}`} className="w-14 rounded-full" alt="" disabled/>
                                    <input type="text" placeholder={`${user.displayName}`} className="input input-bordered w-full text-black" disabled />
                                </div>
                                {/* <label className="label">
                                        <span className="label-text">Your Name</span>
                                </label> */}
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <input type="text" {...register("review_des", { required: true })} placeholder="Write your review here..." className="input input-bordered"/>
                                    {errors.review && <span className="mt-2 text-[#FF5A3D]">This field is required</span>}
                                </div>
                                <div>
                                    <label id="rating_label" className="label">
                                            <span className="label-text">Rating</span>
                                    </label>
                                        <Controller
                                        control={control}
                                        name="rating"
                                        rules={{
                                            validate: (rating) => rating > 0,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Rating
                                            value={value}
                                            isRequired
                                            onChange={onChange}
                                            visibleLabelId="rating_label"
                                            onBlur={onBlur}
                                            style={{ maxWidth: 180 }}
                                            />
                                        )}
                                        />
                                    {errors.review && <span className="mt-5 text-[#FF5A3D]">Rating is required</span>}
                                </div>
                                <div className="form-control mt-2">
                                    <button className="btn bg-[#b6f8e4] text-base font-semibold text-black hover:bg-[#98fbdd] ">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        <SectionTitle heading="Reviews" subHeading={`Swipe to check out some reviews from our users for ${product_name}!`} ></SectionTitle>

            {/* REVIEW SLIDER */}
            {
                productReviews.length===0?
                <h2 className="text-center mt-5 lg:text-2xl mb-10 font-semibold">There are no reviews for {product_name} yet. Be the first one to add a review!</h2>
                :
                <div className="flex flex-col mt-4 md:mt-14 lg:mt-16 justify-center items-center mb-16">

            {/* <div className="lg:carousel md:carousel carousel-center w-2/3 p-4 space-x-4 rounded-box hidden bg-[#EBB22F] "> */}
                {/* LARGE DEVICE */}
                    {/* {
                        productReviews.map(rev=> <div key={rev.id} className="carousel-item md:w-[545px] lg:w-[568px] rounded-box flex flex-col gap-6 text-center p-20 bg-[linear-gradient(45deg,rgba(19,19,24,0.50),rgba(19,19,24,0.50)),url('https://i.ibb.co/V9z4RgS/food-bg-1-min.jpg')] bg-cover"> 
                        <img src={rev.reviewer_image} className="rounded-full w-20 mx-auto" alt="" />
                        <h2 className="text-[26px] font-bold ">{rev.reviewer_name}</h2>
                        <p className=" text-lg leading-relaxed"><span className="text-2xl font-bold ">"</span>{rev.review_des}<span className="text-2xl font-bold">"</span></p> 
                        <Rating style={{ maxWidth: 160 }} value={rev.rating} readOnly className="mx-auto"/>
                        </div> )
                        
                    } */}
                {/* </div> */}

                <div className="lg:carousel md:carousel carousel-center  md:w-[595px] lg:w-[960px] md:p-5 lg:p-4 space-x-4 rounded-box hidden  bg-slate-600 ">
                {/* LARGE DEVICE */}
                    {
                        productReviews.map(rev=> <div key={rev._id}
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${product_image})`,
                                
                            }}
                            className={`carousel-item text-black  md:w-[500px] md:min-h-fit lg:w-[568px] rounded-box flex flex-col gap-6 text-center p-8  bg-cover bg-center`}> 
                        <img src={rev.reviewer_image} className="rounded-full w-20 mx-auto" alt="" />
                        <h2 className="text-[26px] font-bold ">{rev.reviewer_name}</h2>
                        <p className=" text-lg leading-relaxed"><span className="text-2xl font-bold ">"</span>{rev.review_des}<span className="text-2xl font-bold">"</span></p> 
                        <Rating style={{ maxWidth: 160 }} value={rev.rating} readOnly className="mx-auto"/>
                        </div> )
                        
                    }
                </div>
                {/* SMALL DEVICE */}
                <div className="md:hidden lg:hidden carousel-center w-11/12 p-4 space-x-4 rounded-box  bg-slate-600 ">
                    <div className="h-[320px] w-[320px] carousel carousel-vertical rounded-box md:hidden lg:hidden">
                    {
                        productReviews.map(rev=> <div key={rev._id} 
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${product_image})`,
                                
                            }}
                            className="carousel-item w-[290px] h-full rounded-box flex flex-col gap-4 text-center p-6 bg-center"> 
                        <img src={rev.reviewer_image} className="max-w-[68px] mt-2 rounded-full mx-auto" alt="" />
                        <h2 className="text-black text-xl font-bold ">{rev.reviewer_name}</h2>
                        <p className="text-black font-semibold text-base leading-relaxed"><span className="text-2xl font-bold">"</span>{rev.review_des}<span className="text-2xl font-bold">"</span></p> 
                        <Rating style={{ maxWidth: 100 }} value={rev.rating} readOnly className="mx-auto"/>
                        </div> 
                        )
                        
                    }
                </div>  
                </div>             
            </div>
            }
            
        </div>
    </div>
  );
};

export default ProductDetails;
