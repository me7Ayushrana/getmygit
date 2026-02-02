import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features, UseCases } from '@/components/landing/Features';
import { StorySection, Timeline, Limitations } from '@/components/landing/Sections';
import { Footer } from '@/components/landing/Footer';
import { RepoSearch } from '@/components/RepoSearch';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Analyze Section anchored here for functionality */}
        <section className="container relative z-10 -mt-20">
          <RepoSearch />
        </section>

        <HowItWorks />
        <Features />
        <StorySection />
        <UseCases />
        <Timeline />
        <Limitations />
      </main>

      <Footer />
    </div>
  );
}
