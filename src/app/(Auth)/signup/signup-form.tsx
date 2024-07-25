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
  const [checkboxError, setCheckboxError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkbox = document.getElementById(
      "confirmPolicy"
    ) as HTMLInputElement;
    if (!checkbox.checked) {
      setCheckboxError(
        "Vui lòng chấp nhận điều khoản sử dụng trước khi tiếp tục."
      );
      setTimeout(() => setCheckboxError(null), 2000);
      return;
    }

    if (username.includes(" ")) {
      setError("Tên đăng nhập không chứa khoảng trắng.");
      return;
    }

    if (password.includes(" ")) {
      setError("Mật khẩu không chứa khoảng trắng.");
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
      setError("Vui lòng nhập họ và tên.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (
      /[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰÝỴỶỸĐđâấầẩẫậăắằẳẵặêếềểễệôốồổỗộơớờởỡợưứừửữựỲỴỶỸýỳỷỹ ]/.test(
        trimmedFullName
      )
    ) {
      setError("Họ và tên không nên chứa kí tự đặc biệt.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedEmail) {
      setError("Vui lòng nhập email.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
    ) {
      setError("Email không hợp lệ.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedAddress) {
      setError("Vui lòng nhập địa chỉ.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedUsername) {
      setError("Vui lòng nhập tên đăng nhập.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (!trimmedPassword) {
      setError("Vui lòng nhập mật khẩu.");
      setTimeout(() => setError(null), 1000);
      return;
    } else if (trimmedPassword.length < 5) {
      setError("Mật khẩu phải từ 5 kí tự trở lên.");
      setTimeout(() => setError(null), 1000);
      return;
    }

    if (trimmedConfirmPassword !== trimmedPassword) {
      setError("Mật khẩu không khớp.");
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
      setSuccess("Đăng kí thành công! Bạn sẽ được đăng nhập ngay.");
      setTimeout(() => {
        setError(null);
        router.push("/");
      }, 2000);
    } catch (error) {
      setError("Đăng kí thất bại. Vui lòng thử lại.");
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
          <Label htmlFor="fullname">Họ và tên</Label>
          <Input
            id="fullname"
            placeholder="Nhập họ và tên..."
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
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            placeholder="Nhập địa chỉ..."
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            placeholder="Nhập tên đăng nhập..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword">Nhập lại mật khẩu</Label>
          <Input
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Corrected
          />
        </LabelInputContainer>
        <div className="flex items-center space-x-2 my-2">
          <input className="" id="confirmPolicy" type="checkbox" />
          <Label htmlFor="confirmPolicy">Chấp nhận điều khoản sử dụng</Label>
        </div>
        <Link
          target="_blank"
          className="content-none	text-sm text-stone-500 no-underline hover:underline"
          href="/policy"
        >
          Nhấn vào đây để xem điều khoản
        </Link>
        {checkboxError && (
          <div className="mb-4 p-3 text-red-600 bg-red-100 rounded border border-red-500">
            {checkboxError}
          </div>
        )}
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
          className="bg-gradient-to-br mt-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Đăng kí &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Đã có tài khoản?
        </span>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <Link
            href="/login"
            className="text-neutral-700 dark:text-neutral-300 text-sm"
          >
            Đăng nhập
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
