import Card from "./Card";

export default function Item({ item }: { item: any }) {
  console.log("Item data:", item); // <-- ✅ Add this line

  return (
    <Card className="w-full max-w-sm">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-40 object-cover rounded-t-md"
        />
      )}

      <h2 className="text-xl font-bold mb-2 text-black">{item.title}</h2>
      <p className="text-sm mb-1 text-gray-800">{item.description}</p>
      <p className="text-xs text-gray-700">📍 {item.location}</p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {item.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
