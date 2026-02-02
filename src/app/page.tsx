import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { InteractiveTimeline } from '@/components/landing/InteractiveTimeline';
import { InteractiveBento } from '@/components/landing/InteractiveBento';
import { StorySection } from '@/components/landing/Sections';
import { Footer } from '@/components/landing/Footer';
import { RepoSearch } from '@/components/RepoSearch';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Action Section - Lifted up with negative margin to blend with Hero */}
        <section className="container relative z-30 -mt-24 mb-12">
          <RepoSearch />
        </section>

        {/* Features - Bento Grid Style */}
        <div className="relative z-20 bg-[#0A0A0B]">
          <InteractiveBento />
        </div>

        {/* How It Works - Interactive Timeline */}
        <InteractiveTimeline />

        {/* Story - Simple Typography */}
        <StorySection />
      </main>

      <Footer />

      {/* Global Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 bg-[url('/noise.png')] opacity-20" />
    </div>
  );
}
