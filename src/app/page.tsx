import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { StorySection, Timeline, Limitations } from '@/components/landing/Sections';
import { Footer } from '@/components/landing/Footer';
import { RepoSearch } from '@/components/RepoSearch';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero: Minimal, no inputs */}
        <Hero />

        {/* 2. Dedicated Action Section: The ONLY place for input */}
        <section className="container relative z-20 -mt-24 mb-32">
          <RepoSearch />
        </section>

        {/* 3. Progressive Disclosure Sections */}
        <div className="space-y-32 mb-32">
          <HowItWorks />
          <Features />
          <StorySection />
          <Timeline />
          <Limitations />
        </div>
      </main>

      <Footer />
    </div>
  );
}
