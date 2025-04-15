"use client";
import Item from "./Item";
import Link from "next/link";
import { useState, useEffect } from "react";

const dummyItems = [
  {
    _id: "dummy-1",
    title: "Red Backpack",
    imageUrl: "/images/backpack.png",
    description: "A bright red backpack with UGA logo",
    location: "Tate Student Center",
    tags: ["red", "backpack", "uga"]
  },
  {
    _id: "dummy-2",
    title: "AirPods Case",
    imageUrl: "/images/airpods.png",
    description: "White AirPods case",
    location: "Main Library",
    tags: ["white", "tech", "airpods"]
  },
  {
    _id: "dummy-3",
    title: "UGA Water Bottle",
    imageUrl: "/images/waterbottle.png",
    description: "Lost at the gym",
    location: "Ramsey Center",
    tags: ["bottle", "uga", "gym"]
  }
];

export default function Items() {
  const [UGAitems, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.log("Error from ShowItemList:", error);
      }
    };

    fetchItems();
  }, []);

  const allItems = [...UGAitems, ...dummyItems];

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {allItems.length === 0 ? (
          <p>No UGA items available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allItems.map((item, index) => (
              <Item key={item._id || index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

