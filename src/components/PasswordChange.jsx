import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend } from "../url";

function PasswordChange({ otp, email }) {
  const [userOtp, setUserOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const updatePassword = async () => {
    const response = await axios.get(
      `${backend}/search?email=${email}`,
    );

    const userData = response.data[0];

    console.log(userData);

    const userId = userData.user_id;

    if (!userId) {
      throw new Error("User ID not found");
    }

    await axios.put(
      `${backend}/users/${userId}`,
      { user_password: confirmPassword },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ otp, userOtp });

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (otp !== parseInt(userOtp)) {
      setMessage("Wrong OTP! Please Provide the actual OTP.");
      return;
    }

    try {
      await updatePassword();
      setMessage("Password has been successfully reset!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Update Failed. Try again");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextField
          label='OTP'
          variant='outlined'
          value={userOtp}
          onChange={(e) => setUserOtp(e.target.value)}
          fullWidth
        />
        <TextField
          label='New Password'
          type='password'
          variant='outlined'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
        />
        <TextField
          label='Confirm Password'
          type='password'
          variant='outlined'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        {message && <Alert severity='info'>{message}</Alert>}
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default PasswordChange;
