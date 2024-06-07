import { BiSolidUpArrow } from "react-icons/bi";

const ProductCard = ({product}) => {
    const {id, product_name, product_image, product_tags, upvote_count} = product;
  return (

    <div className="card card-side relative w-fit bg-[#EDFAF6] shadow-xl">
        <figure className="p-6 w-2/3 min-h-[360px]">
            <img className="max-w-72 rounded-3xl" src={product_image} alt="Movie"/>
        </figure>
        <div className="card-body my-auto">
            <h2 className="card-title font-bold text-2xl mb-2">{product_name}</h2>
            <div className="flex gap-4  flex-wrap">
            {
                product_tags.map(tag=><span key={id} className="grid grid-cols-1 w-fit bg-[#98fbdd] font-semibold rounded-xl shadow-md py-1 px-3">{tag}</span>)
            }
        </div>
            <div className="card-actions right-8 top-14 absolute justify-end border border-[#98fbdd] rounded-xl p-2  w-fit ">
                <div className="flex gap-2 justify-center items-center">
                    <button className="">
                    <   BiSolidUpArrow className="text-2xl hover:text-[#98fbdd] "></BiSolidUpArrow>
                    </button>
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
