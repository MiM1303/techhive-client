import { useContext } from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import { AuthContext } from "../../providers/AuthProvider";


const Home = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <Banner></Banner>
            {/* FEATURED PRODUCTS SECTION */}
            <Featured></Featured>

            
        </div>
    );
};

export default Home;