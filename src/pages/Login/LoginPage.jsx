import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../auth/authSlice";
import axios from "axios";
import Loader from "../../components/Loader";
import ForgotPassword from "../../components/ForgotPassword"; // Adjust the path as necessary
import Logo from "../../assets/PursuitLogin.png";
const LoginPage = (props) => {
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
      res = await axios.get(
        `https://lms-server-15hc.onrender.com/search?email=${email}`,
      );
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
    <div className='mainContainer'>
      {openLoader && <Loader open={openLoader} />}
      {!showForgotPassword ? (
        <>
          <div className='titleContainer'>
            <img src={Logo} className='h-40' />
            <div>Login</div>
          </div>
          <br />
          <div className='inputContainer'>
            <input
              value={email}
              placeholder='Enter your email here'
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className='errorLabel'>{emailError}</label>
          </div>
          <br />
          <div className='inputContainer'>
            <input
              id='hs-toggle-password-with-checkbox'
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder='Enter your password here'
              onChange={(ev) => setPassword(ev.target.value)}
              className='inputBox '
            />
            <label className='errorLabel'>{passwordError}</label>
            <div class='flex mt-4'>
              <input
                data-hs-toggle-password='{
        "target": "#hs-toggle-password-with-checkbox"
      }'
                id='hs-toggle-password-checkbox'
                type='checkbox'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                class='shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
              />
              <label
                for='hs-toggle-password-checkbox'
                class='text-sm text-gray-500 ms-3 dark:text-gray-400'
              >
                Show password
              </label>
            </div>
          </div>
          <br />
          <div className='inputContainer'>
            <input
              className='inputButton'
              type='button'
              onClick={onButtonClick}
              value={"Log in"}
            />
          </div>
          <br />
          <div className='inputContainer text-center'>
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>
        </>
      ) : (
        <>
          <ForgotPassword />
          <br />
          <div className='inputContainer text-center'>
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
