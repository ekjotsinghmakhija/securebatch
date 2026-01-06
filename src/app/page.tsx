import Navbar from "@/components/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-blue-500/30">

      <Navbar />

      <main>
        <Hero />
        <Features />
      </main>

      <Footer />

    </div>
  );
}
