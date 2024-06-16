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
    const [count, setCount] = useState(0)
    
    const [searchLoad, setSearchLoad] = useState(0);
    // const [count, setCount] = useState(0);   
    // const {count} = useLoaderData();

    // const pages = [];
    // for (let i = 0; i< numberOfPages; i++){
    //     pages.push(i);
    // }

   

    // useEffect(()=>{
    //     fetch("techhive-server.vercel.app/all-products-count")
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setCount(data);
    //         console.log("count:", data, count);
    //     })
    // }, [])



    // LOADING DATA
    useEffect(()=>{
        fetch(`techhive-server.vercel.app/all-products?page=${currentPage}&size=${itemsPerPage}&search=${searchText}`)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setLoading(false);
            
        })
    }, [currentPage, searchLoad])

    // LOADING DATA COUNT
    useEffect(()=>{
        fetch(`techhive-server.vercel.app/all-products-count?search=${searchText}`)
        .then(res=>res.json())
        .then(data=>{
            setCount(data.count);
            setLoading(false);
            // console.log(count);
        })
    }, [searchLoad])
    
    
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    console.log(count, numberOfPages);

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);
    
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

    const handleSearch = e => {
        e.preventDefault()
    
        setSearchText(searchText)
      }

    
    



    return (
        <div>
            {/* PAGE TITLE */}
            <SectionTitle heading="All Products" subHeading="Check out all of our products"></SectionTitle>

            {/* SEARCH BY TAGS */}
            <div className="w-1/4 flex flex-row gap-5 mx-auto pl-16">
                    <form onSubmit={handleSearch}>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <input onChange={ e =>{
                                                    setSearchText(e.target.value);
                                                    // console.log(e.target.value);
                                                }} 
                                        type="text" 
                                        name="search" 
                                        className="grow" 
                                        placeholder="Search products by tags" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                        </div>

                        <div className="form-control">
                            {/* <Link to={`/all-products?page=${currentPage}&size=${itemsPerPage}/search/${searchText}`}><button className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] ">Search</button></Link> */}
                            <button onClick={()=>{setSearchLoad(searchLoad+1)}} className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] ">Search</button>
                        </div>
                    </form>
                </div>

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