import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ListItem from "./ListItem";
import SectionTitle from "../../Shared/SectionTitle";
import "../User/UserDashboard.css"


const MyProducts = () => {
    const {user, setLoading, loading} = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`https://techhive-server.vercel.app/products/email/${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            // setLoading(false);
            // console.log(count);
        })
    }, [])
    return (
        <div>
            <SectionTitle heading={`${user.displayName}'s Products`} subHeading="See all of the products you have added here so far!"></SectionTitle>
                       
            <div className="overflow-x-auto lg:px-28">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="text-center">
                        <th className="p-0 md:px-10 py-5 lg:px-20 text-wrap lg:text-nowrap">Product Photo</th>
                        <th className="p-0 md:px-10 py-5 lg:px-20">Name</th>
                        <th className="p-0 md:px-10 py-5 lg:px-20">Upvotes</th>
                        <th className="p-0 md:px-10 py-5 lg:px-20">Status</th>
                        <th className="p-0 md:px-10 py-5 lg:px-20">Update</th>
                        <th className="p-0 md:px-10 py-5 lg:px-20">Delete</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/* rows  */}
                    {
                        products.map(product=> <ListItem 
                            key={product._id}
                            product={product}
                            products={products}
                            setProducts={setProducts}></ListItem>)
                    }

                    </tbody>                    
                </table>
            </div>
        </div>
    );
};

export default MyProducts;