"use client";

import { useState, useEffect } from "react";
import Item from "./Item";

// Component to display all active (lost) items with filters and sorting
export default function Items() {
  const [UGAitems, setItems] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Fetch sorted items from the server
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

  // Handle sort dropdown change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle location dropdown change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationQuery(e.target.value);
  };

  // Filter to only show items that are still lost
  const activeItems = UGAitems.filter((item) => item.status !== "returned");

  // Extract all unique non-empty locations from active items
  const allLocations = Array.from(
    new Set(
      activeItems
        .map((item) => item.location)
        .filter((loc) => loc && loc.trim() !== "")
    )
  );

  // Apply all filters: title, location, and tags
  const filteredItems = activeItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationQuery === "" ||
        item.location.toLowerCase() === locationQuery.toLowerCase()) &&
      (tagFilters.length === 0 ||
        tagFilters.every((tag) => item.tags?.includes(tag)))
  );

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-6 bg-black/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-8">
          {/* Search by title */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by Title..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="min-w-[200px] w-full bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-6 pl-10 focus:outline-none focus:ring-2 focus:ring-[#BB231D] transition"
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
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
                />
              </svg>
            </div>
          </div>

          {/* Filter by location */}
          <div className="flex-1 relative">
            <select
              value={locationQuery}
              onChange={handleLocationChange}
              className="min-w-[200px] w-full bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#BB231D] transition"
            >
              <option value="">All Locations</option>
              {allLocations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Tag filter input and chips */}
          <div className="relative flex-1">
            <div className="flex items-center flex-nowrap overflow-x-auto bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-4 focus-within:ring-2 focus-within:ring-[#BB231D] transition no-scrollbar">
              {/* Selected tags as removable pills */}
              {tagFilters.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm whitespace-nowrap mr-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setTagFilters(tagFilters.filter((_, i) => i !== idx))
                    }
                    className="ml-1 text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* Input field for new tags */}
              {tagFilters.length < 5 && (
                <input
                  type="text"
                  placeholder={
                    tagFilters.length === 0 ? "Add tags and press Enter..." : ""
                  }
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      if (!tagFilters.includes(tagInput.trim())) {
                        setTagFilters([...tagFilters, tagInput.trim()]);
                      }
                      setTagInput("");
                    }
                  }}
                  className="flex-1 min-w-[100px] bg-transparent focus:outline-none text-sm"
                />
              )}
            </div>
          </div>

          {/* Sort dropdown */}
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#BB231D] transition"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="recently-updated">Recently Updated</option>
          </select>
        </div>

        {/* Display filtered items */}
        {filteredItems.length === 0 ? (
          <p className="text-white text-center text-lg mt-10">
            No lost items available
          </p>
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
