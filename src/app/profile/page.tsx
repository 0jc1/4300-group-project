"use client";

import Content from "../../components/Content";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userItems, setUserItems] = useState([]);
  const [activeTab, setActiveTab] = useState("lost");

  // Fetch user's lost and returned items after session is available
  useEffect(() => {
    if (session?.user?.email) {
      const fetchItems = async () => {
        const res = await fetch(
          `/api/profile-items?userEmail=${session.user.email}`
        );
        const data = await res.json();
        setUserItems([...data.lostItems, ...data.returnedItems]);
      };
      fetchItems();
    }
  }, [session]);

  // If user is not logged in, show access denied screen
  if (!session) {
    return (
      <Content>
        <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/uploads/Profile_Background.png"
              alt="Profile Background"
              className="object-cover w-full h-full blur-sm opacity-90"
            />
          </div>

          {/* Access Denied Card */}
          <div className="bg-white/100 p-10 rounded-3xl text-center shadow-xl max-w-md w-full animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-700 mb-6">
              You must be logged in to view your profile.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#BB231D] hover:bg-red-800 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Fade-in animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}</style>
      </Content>
    );
  }

  // Separate items into lost and returned
  const lostItems = userItems.filter((item: any) => item.status === "lost");
  const returnedItems = userItems.filter(
    (item: any) => item.status === "returned"
  );

  return (
    <div className="relative min-h-screen px-6 py-10 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/uploads/Profile_Background.png"
          alt="Profile Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Profile content wrapper */}
      <div className="max-w-5xl mx-auto bg-black/90 backdrop-blur-md p-8 rounded-3xl text-white">
        {/* User details */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">{session.user.name}</h1>
          <p className="text-gray-400">{session.user.email}</p>
        </div>

        {/* Toggle buttons for lost/returned items */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("lost")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === "lost" ? "bg-red-600" : "bg-gray-700"
            }`}
          >
            Lost Items
          </button>
          <button
            onClick={() => setActiveTab("returned")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === "returned" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            Returned Items
          </button>
        </div>

        {/* Item list or fallback if empty */}
        {(activeTab === "lost" ? lostItems : returnedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-300 text-lg">
            No {activeTab} items yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeTab === "lost" ? lostItems : returnedItems).map(
              (item: any) => (
                <Link href={`/show-item/${item._id}`} key={item._id}>
                  <div className="bg-white/100 hover:bg-white/80 transition p-4 rounded-2xl flex flex-col">
                    {/* Show item image if available */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}

                    {/* Item title and location */}
                    <h2 className="text-2xl font-bold mb-1 text-black">
                      {item.title}
                    </h2>
                    <p className="text-sm text-black truncate">
                      {item.location}
                    </p>

                    {/* Status badge */}
                    <div className="mt-2">
                      {item.status === "lost" ? (
                        <span className="bg-red-300 text-red-900 px-3 py-1 text-xs rounded-full">
                          Lost
                        </span>
                      ) : (
                        <span className="bg-green-300 text-green-900 px-3 py-1 text-xs rounded-full">
                          Returned
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
