import useTrending from "../../hooks/useTrending";
import ProductCard from "../Shared/ProductCard";
import SectionTitle from "../Shared/SectionTitle";


const Trending = () => {
    const [products, loading] = useTrending();
    return (
        <div>
            <div className="mb-24">
                <SectionTitle heading="Featured Products" subHeading="Check out all of our latest products from our featured section to find your needed tech today!"></SectionTitle>
                <div className="mx-auto grid grid-cols-3 gap-6 w-11/12">
                    {products.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)}
                </div>
            </div>
        </div>
    );
};

export default Trending;