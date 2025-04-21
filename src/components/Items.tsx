"use client";
import Item from "./Item";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    updatedAt: new Date("2025-04-15T10:00:00")
  },
  {
    _id: "dummy-2",
    title: "AirPods Case",
    imageUrl: "/images/airpods.png",
    description: "White AirPods case",
    location: "Main Library",
    tags: ["white", "tech", "airpods"],
    createdAt: new Date("2025-04-18T14:30:00"),
    updatedAt: new Date("2025-04-19T09:15:00")
  },
  {
    _id: "dummy-3",
    title: "UGA Water Bottle",
    imageUrl: "/images/waterbottle.png",
    description: "Lost at the gym",
    location: "Ramsey Center",
    tags: ["bottle", "uga", "gym"],
    createdAt: new Date("2025-04-10T08:45:00"),
    updatedAt: new Date("2025-04-10T08:45:00")
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
        const url = `/api/items?sortBy=${sortOption}`
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.log("Error from ShowItemList:", error);
      }
    };

    fetchItems();
  }, [sortOption]);

  // Effect to combine and sort items
  useEffect(() => {
    let combined = [...UGAitems, ...dummyItems];
    
    if (sortOption === "nearest") {
      // combined.sort((a, b) => {
      //   const locA = getLocationCoordinates(a.location);
      //   const locB = getLocationCoordinates(b.location);
      //   const distA = calcDist(currentLocation, locA);
      //   const distB = calcDist(currentLocation, locB);
      //   return distA - distB;
      // });
    } else if (sortOption === "newest") {
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === "oldest") {
      combined.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOption === "recently-updated") {
      combined.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    
    setAllItems(combined);
  }, [UGAitems, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {/* Search and Sort  */}
        <div className="mb-6 flex justify-between items-center bg-[#141514] p-2 rounded ">

          {/* Search bar */}
          <div className="flex-grow mr-4 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sort dropdown */}
          <div className="">
            <label htmlFor="sort-select" className="mr-2 text-white">Sort by:</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="recently-updated">Recently Updated</option>
              <option value="nearest">Nearest Location</option>
            </select>
          </div>
        </div>

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
