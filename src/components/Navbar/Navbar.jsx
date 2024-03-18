import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import "./Navbar.css";
import { logout } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    // Check if user object exists before accessing its properties
    const userName = user ? user.user_name : "";
    const userEmail = user ? user.user_email : "";

    return (
        <div className="navbar text-white flex justify-normal">
            <div className="logo flex-1 font-bold">
                <img src={Logo} className="w-[50px] ml-6 p-1" alt="Logo"></img>
            </div>
            <div className="icons flex max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center rounded-md">
                    <ul className="flex flex-row items-center mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <div className="user font-medium flex items-center gap-3">
                                <span className="font-bold">
                                    {userName}
                                    <p className="text-sm text-gray-900 dark:text-white font-semibold" aria-current="page">
                                        {userEmail}
                                    </p>
                                </span>
                            </div>
                        </li>
                        <li></li>
                        <li>
                            <p className="text-gray-900 dark:text-white font-bold">
                                Pursuit Software
                            </p>
                        </li>
                        <li onClick={handleLogout} className="cursor-pointer">
                            <p className="text-gray-900 dark:text-white font-semibold">
                                Logout
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
