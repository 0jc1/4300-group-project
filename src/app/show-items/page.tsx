"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

import Content from "../../components/Content";
import Items from "../../components/Items";

const ShowItems = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // optional: you can also show a spinner/loading

  return (
    <Content>
      <Items />
    </Content>
  );
};

export default ShowItems;
