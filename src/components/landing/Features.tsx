import { Layout, GitBranch, Zap, Layers } from 'lucide-react';

const features = [
    {
        icon: Layout,
        title: 'Visual Architecture Mapping',
        description: 'See the big picture. Our engine turns folder structures into logical diagrams automatically.'
    },
    {
        icon: GitBranch,
        title: 'Interactive Flowcharts',
        description: 'Drill down into components. Click nodes to reveal file paths, dependencies, and types.'
    },
    {
        icon: Layers,
        title: 'Component-Level Exploration',
        description: 'Understand how UI, logic, and data layers interact without reading thousand lines of code.'
    },
    {
        icon: Zap,
        title: 'Faster Onboarding',
        description: 'Save hours when joining a new project. Get up to speed with the architecture in minutes.'
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 relative">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why getmygit?</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Built for developers who care about clarity, speed, and architecture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-all group">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <f.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const useCases = [
    {
        title: 'For New Developers',
        description: 'Onboarding to a new codebase? Skip the documentation deep-dive and start with a visual map.',
        tags: ['Onboarding', 'Learning']
    },
    {
        title: 'For Code Reviewers',
        description: 'Understand the scope of changes and impacted components before looking at the diffs.',
        tags: ['Review', 'QA']
    },
    {
        title: 'For Students',
        description: 'Learn from open source giants. See how Facebook, Vercel, and others structure their apps.',
        tags: ['Education', 'Research']
    },
    {
        title: 'For Architects',
        description: 'Analyze project structure, strictness, and modularity at a glance.',
        tags: ['System Design', 'Audit']
    }
];

export function UseCases() {
    return (
        <section id="use-cases" className="py-24 bg-slate-950/50">
            <div className="container">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Who is getmygit for?</h2>
                    <p className="text-gray-400">Designed for every stage of the development lifecycle.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCases.map((useCase, index) => (
                        <div key={index} className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-purple-500/30 transition-colors">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                                <p className="text-gray-400 mb-8 text-lg">{useCase.description}</p>
                            </div>
                            <div className="flex gap-2">
                                {useCase.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
