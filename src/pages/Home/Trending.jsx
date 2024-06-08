import { Link } from "react-router-dom";
import useTrending from "../../hooks/useTrending";
import ProductCard from "../Shared/ProductCard";
import SectionTitle from "../Shared/SectionTitle";


const Trending = () => {
    const [products, loading] = useTrending();
    return (
        <div>
            <div className="mb-24">
                <SectionTitle heading="Trending Products" subHeading="Check out our most popular products voted by our users from our trending section to find your needed tech today!"></SectionTitle>
                <div className="mx-auto grid grid-cols-3 gap-6 w-11/12">
                    {products.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)}
                </div>
                    <Link className="flex justify-center" to="/all-products"><button className="btn bg-[#b6f8e4] text-black hover:bg-[#98fbdd] font-bold text-base mt-12">Show All Products</button></Link>
            </div>
        </div>
    );
};

export default Trending;