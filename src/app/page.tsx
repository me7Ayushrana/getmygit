import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { InteractiveTimeline } from '@/components/landing/InteractiveTimeline';
import { InteractiveBento } from '@/components/landing/InteractiveBento';
import { StorySection, TargetAudienceSection } from '@/components/landing/Sections';
import { Footer } from '@/components/landing/Footer';
import { RepoSearch } from '@/components/RepoSearch';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 relative z-10">
        <Hero />

        {/* Repo Input - Floating below hero */}
        <section className="container relative z-20 -mt-24 mb-32 px-4">
          <RepoSearch />
        </section>

        <div className="space-y-32 mb-32 relative z-10">
          <InteractiveBento />
          <InteractiveTimeline />
          <StorySection />
          <TargetAudienceSection />
        </div>
      </main>

      <Footer />

      {/* Global Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none -z-0" />
    </div>
  );
}
