import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          console.log('user logged in', userData);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-yellow-50 px-4'>
      <div className='w-full max-w-md bg-white rounded-xl p-6 border border-gray-200 shadow-md'>
        <div className='mb-4 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-xl md:text-2xl font-bold leading-tight'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm md:text-base text-black/60'>
          Don't have an account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-4 text-center text-sm'>{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-6'>
          <div className='space-y-4'>
            <Input
              label='Email:'
              placeholder='Enter your email'
              className='w-full px-2 py-1'
              type='email'
              {...register('email', {
                required: true,
                validate: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                  'Email address must be valid',
              })}
            />

            <Input
              label='Password:'
              placeholder='Enter password'
              className='w-full px-2 py-1'
              type='password'
              {...register('password', {
                required: true,
              })}
            />
            <Button type='submit' className='w-full bg-primary text-white py-2 hover:bg-amber-400'>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
