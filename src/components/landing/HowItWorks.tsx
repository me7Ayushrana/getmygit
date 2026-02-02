import { Link2, Cpu, Grid, MousePointerClick } from 'lucide-react';

const steps = [
    {
        icon: Link2,
        title: 'Paste Repository Link',
        description: 'Simply copy and paste any public GitHub repository URL into the input field.'
    },
    {
        icon: Cpu,
        title: 'Smart Analysis',
        description: 'We fetch the file structure and metadata to identify the tech stack and architecture.'
    },
    {
        icon: Grid,
        title: 'Visual Mapping',
        description: 'Our engine generates a clean, interactive flowchart of the system components.'
    },
    {
        icon: MousePointerClick,
        title: 'Explore Interactively',
        description: 'Click on nodes, view connections, and understand the codebase in seconds.'
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-slate-950/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How getmygit Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Go from code confusion to visual clarity in four simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-purple-500/50 text-purple-400">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                            {index < 3 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white/10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
