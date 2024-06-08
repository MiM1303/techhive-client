import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import "../Home/Banner.css"
import { BiSolidUpArrow } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"


const ProductDetails = () => {
    const product = useLoaderData();
    const { _id, product_name, product_image, description, product_tags, upvote_count, external_links, owner_email } = product;
    const {user, loading, voted, setVoted} = useContext(AuthContext);
    // const [voted, setVoted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
            })
        }
    }

  return (
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
                        <button className="bg-red-500 border-none text-white rounded-2xl py-2 px-3 text-sm font-bold">Report</button>
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
  );
};

export default ProductDetails;
