import { useContext, useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCard = ({product}) => {
    const {_id, product_name, product_image, product_tags, upvote_count, owner_email} = product;
    const [upvoteCount, setUpvoteCount] = useState(upvote_count);
    const {user, loading, voted, setVoted} = useContext(AuthContext);
    // const [voted, setVoted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(user);
    if(loading){
        return <progress className="progress w-56"></progress>
    }

    // console.log(product_name, upvoteCount, upvoteCount.length);
    const handleVote = async() =>{
        // redirect user to login if no user
        if(!user){
            //   send the user to the login page
            navigate('/login', { state: { from: location } })
        }

        // update upvote_count if used has not voted yet
        if(!upvoteCount.includes(user.email)){
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
        else{
            toast.error('You have already upvoted this product');
        }
    }

  return (

    <div className="card card-side relative flex flex-col md:flex-row w-fit bg-[#EDFAF6] shadow-xl">
        <ToastContainer />
        <figure className="p-6 md:px-2 md:py-0 mx-auto max-w-[250px] max-h-[250px] md:max-w-[320px] lg:w-2/3 md: lg:min-h-[360px]">
            <img className="max-h-[250px] max-w-[250px] md:max-w-[320px] lg:max-w-72 rounded-3xl" src={product_image} alt="Movie"/>
        </figure>
        <div className="card-body md:my-auto">
        <div className="flex">
            <h2 className="card-title font-bold text-xl md:text-2xl mb-2"><Link to={`/product/${_id}`}>{product_name}</Link></h2>
            <div className="card-actions top-80 right-2 md:right-2 lg:right-8 md:top-7 lg:top-14  absolute justify-end border border-[#98fbdd] rounded-xl py-1 px-2 lg:p-2  w-fit ">
                <div className="flex gap-2 justify-center items-center">
                    {/* if there is user check if user is product owner */}
                    {user?
                        <button onClick={handleVote} id="upvote_btn" className={` ${user.email===owner_email? 'disabled' : ''}`} >
                            <BiSolidUpArrow className={`text-base md:text-xl lg:text-2xl  ${user.email===owner_email? '':'hover:text-[#98fbdd]'} `}></BiSolidUpArrow>
                        </button>
                    :
                    // user is null so redirect to login page
                        <button onClick={handleVote} >
                            <BiSolidUpArrow className="text-sm md:text-2xl hover:text-[#98fbdd]"></BiSolidUpArrow>
                        </button>
                    }
                    <p className="text-base md:text-xl font-bold">{upvoteCount.length}</p>
                </div>
            </div>
        </div>
            <div className="flex gap-4  flex-wrap">
            {
                product_tags.map(tag=><span key={_id} className="grid grid-cols-1 w-fit bg-[#98fbdd] font-semibold text-sm md:text-base rounded-xl shadow-md py-1 px-2  lg:px-3">{tag}</span>)
            }
            </div>
            <div className="card-actions hidden top-80 right-2 md:right-2 lg:right-8 md:top-10 lg:top-14 absolute justify-end border border-[#98fbdd] rounded-xl p-0 md:p-2  w-fit ">
                <div className="flex gap-2 justify-center items-center">
                    {/* if there is user check if user is product owner */}
                    {user?
                        <button onClick={handleVote} id="upvote_btn" className={` ${user.email===owner_email? 'disabled' : ''}`} >
                            <BiSolidUpArrow className={`text-sm md:text-2xl ${user.email===owner_email? '':'hover:text-[#98fbdd]'} `}></BiSolidUpArrow>
                        </button>
                    :
                    // user is null so redirect to login page
                        <button onClick={handleVote} >
                            <BiSolidUpArrow className="text-sm md:text-2xl hover:text-[#98fbdd]"></BiSolidUpArrow>
                        </button>
                    }
                    <p className="text-lg md:text-xl font-bold">{upvoteCount.length}</p>
                </div>
            </div>
        </div>
    </div>



    // <div className="card w-fit bg-[#EDFAF6] shadow-xl">
    //   <figure className="px-10 pt-10 min-h-[360px]">
    //     <img
    //       className="max-w-80 rounded-3xl"
    //       src={product_image}
    //       alt="Shoes"
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="card-title font-bold text-2xl mb-2">{product_name}</h2>
    //     <div className="flex gap-4  flex-wrap">
    //         {
    //             product_tags.map(tag=><span key={id} className="grid grid-cols-1 w-fit bg-[#98fbdd] font-semibold rounded-xl shadow-md py-1 px-3">{tag}</span>)
    //         }
    //     </div>
    //     {/* <div className="card-actions justify-end">
    //       <button className="btn btn-primary">Buy Now</button>
    //     </div> */}
    //   </div>
    // </div>
  );
};

export default ProductCard;
