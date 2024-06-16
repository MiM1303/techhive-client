import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../../providers/AuthProvider";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "../User/UserDashboard.css"



const ListItem = ({product, products, setProducts }) => {
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
        <tr>
            {/* image */}
            <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                <div className="mask mask-squircle w-16 h-16">
                    <img src={product_image} className=""  />
                </div>
                </div>
                {/* <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                </div> */}
            </div>
            </td>
            {/* Spot Name */}
            <td>{product_name}</td>
            {/* location */}
            <td>
                <div className="pl-8">{upvote_count.length}</div>
            </td>
            {/*  */}
            
            <td>{status} </td>
            <th className="text-xl text-warning">
                <Link to={`/update-product/${_id}`}>
                    <button className="btn btn-ghost btn-xs"><MdModeEdit className="text-3xl text-warning"/></button>
                </Link>
            </th>
            <th className="text-xl text-red-600">
            <button onClick={()=>handleDelete(_id)} className="btn btn-ghost btn-xs"><MdDelete className="text-3xl text-error"/></button>
            </th>
        </tr>
    );
};

export default ListItem;