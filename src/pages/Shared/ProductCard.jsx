import { useContext, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const {_id, product_name, product_image, product_tags, upvote_count, owner_email} = product;
    const {user, loading} = useContext(AuthContext);
    const [voted, setVoted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(user);
    if(loading){
        return <progress className="progress w-56"></progress>
    }

    // console.log(user.email)
    
    const handleVote = async() =>{
        // redirect user to login if no user
        if(!user){
            //   send the user to the login page
            navigate('/login', { state: { from: location } })
        }

        // update upvote_count if used has not voted yet
        if(!voted){
            fetch(`http://localhost:5000/products/${_id}`, {
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
                // const classes = document.getElementById('upvote_btn').classList;
                // console.log(classes);
                // classes.add("disabled")
            })
        }
    }

  return (

    <div className="card card-side relative w-fit bg-[#EDFAF6] shadow-xl">
        <figure className="p-6 w-2/3 min-h-[360px]">
            <img className="max-w-72 rounded-3xl" src={product_image} alt="Movie"/>
        </figure>
        <div className="card-body my-auto">
            <h2 className="card-title font-bold text-2xl mb-2">{product_name}</h2>
            <div className="flex gap-4  flex-wrap">
            {
                product_tags.map(tag=><span key={_id} className="grid grid-cols-1 w-fit bg-[#98fbdd] font-semibold rounded-xl shadow-md py-1 px-3">{tag}</span>)
            }
        </div>
            <div className="card-actions right-8 top-14 absolute justify-end border border-[#98fbdd] rounded-xl p-2  w-fit ">
                <div className="flex gap-2 justify-center items-center">
                    {/* <button onClick={handleVote} className={" " +(user.email===owner_email ? 'disabled:' : '')}> */}
                    {user?
                        <button onClick={handleVote} id="upvote_btn" className={` ${user.email===owner_email? 'disabled' : 'bg-yellow-300'}`} >
                            <BiSolidUpArrow className={`text-2xl ${user.email===owner_email? '':'hover:text-[#98fbdd]'} `}></BiSolidUpArrow>
                        </button>
                    :
                        <button onClick={handleVote} >
                            <BiSolidUpArrow className="text-2xl hover:text-[#98fbdd]"></BiSolidUpArrow>
                        </button>
                    }
                    <p className="text-xl font-bold">{upvote_count}</p>
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
