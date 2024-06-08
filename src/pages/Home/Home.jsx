import { useContext } from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import { AuthContext } from "../../providers/AuthProvider";
import Trending from "./Trending";


const Home = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <Banner></Banner>
            {/* FEATURED PRODUCTS SECTION */}
            <Featured></Featured>
            {/* TRENDING PRODUCTS SECTION */}
            <Trending></Trending>
        </div>
    );
};

export default Home;