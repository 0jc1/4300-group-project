"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Card from "../../../components/Card";

interface ItemProps {
  item: {
    _id: number;
    title: string;
    description: string;
    imageUrl: string;
    status: "lost" | "returned";
    owner: string;
    email: string;
    location: string;
  };
}

export default function ShowItemDetails() {
  const [item, setItem] = useState<ItemProps["item"] | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: session } = useSession();

  // Fetch item details on page load
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setItem(data.item);
      } catch (error) {
        console.log("Error from ShowItemDetails", error);
      }
    };

    if (id) fetchItem();
  }, [id]);

  // Delete item if the user is the owner
  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/show-items");
    } catch (error) {
      console.log("Error deleting item", error);
    }
  };

  // Mark the item as returned
  const handleMarkAsReturned = async () => {
    try {
      const res = await fetch(`/api/items/${id}/mark-returned`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Network error");
      const { item: updated } = await res.json();
      setItem(updated);
    } catch (err) {
      console.error("Mark returned failed", err);
    }
  };

  // Check if current user is the owner of the item
  const isOwner = session?.user?.email === item?.email;

  // Show popup if user is not logged in and tries to message
  const handleMessageClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session?.user) {
      e.preventDefault();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500); // 2.5 seconds
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/uploads/Update_Background.png')] bg-repeat bg-center bg-cover flex items-center justify-center px-4 py-10">
      {/* Popup shown when unauthenticated user tries to message */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 animate-fadeInOut z-50">
          <div className="bg-white text-black px-8 py-5 rounded-2xl text-lg shadow-lg font-semibold">
            You must be logged in to message the owner.
          </div>
        </div>
      )}

      {/* Item details card */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        {/* Back to Items Button */}
        <div className="mb-8">
          <Link
            href="/show-items"
            className="inline-block px-4 py-2 border border-[#BB231D] text-[#BB231D] hover:bg-[#BB231D] hover:text-white transition-all duration-200 rounded-full"
          >
            ← Back to Items
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-6 text-black">
          <h1 className="text-4xl font-bold mb-2">UGA Item Details</h1>
          <p className="text-lg">See full info and manage your item</p>
          <hr className="my-4 border-gray-400" />
        </div>

        {/* Item content section */}
        {item && (
          <Card className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <div className="w-full mb-6">
              {/* Item image if available */}
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1000}
                  height={600}
                  className="object-cover rounded-xl w-full h-auto"
                />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-600 mt-2 flex items-center gap-1">
                {item.location}
              </p>

              {/* Status Badge */}
              <div className="mt-4">
                {item.status === "returned" ? (
                  <span className="px-3 py-1 text-sm rounded-full bg-green-200 text-green-800">
                    Returned
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm rounded-full bg-red-200 text-red-800">
                    Lost
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons (Delete, Edit) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Delete Button - Only for owners */}
              <button
                type="button"
                onClick={onDeleteClick}
                disabled={!isOwner}
                className={`w-full px-6 py-2 font-semibold rounded-full text-lg transition-all duration-200 ${
                  isOwner
                    ? "bg-[#BB231D] text-white hover:bg-red-800"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                Delete Item
              </button>

              {/* Edit Button - Only for owners */}
              <Link
                href={isOwner ? `/update-item/${id}` : "#"}
                className={`w-full px-6 py-2 font-semibold rounded-full text-lg text-center transition-all duration-200 ${
                  isOwner
                    ? "bg-black text-white hover:bg-[#333333]"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                Edit Item
              </Link>
            </div>

            {/* Message Owner - Only for other users */}
            {!isOwner && item?.email && (
              <div className="flex justify-center mt-6">
                <a
                  href={`mailto:${item.email}?subject=Regarding your lost item "${item.title}"&body=Hi, I saw your post about your lost item on Sniffed Out.`}
                  onClick={handleMessageClick}
                  className="px-8 py-2 border-2 border-[#B7372F] text-[#B7372F] hover:bg-[#B7372F] hover:text-white transition-all duration-200 rounded-full font-semibold"
                >
                  Message Owner
                </a>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Fade-in/out animation for popup */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-fadeInOut {
          animation: fadeInOut 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
