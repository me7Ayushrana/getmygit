import { AlertTriangle, Lightbulb } from 'lucide-react';

export function StorySection() {
    return (
        <section id="story" className="py-24 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />

            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 mb-8 border border-yellow-500/20">
                    <Lightbulb size={16} />
                    <span className="text-sm font-bold uppercase tracking-wider">Idea & Motivation</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-8">Why getmygit Exists</h2>

                <div className="space-y-6 text-xl text-gray-300 leading-relaxed font-light">
                    <p>
                        We've all been there: staring at a massive GitHub repository, clicking through folder after folder, trying to build a mental map of how the system works. It's overwhelming, inefficient, and often frustrating.
                    </p>
                    <p>
                        Readme files are great for *how to run* the code, but they rarely explain *how the code is structured*.
                    </p>
                    <p>
                        We built <span className="text-white font-medium">getmygit</span> because we believe clarity should come before complexity. Visualizing architecture shouldn't be a manual chore—it should be instant, interactive, and accessible to everyone.
                    </p>
                </div>
            </div>
        </section>
    );
}

export function Timeline() {
    const events = [
        { year: 'Idea', title: 'The "What touches what?" Problem', desc: 'Realizing that understanding dependencies is the hardest part of onboarding.' },
        { year: 'Prototype', title: 'Text-based Scanners', desc: 'Early scripts to parse imports and print trees in the terminal.' },
        { year: 'Now', title: 'Visual First', desc: 'Interactive, glassmorphism-based UI that makes architecture beautiful.' },
        { year: 'Future', title: 'AI Insights', desc: 'Deep semantic understanding and automated documentation generation.' },
    ];

    return (
        <section id="history" className="py-24 bg-slate-950/30">
            <div className="container">
                <h2 className="text-3xl font-bold mb-12 text-center">History & Evolution</h2>

                <div className="relative">
                    {/* Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {events.map((event, i) => (
                            <div key={i} className="relative z-10 bg-slate-900/80 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="text-purple-500 font-bold text-sm uppercase tracking-wider mb-2">{event.year}</div>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-400">{event.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Limitations() {
    return (
        <section id="limitations" className="py-16">
            <div className="container max-w-3xl mx-auto">
                <div className="glass-panel border-l-4 border-l-yellow-500 p-8 rounded-r-xl">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Transparency & Limitations</h3>
                            <ul className="space-y-2 text-gray-400 list-disc list-inside">
                                <li>Currently supports public repositories only.</li>
                                <li>Focuses on high-level architecture (services, components), not function-level logic.</li>
                                <li>Visualizations are generated via heuristic analysis and may be imperfect for complex monorepos.</li>
                                <li>This tool helps you understand structure, it does not replace reading code.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
