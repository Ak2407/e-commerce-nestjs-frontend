"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(formData);
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col items-center justify-center border border-gray-300 rounded-lg p-10 gap-4 text-center">
        <h1 className="text-4xl font-bold text-zinc-600">Login</h1>
        <p className="text-zinc-500 text-base">
          Enter your username and password to access your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 mt-10"
        >
          <Input
            placeholder="Enter your username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </form>
        <Link href="/signup" className="text-sm italic font-light underline">
          Do not have an account? Sign up here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
