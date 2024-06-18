import { useEffect, useState } from "react";

const useTrending = () =>{
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("https://techhive-server.vercel.app/trending")
        // fetch("http://localhost:5000/trending")
        .then(res=>res.json())
        .then(data=>{
            setTrendingProducts(data);
            setLoading(false);
        })
    }, [])
    return [trendingProducts, loading, setLoading];

}

export default useTrending;