"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Kindly login to access the page!");
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

        if (response) {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    tokenValid();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const name = localStorage.getItem("name");
  return (
    <div>
      <h1>Hello {name}</h1>
      <Button variant="destructive" onClick={handleLogout}>
        {" "}
        Logout
      </Button>
    </div>
  );
}
