import { Navbar } from "@/components/ui/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <div className="flex-1 flex items-center justify-center p-4">
        {children}
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
