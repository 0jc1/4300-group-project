"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateItem() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Form state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Fetch existing item data on component mount
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error("Failed to fetch item");
        const { item } = await res.json();

        // Populate form with existing item values
        setTitle(item.title || "");
        setDescription(item.description || "");
        setStatus(item.status || "lost");
        setLocation(item.location || "");
        setTags(item.tags || []);
        setPreview(item.imageUrl || "");
      } catch (error) {
        console.error("Error loading item:", error);
      }
    };

    if (id) fetchItem();
  }, [id]);

  // Handle image selection and preview display
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle location input with autocomplete suggestions
  const handleLocationChanges = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setLocation(val);

    if (val.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/places?input=${encodeURIComponent(val)}`);
      const { predictions } = await res.json();
      setSuggestions(predictions.map((p: any) => p.description));
    } catch (err) {
      console.error("Places autocomplete failed", err);
      setSuggestions([]);
    }
  };

  // Use browser geolocation to get current address
  const handleLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `/api/location?lat=${latitude}&lng=${longitude}`
        );
        const json = await res.json();
        if (json.address) setLocation(json.address);
        else console.error("Reverse geocode error", json);
      } catch (e) {
        console.error("Reverse geocode fetch failed", e);
      }
    });
  };

  // Submit updated item data to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("location", location);
    formData.append("tags", JSON.stringify(tags));
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Network error");

      // Redirect to item detail page after update
      router.push(`/show-item/${id}`);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/uploads/doggybkg.png')] bg-repeat bg-[length:200px_200px] bg-red-700 flex items-center justify-center bg-cover bg-center px-4 py-10">
      {/* Update Item Form */}
      <form
        onSubmit={handleSubmit}
        className="form-font-oswald bg-black text-white p-10 rounded-[30px] w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">Update Item</h1>

          {/* Title */}
          <div>
            <label className="block mb-1 text-lg">Item Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the item's name"
              className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white h-24 focus:outline-none"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block mb-1 text-lg">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 text-white bg-transparent border border-white rounded-md focus:outline-none"
            >
              <option value="lost" className="text-black">
                Lost
              </option>
              <option value="returned" className="text-black">
                Returned
              </option>
            </select>
          </div>

          {/* Tags Section */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-lg">Tags</label>
            <div className="flex flex-wrap gap-2 border border-white rounded-md p-2 bg-transparent text-white">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white text-black px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ease-in-out hover:scale-95"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      // Animate before removing tag
                      const tagElement = document.getElementById(`tag-${idx}`);
                      if (tagElement) {
                        tagElement.classList.add("opacity-0", "scale-75");
                        setTimeout(() => {
                          setTags(tags.filter((_, i) => i !== idx));
                        }, 200);
                      } else {
                        setTags(tags.filter((_, i) => i !== idx));
                      }
                    }}
                    className="text-red-600 font-bold hover:text-red-800 text-lg"
                  >
                    ×
                  </button>
                </span>
              ))}
              {/* Tag input */}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    e.preventDefault();
                    if (!tags.includes(tagInput.trim())) {
                      setTags([...tags, tagInput.trim()]);
                    }
                    setTagInput("");
                  }
                }}
                placeholder="Add tags here"
                className="bg-transparent placeholder-white text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Location with autocomplete and current location */}
          <div className="relative grid grid-cols-2 gap-2">
            <input
              type="text"
              value={location}
              onChange={handleLocationChanges}
              placeholder="Enter the last seen location"
              className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow mt-1 max-h-48 overflow-auto z-10">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setLocation(s);
                      setSuggestions([]);
                    }}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {/* Use current location button */}
            <button
              type="button"
              onClick={handleLocation}
              className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-black hover:bg-gray-300 transition"
            >
              <img src="/uploads/pin.png" alt="pin icon" className="w-6 h-6" />
              Use my current location
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - Image Preview and Upload */}
        <div className="space-y-4 flex flex-col justify-start pt-[60px]">
          <label className="block text-lg mb-1">Item Image</label>
          <div className="w-full h-78 bg-white/10 border-2 border-white rounded-md flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-contain w-full h-full rounded-md"
              />
            ) : (
              <img
                src="/uploads/uploads-placeholder.png"
                alt="Upload icon"
                className="h-60 opacity-60"
              />
            )}
          </div>
          <label className="w-full bg-gray-200 text-black px-4 py-2 rounded-md font-semibold text-center cursor-pointer hover:bg-gray-300">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#BB231D] hover:bg-red-800 text-white py-3 px-4 rounded-lg text-lg font-semibold"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
}
