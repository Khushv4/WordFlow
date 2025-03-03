import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-yellow-50 px-4">
      <div className="mx-auto w-full max-w-md bg-gray-100 rounded-xl p-6 sm:p-10 border border-black/10 shadow-md">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 mb-4 text-center text-sm sm:text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4">
            <Input
              label="Full Name:"
              className="w-full px-3 py-2 text-sm border rounded-md"
              placeholder="Enter your name"
              {...register('name', {
                required: true,
              })}
            />

            <Input
              label="Email:"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border rounded-md"
              type="email"
              {...register('email', {
                required: true,
                validate: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                  'Email address must be valid',
              })}
            />

            <Input
              label="Password:"
              type="password"
              className="w-full px-3 py-2 text-sm border rounded-md"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full py-2 bg-amber-400 text-white  hover:bg-amber-300 transition-all duration-200"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
