"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully');
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Error logging in user');
    }
  };

  return (
    <div className="container mx-auto flex flex-col relative justify-center items-center h-screen">
      <Link href='/register' className='absolute top-5 right-5'>Register</Link>
      <h1 className='text-6xl mb-7 font-medium'>Login</h1>
    <form onSubmit={handleLogin} className="max-w-md p-6 bg-white rounded-xl shadow-sm bg-gray-100 flex flex-col gap-5 justify-center w-96">

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
      className='bg-blue-200 px-5 py-2 w-[50%] rounded-3xl mx-auto'>Login</button>
    </form>
    </div>
  );
};

export default LoginForm;