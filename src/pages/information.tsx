import React, { useState } from "react";
import About from "@/components/about";
import Usages from "@/components/usages";
import GetApp from "@/components/appsDownload";
import {FiPlus } from "react-icons/fi";
import Link from "next/link";

const Information = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [showAppDownload, setShowAppDownload] = useState(false);
  const [showUsages, setShowUsages] = useState(false);

  const handleToggleAbout = () => {
    setShowAbout(true);
    setShowAppDownload(false);
    setShowUsages(false);
  };

  const handleToggleAppDownload = () => {
    setShowAbout(false);
    setShowAppDownload(true);
    setShowUsages(false);
  };

  const handleToggleUsages = () => {
    setShowAbout(false);
    setShowAppDownload(false);
    setShowUsages(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="flex justify-center items-center mb-6 gap-8">
        <button
          className={`bg-none  py-1 rounded-md rounded-r-none ${
            showAbout ? "cursor-not-allowed" : "font-semibold"
          }`}
          onClick={handleToggleAbout}
        >
          About
        </button>
        <button
          className={`bg-none border-[#305381]  py-1 rounded-md ${
            showUsages ? "cursor-not-allowed" : "font-semibold"
          }`}
          onClick={handleToggleUsages}
        >
          Usage
        </button>
        <button
          className={`bg-none border-[#305381]  py-1 rounded-md rounded-l-none ${
            showAppDownload ? "cursor-not-allowed" : "font-semibold"
          }`}
          onClick={handleToggleAppDownload}
        >
          Apps
        </button>
        <Link href='/' className="bg-none border-[#305381]  py-1 rounded-md rounded-l-none font-semibold" 
        >
         Back
        </Link>
      </div>

      <div className="max-w-lg bg-white shadow-md rounded-md px-6 py-2">
        {showAbout && <About />}
        {showUsages && <Usages />}
        {showAppDownload && <GetApp />}
      </div>
    </div>
  );
};

export default Information;
