"use client"; // This directive tells Next.js that this component should be rendered on the client side

import Content from "../../components/Content";
import Link from "next/link";

const About = () => {
  return (
    <Content>
      <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
        {/* Background image that covers the entire screen */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/uploads/Contact_Background.png"
            alt="Contact Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Main About Card container with content */}
        <div className="bg-white/100 backdrop-blur-md p-12 rounded-3xl text-center shadow-2xl max-w-4xl w-full animate-fadeInUp space-y-8">
          {/* Title section for About page */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl">🐾</div>
            <h1 className="text-4xl font-bold text-black">About Sniffed Out</h1>
          </div>

          {/* Introduction paragraph describing the purpose of the app */}
          <p className="text-gray-700 text-md leading-relaxed">
            Welcome to Sniffed-Out, your paw-fect campus companion for finding
            misplaced treasures and getting students back to their beloved
            items! We're just students at UGA who've been there, done that with
            losing dorm keys, water bottles, or your UGA ID. So we put heads
            (and paws!) together and made a useful little app that simplifies
            lost & found.
          </p>

          {/* Mission section header and list */}
          <h2 className="text-2xl font-bold text-gray-900 mt-6">Our Mission</h2>
          <ul className="text-gray-700 list-disc list-inside space-y-2 text-left mx-auto max-w-2xl">
            {/* Each mission point highlights a core goal of the app */}
            <li>
              <strong>Centralized communication.</strong> No more desperate
              calls and visits to every building across campus — a mere click to
              report or search for lost items.
            </li>
            <li>
              <strong>Save time & stress.</strong> Click "Use Current Location"
              or use autocomplete to let us know precisely where you last had
              your items.
            </li>
            <li>
              <strong>We keep it simple & cute.</strong> From paw-print
              backgrounds to fun status badges, we want you to smile as you
              track down your lost stuff.
            </li>
          </ul>

          {/* Team introduction section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 gap-8 text-center text-gray-800">
            {/* Jocelyn's profile */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/uploads/jocelyn.png"
                alt="Jocelyn"
                className="w-32 h-32 object-cover"
              />
              <div className="text-xl font-semibold">Jocelyn</div>
              <div className="text-sm text-gray-600">Team Lead</div>
            </div>

            {/* Myonni's profile */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/uploads/myonni.png"
                alt="Myonni"
                className="w-32 h-32 object-cover"
              />
              <div className="text-xl font-semibold">Myonni</div>
              <div className="text-sm text-gray-600">Miro Captain</div>
            </div>

            {/* Abhinav's profile */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/uploads/abhinav.png"
                alt="Abhinav"
                className="w-32 h-32 object-cover"
              />
              <div className="text-xl font-semibold">Abhinav</div>
              <div className="text-sm text-gray-600">Communication</div>
            </div>

            {/* Justin's profile */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/uploads/justin.png"
                alt="Justin"
                className="w-32 h-32 object-cover"
              />
              <div className="text-xl font-semibold">Justin</div>
              <div className="text-sm text-gray-600">Github Captain</div>
            </div>
          </div>

          {/* Closing message at the bottom of the card */}
          <p className="text-gray-600 text-lg mt-6">
            Thanks for stopping by — happy hunting, and may all your lost items
            find their way home! 🐶
          </p>
        </div>
      </div>

      {/* Custom CSS animation for fading content in from below */}
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
};

export default About;
