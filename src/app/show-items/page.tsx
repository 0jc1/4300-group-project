"use client";

import Content from "../../components/Content";
import Items from "../../components/Items";

// This page displays all lost/returned items using the Items component
const ShowItems = () => {
  return (
    <Content>
      {/* Render list of items inside the shared layout wrapper */}
      <Items />
    </Content>
  );
};

export default ShowItems;
