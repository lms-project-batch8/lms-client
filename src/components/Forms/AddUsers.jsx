import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend } from "../../url";

const AddUsers = () => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${backend}/users`, user);

      toast.success("User added successfully!");

      setUser({ userId: "", name: "", email: "", password: "", role: "" });
    } catch (error) {
      toast.error("Failed to add user! Verify the User Id is unique or not");
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-8'>
      <h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
        Add New User
      </h2>
      <div className='flex justify-center'>
        <form className='w-full max-w-lg' onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3 mb-6'>
              <label
                htmlFor='userId'
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              >
                User ID
              </label>
              <input
                type='number'
                name='userId'
                id='userId'
                value={user.userId}
                onChange={handleChange}
                className='appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                required
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <label
                htmlFor='name'
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              >
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={user.name}
                onChange={handleChange}
                className='appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                required
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <label
                htmlFor='email'
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={user.email}
                onChange={handleChange}
                className='appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                required
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <label
                htmlFor='password'
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                value={user.password}
                onChange={handleChange}
                className='appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                required
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <label
                htmlFor='role'
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              >
                Role
              </label>
              <select
                id='role'
                name='role'
                value={user.role}
                onChange={handleChange}
                className='block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              >
                <option>Choose a role</option>
                <option value='admin'>Admin</option>
                <option value='trainer'>Trainer</option>
                <option value='trainee'>Trainee</option>
              </select>
            </div>
            <div className='w-full px-3'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUsers;
