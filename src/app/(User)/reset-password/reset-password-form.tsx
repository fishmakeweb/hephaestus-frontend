"use client"
import React, { useState, useEffect } from "react";
import resetPassword from "@/dbutils/userAPI/resetpassword"; // Ensure the path is correct
import { Label } from "@/components/ui/label"; // Ensure these paths are correct based on your project structure
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [message, setMessage] = useState<string>(""); // State to store feedback message to the user
  const [error, setError] = useState<string>(""); // State to store error message

  useEffect(() => {
    // Ensure this runs only client-side
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      if (tokenParam) {
        setToken(tokenParam);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const successMessage = await resetPassword({ token, password });
      setMessage(successMessage); // Display success message
      // Optionally, redirect or clear form fields here if needed
      setTimeout(() => window.location.href = "/login", 2000);
      ;
    } catch (error: any) {
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        Reset Password
      </h1>
      <p className="text-center">{message || "Enter new password in the form below."}</p>

      <form className="my-8" onSubmit={handleSubmit}>
        <input type="hidden" name="token" value={token} />
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">New password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          value="Change Password"
          disabled={password !== confirmPassword}
        >
          Send &rarr;
        </button>
        {message && (
          <p className="text-green-500 text-center mt-2">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
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
export default ResetPasswordForm;
