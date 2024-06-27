// login-form.tsx
'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AuthService from "@/dbutils/userAPI/authservice";
import Link from "next/link";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await AuthService.loginUser(username, password);
      if (AuthService.isAuthenticated()) {
        console.log(localStorage.getItem('role'));
        AuthService.isCustomer() ? router.push('/diamond') : console.log("Logged in fail");
      } else {
        setUsername("");
        setPassword("");
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };


  return (
    <>
    {/* component */}
    <div className="flex h-screen">
      
      {/* Right Pane */}
      <div className="w-full bg-gray-100 lg:w-full flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Login
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Your form elements go here */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Dont have an account?{" "}
              <Link href="/signup" className="text-black hover:underline">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default LoginForm;
