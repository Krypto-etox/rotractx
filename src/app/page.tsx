"use client";

import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Sun, Cloud, Sprout } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // Ensure this logic only runs on the client
    const button = document.querySelector('[data-dialog-trigger="signup"]');
    if (button) {
      button.addEventListener("click", () => {
        console.log("Sign Up button triggered from Home page");
      });
    }
    return () => {
      if (button) {
        button.removeEventListener("click", () => {});
      }
    };
  }, []);

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

      <div className="flex-1 container mx-auto flex flex-col items-center justify-center gap-16 px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-3xl gap-8">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              FarmLife
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
            Your complete farming companion - empowering farmers with smart
            technology for sustainable and profitable agriculture.
          </p>

          <Link href="/auth/signup" className="w-fit">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter Farmer Portal
              <Leaf className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            {
              icon: <Sun className="w-12 h-12 text-amber-500" />,
              title: "Smart Farming",
              description:
                "Get real-time weather updates and AI-powered crop recommendations based on your location",
            },
            {
              icon: <Cloud className="w-12 h-12 text-blue-500" />,
              title: "Resource Management",
              description:
                "Manage your inventory, equipment, and schedule farming activities efficiently",
            },
            {
              icon: <Sprout className="w-12 h-12 text-green-500" />,
              title: "Market Access",
              description:
                "Connect with buyers and sellers, access loan schemes, and rent equipment",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="group overflow-hidden border-white/20 hover:border-white/30 hover:shadow-lg transition-all duration-300 backdrop-blur-md bg-white/10"
            >
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-white/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-4 text-center">
          <span className="text-sm text-white/90">
            © 2025 FarmLife. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
