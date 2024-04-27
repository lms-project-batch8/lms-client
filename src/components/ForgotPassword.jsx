import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import PasswordChange from "../components/PasswordChange";
import axios from "axios";
import { backend } from "../url";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [otp, setOtp] = useState(0);

  const getOtp = async () => {
    const res = await axios.post(
      `${backend}/send-otp`,
      { email },
    );

    return res.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Password reset request for:", email);

    getOtp().then((otp) => setOtp(otp));

    setSubmitted(true);
  };

  if (submitted) {
    return <PasswordChange otp={otp} email={email} />; 
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='p-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-center text-2xl font-semibold mb-4'>
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <TextField
            label='Email Address'
            variant='outlined'
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-50'
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            className='bg-blue-500 hover:bg-blue-700 text-white'
          >
            Request Otp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
