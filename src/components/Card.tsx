"use client";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-102 duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
