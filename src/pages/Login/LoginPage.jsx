import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../auth/authSlice";
import axios from "axios";
import Loader from "../../components/Loader";
import ForgotPassword from "../../components/ForgotPassword"; // Adjust the path as necessary
import Logo from "../../assets/PursuitLogin.png";
import { backend } from "../../url";
import bg from "../../assets/bg.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 5) {
      setPasswordError("The password must be 6 characters or longer");
      return;
    }

    handleLogin();
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    handleOpen();

    let res = {};
    try {
      res = await axios.get(`${backend}/search?email=${email}`);
      const user = res.data[0];

      if (user) {
        if (user.user_password === password) {
          setTimeout(() => {
            handleClose();

            dispatch(login(user));

            const redirectUrl =
              sessionStorage.getItem("redirectAfterLogin") || "/";
            sessionStorage.removeItem("redirectAfterLogin");

            navigate(redirectUrl, { replace: true });
          }, 3000);
        } else {
          setTimeout(() => {
            handleClose();
            setPasswordError("Incorrect Password! Please Try again");
          }, 500);
        }
      } else {
        setTimeout(() => {
          handleClose();
          setEmailError("Email not found! Please Enter Correct Email");
        }, 500);
      }
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        handleClose();
        setEmailError("Email not found! Please Enter Correct Email");
      }, 500);
    }
  };

  const [openLoader, setOpenLoader] = useState(false);
  const handleClose = () => {
    setOpenLoader(false);
  };
  const handleOpen = () => {
    setOpenLoader(true);
  };

  return (
    <div
      className='min-h-screen flex justify-center items-center'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {openLoader && <Loader open={openLoader} />}
      <div className='w-full max-w-4xl flex rounded-lg overflow-hidden'>
        <div
          className='w-1/2 flex justify-center items-center'
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} // Reduced opacity to make the background more visible
        >
          <img src={Logo} alt='Logo' className='h-48 w-auto' />
        </div>
        <div
          className='w-1/2 shadow-md rounded px-8 pt-10 pb-10 flex flex-col justify-center'
          style={{
            minHeight: "500px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {showForgotPassword ? (
            <>
              <ForgotPassword />
              <button
                className='mt-4 text-blue-500 hover:text-blue-700'
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              <div className='mb-6'>
                <h1 className='text-center font-semibold text-xl'>Login</h1>
              </div>
              <div>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='text-red-500 text-xs italic'>{emailError}</p>
              </div>
              <div className='mt-6'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-red-500 text-xs italic'>{passwordError}</p>
                <label className='block text-gray-500 text-sm'>
                  <input
                    className='mr-2 leading-tight'
                    type='checkbox'
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>
              <div className='flex items-center justify-between mt-8'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <a
                  className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer'
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
