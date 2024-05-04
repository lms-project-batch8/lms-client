import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { backend } from "../../url";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    userId: id,
    userName: "",
    userEmail: "",
    userPassword: "",
    userRole: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backend}/users/${id}`);
      const userData = response.data[0];
      setUser({
        userId: id,
        userName: userData.user_name,
        userEmail: userData.user_email,
        userPassword: userData.user_password,
        userRole: userData.user_role,
      });
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${backend}/users/${id}`, user);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto p-5'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Edit User: <span className='text-red-500'>{id}</span>
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col'>
            <label
              htmlFor='userName'
              className='mb-2 text-sm font-medium text-gray-700'
            >
              User Name
            </label>
            <input
              type='text'
              name='userName'
              id='userName'
              value={user.userName}
              onChange={handleChange}
              required
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='userEmail'
              className='mb-2 text-sm font-medium text-gray-700'
            >
              User Email
            </label>
            <input
              type='email'
              name='userEmail'
              id='userEmail'
              value={user.userEmail}
              onChange={handleChange}
              required
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='userPassword'
              className='mb-2 text-sm font-medium text-gray-700'
            >
              User Password
            </label>
            <input
              type='password'
              name='userPassword'
              id='userPassword'
              value={user.userPassword}
              onChange={handleChange}
              required
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='userRole'
              className='mb-2 text-sm font-medium text-gray-700'
            >
              User Role
            </label>
            <select
              name='userRole'
              id='userRole'
              value={user.userRole}
              onChange={handleChange}
              required
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Select a role</option>
              <option value='admin'>Admin</option>
              <option value='trainer'>Trainer</option>
              <option value='trainee'>Trainee</option>
            </select>
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditUser;
