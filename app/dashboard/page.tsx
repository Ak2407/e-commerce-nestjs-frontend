"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type CreateItem = {
  name: string;
  description: string;
  price: number;
  category: "electronics" | "clothes" | "shoes" | "food" | "cosmetic";
  seller: string;
};

const Dashboard = () => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CreateItem>({
    name: "",
    description: "",
    price: 0,
    category: "electronics",
    seller: userId || "",
  });

  useEffect(() => {
    if (!token || !userId) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setDisabled(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/item` ||
          "http://localhost:3000/item",
        formData,
      );

      toast.success("Item Successfully created!");

      router.push("/");
    } catch (error) {
      toast.error("Error creating item");
      console.error("Error creating item:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCategoryChange = (
    value: "electronics" | "clothes" | "shoes" | "food" | "cosmetic",
  ) => {
    setFormData({ ...formData, category: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={() => router.push("/")}>Back to Home</Button>

      <div className="w-[400px] h-[500px] flex flex-col items-center justify-center border border-gray-300 rounded-lg p-10 gap-4 text-center">
        <h1 className="text-4xl font-bold text-zinc-600">Create a new Item </h1>
        <p className="text-zinc-500 text-base">
          Add details about the item you want to create
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 mt-10"
        >
          <Input
            disabled={disabled}
            placeholder="Enter the name for item"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            disabled={disabled}
            placeholder="Enter name for description (Optional)"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            disabled={disabled}
            placeholder="Enter the price in dollars"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
          />
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothes">Clothes</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="cosmetic">Cosmetic</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
