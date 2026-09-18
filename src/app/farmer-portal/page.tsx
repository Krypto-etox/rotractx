"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FocusCards } from "@/components/ui/focus-cards";
import { Navbar } from "@/components/ui/navbar";

const FarmerPortal = () => {
  const features = [
    { img: "loan.png", text: "Loan Schemes", link: "/loan" },
    { img: "calender.png", text: "Crop Planting Calendar", link: "/calendar" },
    { img: "crop.png", text: "Crop Disease ID", link: "/disease" },
    { img: "inventory.png", text: "Inventory Management", link: "/inventory" },
    { img: "weather.png", text: "Live Weather", link: "/weather" },
    { img: "video.png", text: "Tutorial Videos/Podcast", link: "/videos" },
    { img: "market.png", text: "Buy/Sell/Rent", link: "/market" },
    { img: "rent.png", text: "Machine Rent", link: "/machines" },
  ];

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <Navbar />

      {/* Content Wrapper */}
      <div className="container mx-auto flex flex-col flex-1 px-6 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white">
            Welcome to
            <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              FarmLife
            </span>
          </h1>
        </div>

        {/* Features Grid */}
        <div className="mb-auto">
          <FocusCards cards={features} />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-4 text-center">
          <span className="text-sm text-white/90">
            © 2025 FarmLife. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default FarmerPortal;
