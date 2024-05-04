import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import "./Navbar.css";
import { logout } from "../../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const userName = user ? user.user_name : "";
  const userEmail = user ? user.user_email : "";

  return (
    <div className='navbar bg-dark-purple text-white flex justify-between items-center'>
      <Link to='/'>
        <div className='logo font-bold'>
          <img src={Logo} className='w-[50px] ml-6 p-1' alt='Logo' />
        </div>
      </Link>
      <div className='icons flex items-center'>
        <div className='flex items-center space-x-4 mr-6 gap-10'>
          <div className='user font-medium flex items-center '>
            <span className='font-bold'>
              {userName}
              <p
                className='text-sm text-gray-900 dark:text-white font-semibold'
                aria-current='page'
              >
                {userEmail}
              </p>
            </span>
          </div>
          <div className='user font-medium flex items-center '>
            Pursuit Software
          </div>
          <div
            onClick={handleLogout}
            className='cursor-pointer text-gray-900 dark:text-white font-semibold'
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
