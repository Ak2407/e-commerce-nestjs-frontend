"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const tokenValid = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response) {
          toast.success("You are already logged in!");
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    tokenValid();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login` ||
          "http://localhost:3000/auth/login",
        formData,
      );

      toast.success("Login up successful!");
      const { accessToken, name, userId } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", userId);

      router.push("/");
    } catch (error) {
      toast.error("Error logging in!");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
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
          <Button
            disabled={loading}
            type="submit"
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Loading..." : "Login"}
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
