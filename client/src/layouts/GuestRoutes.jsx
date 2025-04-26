import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext"

const GuestRoutes = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated == null) return;

    return (
        (isAuthenticated == false) ? <Navigate to="/profile" replace={true} /> : <Outlet />
    )
}

export default GuestRoutes;