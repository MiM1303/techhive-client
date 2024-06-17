import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../../providers/AuthProvider";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "../User/UserDashboard.css"



const  ListItem = ({product, products, setProducts }) => {
    const {_id, product_name, product_image, upvote_count, status} = product;
    const {user} = useContext(AuthContext);
    const userEmail = user.email;

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
                fetch(`https://techhive-server.vercel.app/add-product/${_id}`, {
                    method: "DELETE",
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.deletedCount>0)
                    {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been deleted!",
                            icon: "success"
                          });
                        setProducts(products.filter(sp=>sp._id!==_id)); 
                    }
                })
            }
          })
    }
    return (
        <tr >
            {/* image */}
            <td className="px-0  py-6 lg:text-center">
            <div className="flex items-center justify-center gap-3 mx-auto">
                <div className="avatar">
                <div className="mask mask-squircle  w-8 h-8 lg:w-16 lg:h-16">
                    <img src={product_image} className="md:mx-auto"  />
                </div>
                </div>
                {/* <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                </div> */}
            </div>
            </td>
            {/* Product Name */}
            <td className="p-0 text-center py-6 lg:text-center">{product_name}</td>
            {/* upvotes */}
            <td className="p-0 text-center py-6 lg:text-center">
                <div className="lg:pl-8">{upvote_count.length}</div>
            </td>
            {/*  */}
            
            <td className="p-0 py-6 lg:text-center">{status} </td>
            <th className="text-xl py-6 text-warning p-0 lg:text-center">
                <Link to={`update-product/${_id}`}>
                    <button className="btn btn-ghost btn-xs"><MdModeEdit className="text-lg lg:text-3xl text-warning"/></button>
                </Link>
            </th>
            <th className="text-xl py-6 text-red-600 p-0 lg:text-center">
            <button onClick={()=>handleDelete(_id)} className="btn btn-ghost btn-xs"><MdDelete className="text-lg lg:text-3xl text-error"/></button>
            </th>
        </tr>
    );
};

export default ListItem;