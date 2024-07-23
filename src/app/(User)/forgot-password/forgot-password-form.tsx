"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label"; // Ensure these paths are correct based on your project structure
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import sendForgotPasswordRequest from "@/dbutils/userAPI/forgotpassword"; // Adjust the import path if necessary

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>(""); // State to store feedback message to the user
  const [error, setError] = useState<string>(""); // State to store error message

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors
    try {
      const successMessage = await sendForgotPasswordRequest(email);
      setMessage(successMessage); // Update state with success message
    } catch (error: any) {
      setError(error.message); // Update state with error message
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        Quên mật khẩu
      </h1>
      <p className="text-center">
        Vui lòng nhập email đã đăng kí với hệ thống và chờ trong giây lát.
      </p>
      <form className="my-8" onSubmit={handleForgot}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Nhập email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Gửi &rarr;
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {message && <p className="text-green-500 text-center mt-2">{message}</p>}
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

export default ForgotPasswordForm;
