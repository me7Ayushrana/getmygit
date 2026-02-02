import { FileTreeNode, GraphNode, GraphEdge, RepoAnalysis, GitHubRepo } from '@/types';

export class RepoAnalyzer {
    static analyze(repo: GitHubRepo, files: FileTreeNode[]): RepoAnalysis {
        const nodes: GraphNode[] = [];
        const edges: GraphEdge[] = [];
        const nodeMap = new Map<string, GraphNode>();

        // 1. Identify Framework/Stack
        const techStack = this.detectStack(files);

        // 2. Create Root Node
        const rootId = 'root';
        const rootNode: GraphNode = {
            id: rootId,
            label: repo.name,
            type: 'folder',
            data: { description: repo.description, tech: techStack },
            position: { x: 0, y: 0, z: 0 },
            val: 20 // Size weight
        };
        nodes.push(rootNode);
        nodeMap.set(rootId, rootNode);

        // 3. Build Graph from File Tree
        files.forEach(file => {
            const parts = file.path.split('/');
            let parentId = rootId;

            parts.forEach((part, index) => {
                const isLast = index === parts.length - 1;
                // Unique ID for this specific path segment
                const currentId = parts.slice(0, index + 1).join('/');

                if (!nodeMap.has(currentId)) {
                    // Determine type and size
                    let type: 'folder' | 'file' | 'component' | 'service' = 'folder';
                    let size = 5;
                    let color = '#a0a0a0'; // Default gray

                    if (isLast) {
                        type = 'file';
                        size = 2; // Smaller for files
                        const ext = part.split('.').pop()?.toLowerCase();

                        // Color coding
                        if (['ts', 'tsx', 'js', 'jsx'].includes(ext || '')) color = '#00f0ff'; // Neon Blue (JS/TS)
                        else if (['css', 'scss', 'less'].includes(ext || '')) color = '#d8b4fe'; // Purple (Styles)
                        else if (['json', 'yml', 'yaml', 'toml'].includes(ext || '')) color = '#facc15'; // Yellow (Config)
                        else if (['md', 'txt'].includes(ext || '')) color = '#9ca3af'; // Gray (Docs)
                        else if (['png', 'jpg', 'svg'].includes(ext || '')) color = '#00ff9d'; // Green (Assets)

                        // Component Heuristic
                        if (part.match(/^[A-Z]/) && ['tsx', 'jsx', 'vue', 'svelte'].includes(ext || '')) {
                            type = 'component';
                            size = 8;
                            color = '#ff0055'; // Pink/Red for components
                        }
                    } else {
                        // Folder Heuristics
                        if (['src', 'app', 'pages'].includes(part)) {
                            size = 12;
                            color = '#ffffff';
                        }
                    }

                    const newNode: GraphNode = {
                        id: currentId,
                        label: part,
                        type: type,
                        color: color,
                        val: size,
                        position: { x: 0, y: 0, z: 0 }, // Position handled by Force Graph
                        data: { path: currentId }
                    };

                    nodes.push(newNode);
                    nodeMap.set(currentId, newNode);

                    // Create Edge from Parent
                    edges.push({
                        id: `e-${parentId}-${currentId}`,
                        source: parentId,
                        target: currentId,
                        animated: true,
                        // color: '#ffffff20' 
                    });
                }

                parentId = currentId;
            });
        });

        // 4. Simple Dependency Linking (Heuristic based on imports if we had content)
        // For now, we rely on structure. 

        return {
            repo,
            summary: `Detected ${techStack} project with ${files.length} files.`,
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
