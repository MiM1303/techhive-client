import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useModerator from "../hooks/useModerator";


const ModeratorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isMod, isModLoading] = useModerator();
    const location = useLocation();

    if (loading || isModLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isMod) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default ModeratorRoute;