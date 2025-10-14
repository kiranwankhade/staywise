"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormFields, LoginSchema, IUser } from "../../types/property";
import { useAuth } from "../../hooks/useAuth";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormFields) => {
    try {
      const loginRes = await api.post("/auth/login", data);
     
      const { token, user: userData } = loginRes.data;

      login(token, userData);
      router.push("/properties");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Login failed. Invalid email or password.";
      setError("root", { message: errorMessage });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center py-12 min-h-[70vh]">
      <div className="w-full max-w-lg bg-white p-12 rounded-2xl shadow-2xl border-t-8 border-sw-primary">
        <h1 className="text-4xl font-serif font-bold text-sw-dark mb-4 text-center">
          Welcome back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter your details to login.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sw-primary focus:border-sw-primary transition"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          {/* <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-sw-primary focus:border-sw-primary transition"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
           */}

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

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="mt-4 text-sm text-red-600 font-bold text-center border p-2 bg-red-50 rounded-lg">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg text-lg font-bold text-white transition duration-300 bg-sw-primary hover:bg-sw-dark disabled:opacity-50"
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-sw-primary hover:text-sw-dark"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
