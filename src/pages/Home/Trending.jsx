import largebg from  '../../assets/coupon_bg_large.jpg';
import mobilebg from  '../../assets/coupon_bg_large.jpg'
import { Link } from "react-router-dom";
import useTrending from "../../hooks/useTrending";
import ProductCard from "../Shared/ProductCard";
import SectionTitle from "../Shared/SectionTitle";
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';
import "../Home/Banner.css"

import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Trending = () => {
    const [trendingProducts, loading, setLoading] = useTrending();
    console.log(trendingProducts);
    const [coupons, setCoupons] = useState([]);
    useEffect(()=>{
        fetch(`https://techhive-server.vercel.app/coupons`)
        .then(res=>res.json())
        .then(data=>{
            setCoupons(data);
            setLoading(false);
        })
    }, [])

    return (
        <div>
            <div className="mb-24">
                <SectionTitle heading="Trending Products" subHeading="Check out our most popular products voted by our users from our trending section to find your needed tech today!"></SectionTitle>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
                    {trendingProducts.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)}
                </div>
                <div>
                    <Link className="flex justify-center" to="/all-products"><button className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] font-bold text-base mt-12">Show All Products</button></Link>
                </div>
                <div className='block'>
                    <Carousel autoPlay="true" infiniteLoop="true" interval={2000} showThumbs={false} stopOnHover={true} className='lg:w-[840px] lg:h-[360px] md:mx-auto couponCarousel static'>
                                {
                                    coupons.map(coupon=><div key={coupon._id} className="relative text-blue-600" >
                                        <img className="bg-center image-container bg-contain z-2 " src={largebg} />
                                        <div className="absolute text-white text-center top-6 md:top-14 md:right-[300px] lg:top-12 right-20 lg:right-60 z-10 space-y-2 md:space-y-3 lg:space-y-10">
                                            <p className="text-lg md:text-xl lg:text-4xl font-semibold">Use Coupon Code</p>
                                            <p className="text-2xl md:text-4xl lg:text-7xl  font-bold">{coupon.coupon_code}</p>
                                            <p className="text-base md:text-lg lg:text-2xl font-semibold">To Get <span className='font-bold md:text-2xl text-xl'>${coupon.discount_amount}</span> off!</p>
                                            <p className="text-sm md:text-base lg:text-xl font-semibold">Valid till {coupon.expiry_date}!!</p>
                                        </div>
                                    </div>
                                    )
                                }
                    </Carousel>
                </div>
                
            </div>
        </div>
    );
};

export default Trending;