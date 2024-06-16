import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import "../User/UserDashboard.css"
import { FaFly } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { FaLocationDot, FaUsers } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import SectionTitle from "../../Shared/SectionTitle";


const Update = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const productInfo = useLoaderData();
    const {_id, product_name, product_image, product_tags, external_links, description} = productInfo;

    const onSubmit = (updatedProductInfo, event) =>{
        event.preventDefault();
        console.log(updatedProductInfo);

        //send a data to the server
        fetch(`techhive-server.vercel.app/update-product/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedProductInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Spot Updated Successfully.',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
                //   form.reset();
            }
            
        })
        
    }


    return (
        <div className="">
            {/* <Helmet>
                <title>Serendipia | Add Spot</title>
            </Helmet> */}
            <SectionTitle heading={`Update Details of ${product_name}`} subHeading="Edit details of the product and click update to save the changed information!"></SectionTitle>
            
            <form onSubmit={handleSubmit(onSubmit)} className="text-[#738e36] p-20 md:p-8 lg:px-28 space-y-4 card-body text-2xl lg:ml-[350px]">

                {/* Image */}
                <div className="form-control">
                    <div className="md:w-2/3">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Image:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            
                            <input type="url" className="grow p-1" placeholder="URL for the image of the spot" defaultValue={product_image} {...register("product_image", { required: true })}/>
                        </label>
                    </div>
                </div>
                {/* product name */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">

                    <div className="md:w-2/3">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Product Name:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                          
                            <input type="text" className="grow p-1" placeholder="Spot Name" defaultValue={product_name} {...register("product_name", { required: true })}/>
                        </label>
                    </div>
                    
                </div>

                {/* row-2 */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-2/3">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Tags:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            
                            <input type="text" className="grow p-1" placeholder="Location" defaultValue={product_tags} {...register("product_tags", { required: true })}/>
                        </label>
                    </div>
                    
                </div>
                
                {/* row-3 */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-2/3">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">External Links:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            
                            <input type="text" className="grow p-1" placeholder="Best season to travel there" defaultValue={external_links} {...register("external_links", { required: true })}/>
                        </label>
                    </div>
                    
                </div>

                {/* row-4 */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    {/* item 2 */}
                    <div className="md:w-2/3">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Description:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            
                            <input type="text" className="grow p-1" placeholder="Write a short description about the spot" defaultValue={description} {...register("description", { required: true })}/>
                        </label>
                    </div>
                </div>                
                
                
                <div className="form-control mt-6">
                <button className="btn   bg-[#b6f8e4] text-black hover:bg-[#98fbdd] text-base font-bold w-fit lg:ml-64 lg:text-xl font-medium pb-10 pt-4 px-10 flex items-center justify-center">Update</button>
                </div>
            </form>
           
        </div>
    );
};

export default Update;