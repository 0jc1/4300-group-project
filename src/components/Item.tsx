import Card from "./Card";
import Link from "next/link";

export default function Item({ item }: { item: any }) {
  return (
    <Link href={`/show-item/${item._id}`} className="w-full max-w-sm">
      <Card className="w-full min-h-[500px] flex flex-col justify-between p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03]">
        {/* Image */}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}

        {/* Text content */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h2>

          <p className="text-sm text-gray-700 mb-2 overflow-hidden text-ellipsis line-clamp-3">
            {item.description}
          </p>

          <p className="text-xs text-gray-500 mb-4 mt-auto">
            📍 {item.location}
          </p>
        </div>

        {/* Tags and Status */}
        <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
          <div className="flex flex-wrap gap-2">
            {item.tags &&
              item.tags.length > 0 &&
              item.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
          </div>

          {item.status && (
            <div>
              {item.status === "lost" ? (
                <span className="bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full">
                  🚨 Lost
                </span>
              ) : (
                <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                  ✅ Returned
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
