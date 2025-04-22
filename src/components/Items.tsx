"use client";

import { useState, useEffect } from "react";

import Item from "./Item";

import { ItemType, LocationCoordinates } from "@/types";

const dummyItems: ItemType[] = [
  {
    _id: "dummy-1",
    title: "Red Backpack",
    imageUrl: "/images/backpack.png",
    description: "A bright red backpack with UGA logo",
    location: "Tate Student Center",
    tags: ["red", "backpack", "uga"],
    createdAt: new Date("2025-04-15T10:00:00"),
    updatedAt: new Date("2025-04-15T10:00:00"),
  },
  {
    _id: "dummy-2",
    title: "AirPods Case",
    imageUrl: "/images/airpods.png",
    description: "White AirPods case",
    location: "Main Library",
    tags: ["white", "tech", "airpods"],
    createdAt: new Date("2025-04-18T14:30:00"),
    updatedAt: new Date("2025-04-19T09:15:00"),

  },
  {
    _id: "dummy-3",
    title: "UGA Water Bottle",
    imageUrl: "/images/waterbottle.png",
    description: "Lost at the gym",
    location: "Ramsey Center",
    tags: ["bottle", "uga", "gym"],
    createdAt: new Date("2025-04-10T08:45:00"),
    updatedAt: new Date("2025-04-10T08:45:00"),
  },
  }

];

const campusLocations: Record<string, LocationCoordinates> = {
  "Tate Student Center": { lat: 33.9746, lng: -83.3755 },
  "Main Library": { lat: 33.9746, lng: -83.3733 },
  "Ramsey Center": { lat: 33.9711, lng: -83.3789 },
  "MLC": { lat: 33.9757, lng: -83.3751 },
  "Science Learning Center": { lat: 33.9448, lng: -83.3776 }
};

const currentLocation: LocationCoordinates = { lat: 33.9746, lng: -83.3755 }; 

export default function Items() {

  const [UGAitems, setItems] = useState<ItemType[]>([]);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [allItems, setAllItems] = useState<ItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const calcDist = (loc1: LocationCoordinates, loc2: LocationCoordinates): number => {
    if (!loc1 || !loc2) return Infinity;
    return Math.sqrt((loc1.lat - loc2.lat)^2 + (loc1.lng - loc2.lng)^2);
  };

  const getLocationCoordinates = (locationName : string): LocationCoordinates | null => {
    if (!locationName) return null;
    return campusLocations[locationName] || null;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/items?sortBy=${sortOption}`);
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();

        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [sortOption]);

  useEffect(() => {
    let combined = [...UGAitems, ...dummyItems];

    if (sortOption === "newest") {
      combined.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOption === "oldest") {
      combined.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortOption === "recently-updated") {
      combined.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }


    setAllItems(combined);
  }, [UGAitems, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="px-4 py-4">
      <div className="container-xl lg:container m-auto px-4">
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-black/40 backdrop-blur-md p-4 rounded-2xl shadow-2xl">
          {" "}
          <div className="relative w-full md:w-2/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-6 pl-10 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            />
            <div className="absolute inset-y-0 left-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="sort-select" className="text-white mr-2">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-300 transition">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="recently-updated">Recently Updated</option>
              <option value="nearest">Nearest Location</option>
            </select>
          </div>
        </div>

        {/* Items */}
        {filteredItems.length === 0 ? (

          <p>No UGA items available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {filteredItems.map((item, index) => (
              <Item key={item._id || index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
