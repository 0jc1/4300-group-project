import Image from "next/image";
import bgarch from "../assets/Log_In_Background.png";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className = "" }: ContentProps) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-2]">
        <Image
          src={bgarch}
          alt="Paw Print"
          fill
          priority
          className="object-cover w-full h-full blur-sm"
        />
      </div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[-1]" />

      {/* Foreground content */}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

export default Content;
