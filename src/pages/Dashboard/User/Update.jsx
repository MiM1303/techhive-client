import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle";
import { useMutation } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Update = () => {
    const product = useLoaderData();
    const { _id, product_image, product_name, external_links, description, product_tags} = product;
    const [selected, setSelected] = useState(product_tags);
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const { mutateAsync } = useMutation({
        mutationFn: async ({ updatedProduct }) => {
          const { data } = await fetch(`https://techhive-server.vercel.app/update-product/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(updatedProduct)
            })
          console.log(data)
          return data
        },
        onSuccess: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Product Updated Successfully.',
            icon: 'success',
            confirmButtonText: 'Close'
          })
          
        },
      })

      const onSubmit = async (updatedProduct, event) =>{
        event.preventDefault();
        updatedProduct.product_tags = selected;

        if (updatedProduct.product_image && updatedProduct.product_image.length > 0) {
            const imageFile = updatedProduct.product_image[0];
            const formData = new FormData();
            formData.append('image', imageFile);
      
            try {
              const res = await axiosPublic.post(image_hosting_api, formData);
              updatedProduct.product_image = res.data.data.display_url;
            } catch (error) {
              console.error('Image upload error:', error);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to upload image.',
                icon: 'error',
                confirmButtonText: 'Close'
              });
              return;
            }
          } else {
            updatedProduct.product_image = product.product_image;
          }
        console.log(updatedProduct);

        
        await mutateAsync({ updatedProduct })
        
    }

    return (
        <div>
            <SectionTitle heading={`Update Details of ${product_name}`} subHeading="Edit details of the product and click update to save the changed information!"></SectionTitle>

            
            {/* UPDATE PRODUCT FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="font-teachers text-[#9c6637] mx-auto grid grid-cols-1 p-2 md:p-8 md:gap-4 card-body text-2xl">
                {/* Product Image */}
                <div className="md:w-full">
                    <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        Product Image:
                        <input type="file"  className="file-input file-input-bordered  w-full" defaultValue={product_image.display_url} {...register("product_image", { required: false })}/>
                        {/* <input type="url" className="grow p-1" defaultValue={product_image} placeholder="URL for the image of the food" {...register("product_image", { required: true })}/> */}
                    </label>
                </div>
                {/* Product Name */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Product Name:
                            <input type="text" className="grow p-1" defaultValue={product_name} placeholder="Name of Food" {...register("product_name", { required: true })}/>
                        </label>
                    </div>
                    
                </div>
                {/* Tags */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                      {/* item 1 */}
                    <div className="md:w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Tags:
                            <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            defaultValue={product_tags}
                            // placeHolder="enter relevant tags for the product"
                            className="min-w-full border-0"
                        />
                        </label>
                    </div>
                    
                </div>
                {/* External Links */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    <div className="md:w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            External Links:
                            <input type="text" className="grow p-1" defaultValue={external_links} placeholder="Additional notes about the food?" {...register("external_links", { required: false })}/>
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    <div className="md:w-full">
                        <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                            Description:
                            <input type="text" className="grow p-1" defaultValue={description} placeholder="Additional notes about the food?" {...register("description", { required: false })}/>
                        </label>
                    </div>
                </div>                

                <div className="form-control mt-6">
                    <button className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] text-base font-bold w-fit lg:ml-64 lg:text-xl mx-auto pb-10 pt-4 px-10 flex items-center justify-center">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;