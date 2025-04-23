"use client";

// Reusable Card component with default styling and optional custom class
export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/100 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-102 duration-300 ${className}`}
    >
      {/* Content passed to the card */}
      {children}
    </div>
  );
}
