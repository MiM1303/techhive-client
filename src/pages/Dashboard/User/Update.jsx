import { useLoaderData, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import "../User/UserDashboard.css"
import SectionTitle from "../../Shared/SectionTitle";
import { TagsInput } from "react-tag-input-component";
import { useEffect, useState } from "react";


const Update = () => {
    const { id } = useParams();
    // console.log(id);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    // const productInfo = useLoaderData();
    // const {_id, product_name, product_image, product_tags, external_links, description} = productInfo;
    // const tagsArray = productData.product_tags.split(','); // Split tags string to array
    //     setSelectedTags(tagsArray);
    // const [selectedTags, setSelectedTags] = useState([]);
    
    const [selected, setSelected] = useState([]);
    const [ product, setProduct ] = useState({});
    const [imageURL, setImageURL] = useState('');
    useEffect(()=>{
        fetch(`https://techhive-server.vercel.app/products/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
            setSelected(data.product_tags);
            setImageURL(data.product_image);
            console.log('after setProduct', selected);
            console.log(data, product);
            
            // const tagsArray = data.product_tags.split(','); // Split tags string to array
            // setSelected(tagsArray);
            // console.log('after data statements', data.product_tags, tagsArray);
            // console.log(selected);
            // setLoading(false);
        })
    }, [])
    
    const onSubmit = (updatedProductInfo, event) =>{
        console.log('inside onsubmit call');
        event.preventDefault();
        console.log('updating', updatedProductInfo);
        updatedProductInfo.product_tags = selected;
        if(updatedProductInfo.product_image===""){
            updatedProductInfo.product_image = imageURL;
        }

        //send a data to the server
        fetch(`https://techhive-server.vercel.app/update-product/${product._id}`, {
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
                    text: 'Product Updated Successfully.',
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
            <SectionTitle heading={`Update Details of ${product.product_name}`} subHeading="Edit details of the product and click update to save the changed information!"></SectionTitle>
            
            <form onSubmit={handleSubmit(onSubmit)} className="text-[#738e36] md:p-8  space-y-4 card-body text-2xl">

                {/* Image */}
                <div className="form-control">
                    <div className="md:w-full">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Image:</span>
                        </div>
                        {/* <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2"> */}
                        <input type="file"  className="file-input file-input-bordered  w-full" defaultValue={product.product_image} placeholder={`${product.product_image}`} {...register("product_image", { required: false })}/>
                            {/* <input type="url" className="grow p-1" placeholder="URL for the image of the spot" defaultValue={product.product_image} {...register("product_image", { required: false })}/> */}
                        {/* </label> */}
                    </div>
                </div>
                {/* product name */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">

                    <div className="md:w-full">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Product Name:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                          
                            <input type="text" className="grow p-1" defaultValue={product.product_name} {...register("product_name", { required: false })}/>
                        </label>
                    </div>
                    
                </div>

                {/* TAGS */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-full">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Tags:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            defaultValue={product.product_tags}
                            // placeHolder="enter relevant tags for the product"
                            className="min-w-full border-0"
                        />
                            {/* <input type="text" className="grow p-1" placeholder="Location" defaultValue={product_tags} {...register("product_tags", { required: true })}/> */}
                        </label>
                    </div>
                    
                </div>
                
                {/* row-3 */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-full">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">External Links:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        
                            <input type="text" className="grow p-1" defaultValue={product.external_links} {...register("external_links", { required: false })}/>
                        </label>
                    </div>
                    
                </div>

                {/* row-4 */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    {/* item 2 */}
                    <div className="md:w-full">
                        <div className="label">
                            <span className="label-text text-lg md:text-xl">Description:</span>
                        </div>
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            
                            <input type="text" className="grow p-1" placeholder="Write a short description about the spot" defaultValue={product.description} {...register("description", { required: false })}/>
                        </label>
                    </div>
                </div>                
                
                <div className="form-control mt-6">
                    <button className="btn   bg-[#b6f8e4] text-black hover:bg-[#98fbdd] text-base font-bold w-fit lg:ml-64 lg:text-xl mx-auto pb-10 pt-4 px-10 flex items-center justify-center">Update</button>
                </div>
            </form>
           
        </div>
    );
};

export default Update;