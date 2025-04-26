import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext"

const MemberRoutes = () => {
    const { isAuthenticated, userDetails } = useAuth();

    if (isAuthenticated == null) return;

    return (
        (isAuthenticated == true && userDetails) ? <Outlet /> : <Navigate to="/login" replace={true} />
    )
}

export default MemberRoutes;