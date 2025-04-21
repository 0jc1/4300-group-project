"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Card from "../../../components/Card";

interface ItemProps {
  item: {
    _id: number;
    title: string;
    description: string;
    url: string;
    status: string;
  };
}

export default function ShowItemDetails() {
  const [item, setItem] = useState<ItemProps["item"] | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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

  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/show-items");
    } catch (error) {
      console.log("Error in ShowItemDetails_deleteClick", error);
    }
  };

  //A function to edit a user's own lost and found item. User can determine/toggle if the item is still lost or it has been returned.
  const handleMarkAsReturned = async () => {
    try {
      const res = await fetch(`/api/items/${id}/mark-returned`, {
        method: "PUT",
      })
      if (!res.ok) throw new Error("Network error")
      const { item: updated } = await res.json()
      setItem(updated)  // update local state so UI re‑renders
    } catch (err) {
      console.error("Mark returned failed", err)
    }
  }

  return (
    <div className="bg-white min-h-screen text-black py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/show-items"
            className="inline-block px-4 py-2 border border-gray-500 text-red-700 hover:bg-red-800 hover:text-white transition rounded"
          >
            Show Item List
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">UGA Item Details</h1>
          <p className="text-lg text-gray-700">View Item's Info</p>
          <hr className="my-4 border-gray-400" />
        </div>

        {item && (
          <Card className="max-w-3xl mx-auto">
            <div className="w-full h-72 relative">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/*This section of the code will delete the item. Will be implemented later.*/}
              <button
                type="button"
                onClick={onDeleteClick}
                className="w-full px-6 py-2 border border-gray-500 text-red-700 hover:bg-red-700 hover:text-white transition rounded"
              >
                Delete Item
              </button>

               {/*This section of the code will edit/update the item. Will be implemented later.*/}
              <Link
                href={`/update-item/${id}`}
                className="w-full px-6 py-2 border border-gray-500 text-red-700 hover:bg-red-700 hover:text-white transition rounded text-center"
              >
                Edit Item
              </Link>

              {/*TBD. Will mark the item status to lost or returned after user is able to update the item.*/}
              {item.status === "lost" ? (
                <button
                  type="button"
                  onClick={handleMarkAsReturned}
                  className="w-full px-6 py-2 border border-green-600 text-green-700 hover:bg-green-700 hover:text-white transition rounded"
                >
                  Mark as Returned
                </button>
              ) : (
                <div className="w-full flex items-center justify-center px-6 py-2 bg-green-100 text-green-700 font-semibold rounded">
                  ✅ Returned
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
