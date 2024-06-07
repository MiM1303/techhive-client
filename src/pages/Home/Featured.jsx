import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import ProductCard from "../Shared/ProductCard";


const Featured = () => {

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch("products.json")
        .then(res=>res.json())
        .then(data=>setProducts(data));
    })

    return (
        <div className="mb-24">
            <SectionTitle heading="Featured Products" subHeading="Check out all of our latest products from our featured section to find your needed tech today!"></SectionTitle>
            <div className="mx-auto grid grid-cols-3 gap-6 w-11/12">
                {products.map(product=> <ProductCard key={product.id} product={product}></ProductCard>)}
            </div>
        </div>
    );
};

export default Featured;