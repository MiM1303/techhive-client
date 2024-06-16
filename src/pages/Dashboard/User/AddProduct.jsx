import SectionTitle from "../../Shared/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { TagsInput } from "react-tag-input-component";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddProduct = () => {

    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selected, setSelected] = useState([]);
    // console.log(user)

    const {
        register, reset,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [addedProductCount, setAddedProductCount] = useState(0);
      const [membershipStatus, setMembershipStatus] = useState('');
      useEffect(()=>{
        fetch(`techhive-server.vercel.app/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
            setAddedProductCount(data.product_add_count);
            setMembershipStatus(data.membership_status);
        });
      },[addedProductCount])


      const onSubmit = async(data) => {
        console.log(data);
        //image upload to imgbb and then get an url
        const imageFile = { image: data.product_image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){

            if(membershipStatus==="Not Verified" && addedProductCount>0){
                toast.error('You have already added a product. Please get a subscription to add more!');
                return;
            }

            let d = new Date(Date.now());
            let year = d.getFullYear();
            let month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            let day = d.getDate().toString().padStart(2, '0');
            let formattedDate = `${year}-${month}-${day}`;

            // now send the product data to the server with the image url
            const product = {
                product_name: data.product_name,
                product_image: res.data.data.display_url,
                external_links: data.external_links,
                description: data.description,
                product_tags: selected,
                upvote_count: [],
                status: 'pending',
                featured: false,
                owner_name: user.displayName,
                owner_email: user.email,
                owner_image: user.photoURL,
                reported: false,
                timestamp: formattedDate
            }

            const productRes = await axiosSecure.post('/add-product', product);
            console.log(productRes.data)
            if(productRes.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                            title: 'Success!',
                            text: `${data.product_name} is added to the website and is under review.`,
                            icon: 'success',
                            confirmButtonText: 'Close'
                          })
                setAddedProductCount(addedProductCount+1);
            }
            console.log(product)

        }
        // console.log(res.data);
    }


    return (
        <div>
            <SectionTitle heading="Add Product" subHeading="Add a product by filling in all the correct details and hitting add!"></SectionTitle>
            <ToastContainer />
            {/* ADD PRODUCT FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="font-teachers text-[#9c6637] mx-auto grid grid-cols-1 p-2 md:p-8 md:gap-4 card-body text-2xl">
                <div className="">
                    <label className=" flex items-center text-base md:text-xl h-16 gap-2">
                        Product Image:
                        <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" placeholder="Insert an image for the products" {...register("product_image", { required: true })}/>
                    </label>
                </div>
                {/* name */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Product Name:
                            <input type="text" className="grow p-1" placeholder="Name of Product" {...register("product_name", { required: true })}/>
                        </label>
                    </div>
                </div>
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    {/* item 2 */}
                    <div className="w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Description:
                            <input type="text" className="grow p-1" placeholder="Description of product" {...register("description", { required: true })}/>
                        </label>
                    </div>
                </div>
                
                {/* TAGS */}
                <div className="">
                    <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        Tags:
                        <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            placeHolder="enter relevant tags for the product"
                            className="min-w-full border-0"
                        />
                        {/* <input type="text" className="grow p-1"  placeholder="Tags" {...register("notes", { required: true })}/> */}
                    </label>
                </div>
                <div className="">
                    <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        External Links:
                        <input type="url" className="grow p-1"  placeholder="External links for the product" {...register("external_links", { required: true })}/>
                    </label>
                </div>
                {/* PRODUCT OWNER INFO */}
                <label className=" flex items-center text-base md:text-xl h-16 gap-2">
                Product Owner Information:
                            
                </label>
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                
                <img src={user.photoURL} className="w-16 h-16 rounded-full" alt="" />
                      {/* item 1 */}
                    <div className="md:w-1/2">
                    
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Added By:
                            <input type="text" className="grow p-1" placeholder={user.displayName} disabled/>
                        </label>
                    </div>
                    {/* item 2 */}
                    <div className="md:w-1/2">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Email:
                            <input type="text" className="grow p-1" placeholder={user.email} disabled/>
                        </label>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#cb946a] button-styles text-base font-bold lg:text-xl  pb-10 pt-4 flex items-center justify-center">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;