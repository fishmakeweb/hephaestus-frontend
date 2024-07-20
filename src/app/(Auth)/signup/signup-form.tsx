"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import AuthService from "@/dbutils/userAPI/authservice";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function SignUpForm() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      return;
    }

    if (password.includes(" ")) {
      setError("Password cannot contain spaces.");
      return;
    }

    // Now trim the values for further validation
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim(); // Trimming after checking for spaces
    const trimmedAddress = address.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Further validations
    if (!trimmedFullName) {
      setError("Full name is required.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (/[^a-zA-Z -]/.test(trimmedFullName)) {
      setError("Full name should not contain special characters.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedEmail) {
      setError("Email is required.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
    ) {
      setError("Email is invalid.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedAddress) {
      setError("Address is required.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedUsername) {
      setError("Username is required.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedPassword) {
      setError("Password is required.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (trimmedPassword.length < 5) {
      setError("Password must be at least 5 characters long.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (trimmedConfirmPassword !== trimmedPassword) {
      setError("Passwords do not match.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    // Use trimmed values to create userData object
    const userData = {
      fullName: trimmedFullName,
      email: trimmedEmail,
      address: trimmedAddress,
      username: trimmedUsername,
      password: trimmedPassword,
    };

    try {
      const response = await AuthService.registerCustomer(userData);
      if (response.error) {
        setError(response.error);
        setTimeout(() => setError(null), 2000);
        return;
      }
      const loginResponse = await AuthService.loginUser(username, password);
      setSuccess("Sign up successful! You are now logged in.");
      setTimeout(() => {
        setError(null);
        router.push("/");
      }, 2000);
    } catch (error) {
      setError("Sign up failed. Please try again.");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Hepheathus
      </h1>
      <form className="my-8" onSubmit={handleSignUp}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Enter full name..."
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter your address..."
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        {success && (
          <div className="mb-4 p-3 text-green-600 bg-green-100 rounded border border-green-500">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-100 rounded border border-red-500">
            {error}
          </div>
        )}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Already have an account?
        </span>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <Link
            href="/login"
            className="text-neutral-700 dark:text-neutral-300 text-sm"
          >
            Login
          </Link>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
