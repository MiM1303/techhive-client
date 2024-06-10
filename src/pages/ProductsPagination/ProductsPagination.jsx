import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ProductCard from "../Shared/ProductCard";
import { Link, useLoaderData } from "react-router-dom";


const ProductsPagination = () => {

   

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchText, setSearchText] = useState('');

    const {count} = useLoaderData();
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    console.log(numberOfPages);

    // const pages = [];
    // for (let i = 0; i< numberOfPages; i++){
    //     pages.push(i);
    // }

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);

    useEffect(()=>{
        fetch(`http://localhost:5000/all-products?page=${currentPage}&size=${itemsPerPage}`)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setLoading(false);
            
        })
    }, [currentPage])
    
    const handlePrevPage = () =>{
        if(currentPage>0){
            setCurrentPage(currentPage-1);
        }
    }

    const handleNextPage = () =>{
        if(currentPage < pages.length-1){
            setCurrentPage(currentPage+1);
        }
    }






    return (
        <div>
            {/* PAGE TITLE */}
            <SectionTitle heading="All Products" subHeading="Check out all of our products"></SectionTitle>

            

            {/* ALL PRODUCTS DATA */}
            <div className='grid grid-cols-3 gap-6 p-10'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="px-10 py-6 pagination text-center ">
                <button onClick={handlePrevPage} className="join-item btn btn-outline mr-8 align-middle"><IoIosArrowBack /></button>
                {
                    pages.map(page=> <button
                                        onClick={()=>setCurrentPage(page)} 
                                        className={`align-middle btn btn-outline hover:bg-[#EDFAF6] hover:text-black mr-4 ${currentPage === page? 'bg-[#98FBDD] text-black': ''}`} 
                                        key={page}>
                                            {page}
                                    </button>)
                }
                <button onClick={handleNextPage} className="ml-4 join-item btn btn-outline align-middle"><IoIosArrowForward /></button>
            </div>

    

        </div>
    );
};

export default ProductsPagination;