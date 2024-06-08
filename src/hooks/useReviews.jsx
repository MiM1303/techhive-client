import { useEffect, useState } from "react";

const useReviews = (id) =>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch(`http://localhost:5000/reviews/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setReviews(data);
            setLoading(false);
        })
    })
    return [reviews, loading];

}

export default useReviews;