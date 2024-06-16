import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ListItem from "./ListItem";
import SectionTitle from "../../Shared/SectionTitle";
import "../User/UserDashboard.css"


const MyProducts = () => {
    const {user, setLoading, loading} = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`techhive-server.vercel.app/products/email/${user.email}`)
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
                       
            <div className="overflow-x-auto px-28">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Product Photo</th>
                        <th>Name</th>
                        <th>Upvotes</th>
                        
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
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