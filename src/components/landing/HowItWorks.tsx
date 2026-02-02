'use client';

import { AccordionItem } from '@/components/ui/Accordion';

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-950/30 border-y border-white/5">
            <div className="container max-w-3xl">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4">How it works</h2>
                    <p className="text-gray-400">Simple steps to visual clarity.</p>
                </div>

                <div className="glass-panel p-8 rounded-2xl">
                    <AccordionItem title="1. Paste Repository Link" defaultOpen={true}>
                        <p>Simply copy and paste any public GitHub repository URL into the input field. We support standard URLs (github.com/owner/repo) and short formats (owner/repo).</p>
                    </AccordionItem>
                    <AccordionItem title="2. Smart Analysis">
                        <p>Our engine fetches the file structure via GitHub API and uses heuristic analysis to identify frameworks (Next.js, React, Python), key folders (src, api, components), and project structure.</p>
                    </AccordionItem>
                    <AccordionItem title="3. Visual Mapping">
                        <p>We generate a directed graph where nodes represent crucial parts of your system and edges represent potential dependencies or data flow.</p>
                    </AccordionItem>
                    <AccordionItem title="4. Interactive Exploration">
                        <p>The final output is an interactive canvas. You can zoom, pan, and click on nodes to see more details about specific components or folders.</p>
                    </AccordionItem>
                </div>
            </div>
        </section>
    );
}
