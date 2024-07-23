"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import AuthService from "@/dbutils/userAPI/authservice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem("token");
    if (token != null) {
      alert("You are already logged in!");
      router.push("/");
      return;
    }
    e.preventDefault();
    setError(null); // Reset error message on new submission
    try {
      const response = await AuthService.loginUser(username, password);
      if (AuthService.isAuthenticated()) {
        setSuccess("Đăng nhập thành công!");
        setTimeout(() => {
          router.push("/"); // Redirect after 2000ms
        }, 1000); // Delay set to 2000 milliseconds
        console.log("Logged sucess");
      } else {
        setError("Tên hay mật khẩu đăng nhập không hợp lệ");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Tên hay mật khẩu đăng nhập không hợp lệ");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Chào mừng đến với Hepheathus
      </h1>
      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            placeholder="Enter your username..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <Link
          href="/forgot-password"
          className="text-neutral-700 dark:text-neutral-300 text-sm"
        >
          Quên mật khẩu?
        </Link>
        <Button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Đăng nhập &rarr;
          <BottomGradient />
        </Button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Chưa có tài khoản?
        </span>
        <Link
          href="/signup"
          className="text-neutral-700 dark:text-neutral-300 text-sm relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        >
          Đăng kí ngay
          <BottomGradient />
        </Link>
        <Link
          href="http://api.hephaestus.store/oauth2/authorization/google"
          className="text-neutral-700 dark:text-neutral-300 text-sm  relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          Google
          <BottomGradient />
        </Link>
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
