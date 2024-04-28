import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isLoggedIn) {
    // Store the current location path to return after login
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search,
    );
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
