"use client";

import CallToActionCard from "@/components/home/CallToActionCard";
import FeatureCards from "@/components/home/FeatureCards";
import Hero from "@/components/home/Hero";
import BackgroundOrbs from "@/components/layouts/BackgroundOrbs";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 dark:to-emerald-500/10 relative overflow-hidden">
        <BackgroundOrbs />
        <Hero />
        <FeatureCards />
        <CallToActionCard />
      </main>
    </>
  );
}
