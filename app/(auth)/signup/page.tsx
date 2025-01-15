"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

type SignUpFormData = {
  name: string;
  username: string;
  password: string;
  role: "admin" | "user";
};

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(formData);
  };

  const handleRoleChange = (value: "admin" | "user") => {
    setFormData({ ...formData, role: value });
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col items-center justify-center border border-gray-300 rounded-lg p-10 gap-4 text-center">
        <h1 className="text-4xl font-bold text-zinc-600">Sign Up</h1>
        <p className="text-zinc-500 text-base">
          Welcome to the sign up page. Fill in the form to create an account.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 mt-10"
        >
          <Input
            placeholder="Enter your full name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </form>
        <Link href="/login" className="text-sm italic font-light underline">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
