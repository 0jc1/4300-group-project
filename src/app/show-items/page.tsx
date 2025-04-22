"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

import Content from "../../components/Content";
import Items from "../../components/Items";

const ShowItems = () => {
  return (
    <Content>
      <Items />
    </Content>
  );
};

export default ShowItems;
