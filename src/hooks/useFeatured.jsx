import { useEffect, useState } from "react";

const useFeatured = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("http://localhost:5000/featured")
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setLoading(false);
        })
    })
    return [products, loading];

}

export default useFeatured;