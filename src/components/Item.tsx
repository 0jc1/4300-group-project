import Card from "./Card";
import Link from "next/link";

// Component for displaying a single item card
export default function Item({ item }: { item: any }) {
  return (
    // Wrap the card in a link to the item's detail page
    <Link href={`/show-item/${item._id}`} className="w-full max-w-sm">
      <Card className="w-full min-h-[500px] flex flex-col justify-between p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03]">
        {/* Image preview if available */}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}

        {/* Main content section */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h2>

          {/* Truncated description */}
          <p className="text-sm text-gray-700 mb-2 overflow-hidden text-ellipsis line-clamp-3">
            {item.description}
          </p>

          {/* Location line with emoji */}
          <p className="text-xs text-gray-500 mb-4 mt-auto">
            📍 {item.location}
          </p>
        </div>

        {/* Footer with tags and status badge pinned to bottom-right */}
        <div className="mt-auto flex justify-between items-end pt-4">
          {/* Tags section on the left */}
          <div className="flex flex-wrap gap-2 max-w-[70%]">
            {item.tags &&
              item.tags.slice(0, 5).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
          </div>

          {/* Status label pinned to the right */}
          {item.status && (
            <div className="ml-auto">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.status === "lost"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {item.status === "lost" ? "Lost" : "Returned"}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
