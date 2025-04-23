"use client";

import { useState } from "react";
import Content from "../../components/Content";

const Contact = () => {
  const [selectedContact, setSelectedContact] = useState("jp11455@uga.edu");

  // Opens the user's default email app with a pre-filled recipient and subject
  const handleSubmit = () => {
    const mailtoLink = `mailto:${selectedContact}?subject=Sniffed-Out Inquiry`;
    window.location.href = mailtoLink;
  };

  return (
    <Content>
      <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/uploads/Contact_Background.png"
            alt="Contact Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Contact form container */}
        <div className="bg-white/100 backdrop-blur-md p-10 md:p-12 rounded-3xl text-center shadow-2xl max-w-2xl w-full animate-fadeInUp space-y-6">
          {/* Title */}
          <div className="text-4xl">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900">
            Contact Sniffed Out
          </h1>

          {/* Introductory text */}
          <p className="text-gray-700 text-md leading-relaxed">
            Got questions, feedback, or an idea to make our website more
            paw-fect?
            <br />
            Drop us a line below — we’d love to hear how we can make Sniffed-Out
            even better!
          </p>

          {/* Contact selection dropdown */}
          <div className="text-left text-gray-800">
            <label
              htmlFor="contact"
              className="block mb-2 font-semibold text-lg"
            >
              Choose who to contact:
            </label>
            <select
              id="contact"
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="jp11455@uga.edu">
                Jocelyn Pineda Luna – Team Lead
              </option>
              <option value="acs95050@uga.edu">
                Abhinav Siripurapu – Communication
              </option>
              <option value="meb40131@uga.edu">
                Myonni Bailey – Miro Captain
              </option>{" "}
              <option value="jrc74679@uga.edu">
                Justin Cook – GitHub Captain
              </option>
            </select>
          </div>

          {/* Submit button that triggers email */}
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-[#BB231D] hover:bg-red-800 transition-all py-3 rounded-full text-white font-bold text-lg shadow-md"
          >
            Submit Message
          </button>
        </div>
      </div>

      {/* Fade-in animation styling */}
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

export default Contact;
