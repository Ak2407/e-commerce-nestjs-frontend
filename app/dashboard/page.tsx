"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
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
        if (!response) {
          toast.error("Kindly login to access the page!");
          router.push("/login");
        }

        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
        );
        if (user.data.role === "user") {
          router.push("/");
          toast.error("You are not authorized to access this page!");
          return;
        }
        setLoading(false);
        return;
      } catch (error) {
        console.log(error);
      }
    };

    tokenValid();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Admin Dashboard</div>;
};

export default Dashboard;
