import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    const location = useLocation();
        console.log(location.pathname);
        if(loading){
            return <progress className="progress w-56"></progress>
        }
    
        if (user) {
            return children;
        }
        return <Navigate to="/login" state={{from: location}} replace></Navigate>


    // if(user){
    //     return children;
    // }
    // return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;