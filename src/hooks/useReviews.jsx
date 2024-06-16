import { useEffect, useState } from "react";

const useReviews = (id) =>{
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch(`https://techhive-server.vercel.app/reviews/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setReviews(data);
            setLoading(false);
        })
    })
    return [reviews, setReviews, loading];

}

export default useReviews;