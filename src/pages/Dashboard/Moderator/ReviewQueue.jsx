// import { useQueries } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import SectionTitle from "../../Shared/SectionTitle";
import { FcViewDetails } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "../Moderator/Moderator.css"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewQueue = () => {

    // const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic
    // const { data: products = [], refetch } = useQueries({
    //         queryKey: ['products-queue'],
    //         queryFn: async () => {
    //             const res = await axiosPublic.get('/products-review-queue');
    //             return res.data;
    //         }
    // })

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`techhive-server.vercel.app/products-review-queue`)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            
        })
    }, [products])

    //  MAKE FEATURED
    const handleMakeFeatured = (id, product) =>{
        console.log('featured')
        if(product.featured===true){
            toast.error(`${product.product_name} is already featured!`)
        }
        else{
            fetch(`techhive-server.vercel.app/products/featured/${id}/`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setProducts(products);
                if(data.modifiedCount>0){
                    toast.success(`${product.product_name} has been featured!`)
                }
            })
        } 
    }

    // ACCEPT PENDING PRODUCT
    const handleAccept = (id, product) => {
        console.log('accepting product');
        if(product.status==='accepted'){
            toast.error(`${product.product_name} is already accepted!`);
        }
        else{
            fetch(`techhive-server.vercel.app/products/accepted/${id}/`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(product)
                })
            .then(res=>res.json())
            .then(data=>{
                    // console.log(data);
                    setProducts(products);
                    if(data.modifiedCount>0){
                        toast.success(`${product.product_name} has been accepted!`)
                        }
                        })
        }
    }


    // REJECT PRODUCT
    const handleReject = (id, product) => {
        console.log('accepting product');
        if(product.status==='accepted'){
            toast.error(`${product.product_name} is already rejected!`);
        }
        else{
            fetch(`techhive-server.vercel.app/products/rejected/${id}/`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(product)
                })
            .then(res=>res.json())
            .then(data=>{
                    setProducts(products);
                    if(data.modifiedCount>0){
                        toast.success(`${product.product_name} has been rejected!`)
                        }
                        })
        }
    }

    return (
        <div>
            <SectionTitle heading="Products Review Queue" subHeading=""></SectionTitle>
            <ToastContainer/>
            <div className="overflow-x-auto px-28">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>View Details</th>
                        <th>Feature</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                    </thead>
                    <tbody className="space-y-20">

                
                    {
                        products.map(product=> <tr className="" key={product._id}>       
                            {/* Product Name */}
                            <td className="">{product.product_name}</td>

                            {/* View Details */}
                            <th>
                                <Link to={`/product/${product._id}`}>
                                    <FcViewDetails className="mx-auto"/>
                                </Link>
                            </th>
                            
                            {/* Make Featured */}
                            <th>
                                {
                                    product.featured===false?
                                    <FaStar onClick={()=>handleMakeFeatured(product._id, product)} className="text-yellow-400 mx-auto"/>
                                    :
                                    <FaStar className="text-slate-400 mx-auto"/>
                                }
                                
                            </th>

                            {/* Accept */}
                            <th>
                                {
                                    product.status!=="accepted"?
                                    <TiTick onClick={()=>handleAccept(product._id, product)} className="text-green-400 mx-auto"/>
                                    :
                                    <TiTick className="text-slate-400 mx-auto"/>
                                }
                            </th>  
                                

                            {/* Reject */}
                            <th>
                                {
                                    product.status!=="rejected"?
                                    <ImCross onClick={()=>handleReject(product._id, product)} className="text-red-400 mx-auto"/>
                                    :
                                    <ImCross className="text-slate-400 mx-auto"/>
                                }                                
                            </th>
                        </tr>)
                    }
                    </tbody>                    
                </table>
            </div>
        </div>
    );
};

export default ReviewQueue;