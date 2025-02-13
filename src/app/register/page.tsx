"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className="container mx-auto flex relative flex-col justify-center items-center h-screen">
      <Link href='/login'  className='absolute top-5 right-5'>Login</Link>
      <h1 className='text-6xl mb-7 font-medium'>Register</h1>
    <form onSubmit={handleRegister} className="max-w-md p-6 bg-white rounded-xl shadow-sm bg-gray-100 flex flex-col gap-5 justify-center w-96">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className='px-5 py-2 rounded-md'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className='px-5 py-2 rounded-md'
      />
      <button type="submit"
      className='bg-blue-200 px-5 py-2 w-[50%] rounded-3xl mx-auto'>Register</button>
    </form>
    </div>
  );
};

export default RegisterForm;