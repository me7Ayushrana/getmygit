import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrendingFeed } from '@/components/landing/TrendingFeed';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { WorkflowTimeline } from '@/components/landing/WorkflowTimeline';
import { StorySection, TargetAudienceSection } from '@/components/landing/Sections';
import { FutureCTA } from '@/components/landing/FutureCTA';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-500">
      <Navbar />

      <main className="flex-1 relative z-10 transition-colors duration-500">
        <Hero />
        
        <ScrollReveal delay={0.2}>
          <TrendingFeed />
        </ScrollReveal>

        {/* Story & Manifesto */}
        <ScrollReveal>
          <StorySection />
        </ScrollReveal>

        {/* Live Visualization Mockup & Features */}
        <div className="relative z-10">
          <ScrollReveal>
            <FeaturesSection />
          </ScrollReveal>
          
          <ScrollReveal>
            <WorkflowTimeline />
          </ScrollReveal>
        </div>

        {/* Target Audience */}
        <ScrollReveal>
          <TargetAudienceSection />
        </ScrollReveal>

        {/* Future & Planning CTA */}
        <ScrollReveal>
          <FutureCTA />
        </ScrollReveal>
        
        {/* Contact & Highlights */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      <Footer />

      {/* Global Grain Overlay for Premium Feel */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}
