"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/item`,
      );
      const data = response.data;
      console.log(data);
      setProducts(data);
    };

    fetchProducts();
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
      <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          description={
            product.description
              ? product.description
              : "Description not available"
          }
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  );
}
