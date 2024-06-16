import { FcViewDetails } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReportedContents = () => {

    // GET PRODUCT DATA
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`techhive-server.vercel.app/reported-products`)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            
        })
    }, [products])

    // DELETE PRODUCT
    const handleDelete = _id =>{
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          })
          .then((result)=>{
            if(result.isConfirmed){
                fetch(`techhive-server.vercel.app/add-product/${_id}`, {
                    method: "DELETE",
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.deletedCount>0)
                    {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The spot has been deleted!",
                            icon: "success"
                          });
                        setProducts(products.filter(sp=>sp._id!==_id)); 
                    }
                })
            }
          })
    }

    return (
        <div>
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
                                                         

                            {/* Delete Product */}
                            <th>
                                    <TiDelete onClick={()=>handleDelete(product._id)}  className="text-red-400 mx-auto"/>                           
                            </th>
                        </tr>)
                    }
                    </tbody>                    
                </table>
            </div>
        </div>
        </div>
    );
};

export default ReportedContents;