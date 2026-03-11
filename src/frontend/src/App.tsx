import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { CathedralLight } from "./components/CathedralLight";
import { Countdown } from "./components/Countdown";
import { Curtain } from "./components/Curtain";
import { FleuronDivider, OrnamentDivider } from "./components/Divider";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MusicPlayer } from "./components/MusicPlayer";
import { RsvpForm } from "./components/RsvpForm";
import { ScratchReveal } from "./components/ScratchReveal";
import { ShareSection } from "./components/ShareSection";
import { Timeline } from "./components/Timeline";
import { Venue } from "./components/Venue";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
    mutations: { retry: 0 },
  },
});

function WeddingApp() {
  const [curtainDone, setCurtainDone] = useState(false);
  const handleCurtainComplete = useCallback(() => setCurtainDone(true), []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.015 45)" }}
    >
      <Curtain onComplete={handleCurtainComplete} />

      <main
        style={{
          opacity: curtainDone ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <Hero />

        <div style={{ background: "oklch(0.14 0.015 45)" }}>
          <OrnamentDivider className="px-8" />
        </div>

        <ScratchReveal />

        <div style={{ background: "oklch(0.14 0.015 45)" }}>
          <FleuronDivider className="px-8" />
        </div>

        <Countdown />

        <div style={{ background: "oklch(0.97 0.01 85)" }}>
          <OrnamentDivider className="px-8" />
        </div>

        <Timeline />

        <div style={{ background: "oklch(0.12 0.015 45)" }}>
          <FleuronDivider className="px-8" />
        </div>

        <CathedralLight />

        <div style={{ background: "oklch(0.97 0.01 85)" }}>
          <OrnamentDivider className="px-8" />
        </div>

        <Venue />

        <div style={{ background: "oklch(0.14 0.015 45)" }}>
          <FleuronDivider className="px-8" />
        </div>

        <RsvpForm />

        <div style={{ background: "oklch(0.97 0.01 85)" }}>
          <OrnamentDivider className="px-8" />
        </div>

        <ShareSection />

        <Footer />
      </main>

      <MusicPlayer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeddingApp />
      <Toaster />
    </QueryClientProvider>
  );
}
