'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormFields, SignupSchema } from '../../types/property';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch } = useForm<SignupFormFields>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { role: 'user' }
  });

  const selectedRole = watch('role');
  const [showPassword, setShowPassword] = useState(false);

  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: SignupFormFields) => {
    try {
      await api.post('/auth/signup', data);
      alert('Account created successfully! Please login.');
      router.push('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Signup failed. Server error.';
      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-lg bg-white p-12 rounded-2xl shadow-2xl border-t-8 border-sw-primary">
        <h1 className="text-4xl font-serif font-bold text-sw-dark mb-4 text-center">Create an account</h1>
        <p className="text-center text-gray-600 mb-8">Join StayWise to start booking.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex justify-center space-x-6 mb-4">
            <label className="flex items-center space-x-2 text-lg text-gray-700">
              <input type="radio" {...register('role')} value="user" checked={selectedRole === 'user'} className="h-4 w-4 text-sw-primary focus:ring-sw-primary border-gray-300"/>
              <span>Register as User</span>
            </label>
            <label className="flex items-center space-x-2 text-lg text-gray-700">
              <input type="radio" {...register('role')} value="admin" checked={selectedRole === 'admin'} className="h-4 w-4 text-sw-primary focus:ring-sw-primary border-gray-300"/>
              <span>Register as Admin</span>
            </label>
          </div>
          
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register('name')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sw-primary focus:border-sw-primary transition"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sw-primary focus:border-sw-primary transition"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
          <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sw-primary focus:border-sw-primary transition pr-12" 
              />

              <button
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-sw-primary transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          
          {errors.root && <p className="mt-4 text-sm text-red-600 font-bold text-center border p-2 bg-red-50 rounded-lg">{errors.root.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg text-lg font-bold text-white transition duration-300 bg-sw-primary hover:bg-sw-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-sw-primary hover:text-sw-dark">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}