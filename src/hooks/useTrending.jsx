import { useEffect, useState } from "react";

const useTrending = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("https://techhive-server.vercel.app/trending")
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setLoading(false);
        })
    })
    return [products, loading, setLoading];

}

export default useTrending;