import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    let isAuthenticated = isLoggedIn;
    let location = useLocation();

    if (!isAuthenticated) {
        sessionStorage.setItem("redirectAfterLogin", location.pathname);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
