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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type SignUpFormData = {
  name: string;
  username: string;
  password: string;
  role: "admin" | "user";
};

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup` ||
          "http://localhost:3000/auth/signup",
        formData,
      );

      toast.success("Sign up successful!");
      console.log(response);
      router.push("/");
    } catch (error) {
      toast.error("Error signing up!");
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            placeholder="Enter your full name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            disabled={loading}
            placeholder="Enter your username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            disabled={loading}
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Select
            value={formData.role}
            onValueChange={handleRoleChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
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
