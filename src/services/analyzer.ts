import { FileTreeNode, GraphNode, GraphEdge, RepoAnalysis, GitHubRepo } from '@/types';

export class RepoAnalyzer {
    static analyze(repo: GitHubRepo, files: FileTreeNode[]): RepoAnalysis {
        const nodes: GraphNode[] = [];
        const edges: GraphEdge[] = [];

        // 1. Identify Framework/Stack
        const techStack = this.detectStack(files);

        // 2. Create Root Node
        const rootId = 'root';
        nodes.push({
            id: rootId,
            label: repo.name,
            type: 'folder',
            data: { description: repo.description, tech: techStack },
            position: { x: 0, y: 0 }
        });

        // 3. Identify High-Level Architecture based on folders
        interface VitalFolder {
            name: string;
            label: string;
            type: 'folder' | 'component' | 'service';
        }

        const vitalFolders: VitalFolder[] = [
            { name: 'src', label: 'Source Code', type: 'folder' },
            { name: 'pages', label: 'Pages (Routes)', type: 'component' },
            { name: 'app', label: 'App Folder', type: 'component' },
            { name: 'components', label: 'UI Components', type: 'component' },
            { name: 'api', label: 'API Routes', type: 'service' },
            { name: 'lib', label: 'Utilities/Lib', type: 'folder' },
            { name: 'services', label: 'Services', type: 'service' },
            { name: 'models', label: 'Data Models', type: 'folder' },
        ];

        vitalFolders.forEach((vf, index) => {
            const found = files.find(f => f.path.startsWith(vf.name) || f.path.startsWith(`src/${vf.name}`));
            if (found) {
                const id = vf.name;
                nodes.push({
                    id,
                    label: vf.label,
                    type: vf.type,
                    position: { x: (index % 3) * 200, y: Math.floor(index / 3) * 150 + 150 }
                });

                edges.push({
                    id: `e-${rootId}-${id}`,
                    source: rootId,
                    target: id,
                    animated: true
                });
            }
        });

        // 4. Connect dependencies (Simple heuristic)
        if (nodes.find(n => n.id === 'pages') && nodes.find(n => n.id === 'components')) {
            edges.push({ id: 'e-pages-components', source: 'pages', target: 'components', animated: true, label: 'imports' });
        }

        return {
            repo,
            summary: `Detected ${techStack} project.`,
            architecture: { nodes, edges },
            fileTree: files
        };
    }

    static detectStack(files: FileTreeNode[]): string {
        const paths = files.map(f => f.path);
        if (paths.includes('next.config.js') || paths.includes('next.config.mjs')) return 'Next.js';
        if (paths.includes('remix.config.js')) return 'Remix';
        if (paths.includes('vite.config.ts') || paths.includes('vite.config.js')) return 'Vite/React';
        if (paths.includes('requirements.txt')) return 'Python';
        if (paths.includes('Cargo.toml')) return 'Rust';
        return 'JavaScript/Unknown';
    }
}
