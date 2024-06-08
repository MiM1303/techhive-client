import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import "../Home/Banner.css"
import { BiSolidUpArrow } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"
import useReviews from "../../hooks/useReviews";
import { FaUserCircle } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Controller, useForm } from 'react-hook-form';


const ProductDetails = () => {
    const product = useLoaderData();
    const { _id, product_name, product_image, description, product_tags, upvote_count, external_links, owner_email, reported } = product;
    const {user, loading, voted, setVoted} = useContext(AuthContext);
    // const [voted, setVoted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [action, setAction] = useState('');

    const [reviews] = useReviews(_id);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        mode: 'onBlur',
        defaultValues: {
          name: '',
          rating: 0,
        },
      });

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    const handleVote = async() =>{
        // redirect user to login if no user
        if(!user){
            //   send the user to the login page
            navigate('/login', { state: { from: location } })
        }

        // update upvote_count if used has not voted yet
        if(!voted){
            setAction('upvote');
            console.log('upvoted')
            fetch(`http://localhost:5000/products/${_id}?action=${action}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setVoted(true);
            })
        }
    }

    const handleReport = () =>{
        setAction('report');
        console.log('reported')
        if(!reported){
            fetch(`http://localhost:5000/products/${_id}?action=${action}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }
    }

    // ADD REVIEW
    const onSubmit = (review) => {
        // if(user && user.email){
        //     review.user_img_url = user.photoURL;
        //     review.name = user.displayName;
        //     // console.log(data);
            
        //     //send review data to server
        //     fetch('https://meraki-server.vercel.app/reviews', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(review)
        //     })
        //     .then(res=>res.json())
        //     .then(data=>{
        //         // console.log(data);
                
        //         if(data.insertedId)
        //         {
        //             Swal.fire({
        //                 title: 'Success!',
        //                 text: `Review added successfully! Thank you for your feedback!!`,
        //                 icon: 'success',
        //                 confirmButtonText: 'Close'
        //             })
        //             console.log(review);
        //             setReviews([review, ...reviews]);
        //         }
                
        //     })
        // }
        // else
		// {
		// 	Swal.fire({
		// 		title: "You are not logged in",
		// 		text: "Please login to add food to cart!",
		// 		icon: "warning",
		// 		showCancelButton: true,
		// 		confirmButtonColor: "#3085d6",
		// 		cancelButtonColor: "#d33",
		// 		confirmButtonText: "Login"
		// 	}).then((result) => {
		// 		if (result.isConfirmed) {
        //             console.log( location.pathname);
		// 			// send user to login page
		// 			navigate('/login', {state: location.pathname });
		// 		}
		// 	});
		// }
    }

  return (
    <div>
        {/* PRODUCT DETIALS */}
        <div
            className="hero h-[600px]  w-1/2 mx-auto my-20 "
            style={{
                backgroundImage:
                `url(${product_image})`,
            }}
            >
            <div className="hero-overlay detail-bg"></div>
            <div className="hero-content text-center text-neutral-100  p-14">
                <div className="">
                    <div className="hero-content text-left gap-14 flex-col lg:flex-row">
                        <Link to={`${external_links}`}><img src={product_image} className="max-w-xs rounded-lg shadow-2xl" /></Link>
                        <div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-5xl font-bold">{product_name}</h1>
                            <div className="flex  justify-center items-center mr-4">
                                <div className="flex gap-2 justify-center items-center mr-4 bg-green-500 py-1 px-2 rounded-2xl">
                                    <p className="text-lg font-bold">{upvote_count}</p>
                                    {/* if there is user check if user is product owner */}
                                    {user?
                                        <button onClick={handleVote} id="upvote_btn" className={` ${user.email===owner_email? 'disabled' : ''}`} >
                                            <BiSolidUpArrow className={`text-2xl ${user.email===owner_email? '':'hover:text-[#98fbdd]'} `}></BiSolidUpArrow>
                                        </button>
                                    :
                                    // user is null so redirect to login page
                                        <button onClick={handleVote} >
                                            <BiSolidUpArrow className="text-2xl hover:text-[#98fbdd]"></BiSolidUpArrow>
                                        </button>
                                    }
                                </div>
                                <button onClick={handleReport} className="bg-red-500 border-none text-white rounded-2xl py-2 px-3 text-sm font-bold">Report</button>
                            </div>
                        </div>
                        <p className="py-6 text-lg font-semibold">{description}</p>
                        <div className="flex gap-4  flex-wrap">
                            {
                                product_tags.map(tag=><span key={_id} className="grid grid-cols-1 w-fit  font-semibold rounded-xl shadow-md py-1 px-3 bg-[#EEF2FF] text-black">{tag}</span>)
                            }
                        </div>
                        <div className="my-5">
                            <Link to={`${external_links}`} className="text-lg font-semibold">Check out {product_name} here!</Link>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* REVIEW FORM AND SLIDER */}
        <div>
            {/* REVIEW FORM */}
            <div className="hero mt-16 lg:w-1/2 mx-auto">
                    <div className="hero-content  flex-col md:w-full lg:w-[800px] mb-2 ">
                        <div className="card shrink-0  shadow-2xl bg-[#FCE9DA] w-3/4">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl p-6 bg-[#fbece0]">
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <input type="text" {...register("review", { required: true })} placeholder="Write your review here..." className="input input-bordered"/>
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
                                    <button className="btn bg-[#cb946a] button-styles  text-lg text-white">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            {/* REVIEW SLIDER */}
        <div className="flex flex-col mt-4 md:mt-14 lg:mt-16 justify-center items-center mb-16">
                <div className="lg:carousel md:carousel carousel-center w-fit p-4 space-x-4 rounded-box hidden  bg-slate-600 ">
                {/* LARGE DEVICE */}
                    {
                        reviews.map(rev=> <div key={rev._id}
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${product_image})`,
                                
                            }}
                            className={`text-black carousel-item md:w-[545px] lg:w-[568px] rounded-box flex flex-col gap-6 text-center p-20 bg-cover bg-center`}> 
                        <img src={rev.reviewer_image} className="rounded-full w-24 mx-auto" alt="" />
                        <h2 className="text-3xl font-bold ">{rev.reviewer_name}</h2>
                        <p className=" text-xl leading-relaxed"><span className="text-2xl font-bold ">"</span>{rev.review_des}<span className="text-2xl font-bold">"</span></p> 
                        <Rating style={{ maxWidth: 180 }} value={rev.rating} readOnly className="mx-auto"/>
                        </div> )
                        
                    }
                </div>
                {/* SMALL DEVICE */}
                <div className="h-[450px] carousel carousel-vertical rounded-box md:hidden lg:hidden">
                    {
                        reviews.map(rev=> <div key={rev.id} className="carousel-item w-[200px] h-full rounded-box flex flex-col gap-4 text-center p-10 bg-gradient-to-b from-[#F5EFD7] to-[#FCE9DA]"> 
                        <FaUserCircle className="mx-auto text-5xl text-[#69551c]"></FaUserCircle>
                        <h2 className="text-[#69551c] text-2xl font-semibold ">{rev.name}</h2>
                        <p className="text-[#69551c] text-xl leading-relaxed"><span className="text-2xl font-bold">"</span>{rev.review}<span className="text-2xl font-bold">"</span></p> </div> )
                    }
                </div>               
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;
