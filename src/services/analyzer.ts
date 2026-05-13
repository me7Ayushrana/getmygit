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
                    let type: 'folder' | 'file' | 'component' | 'service' | 'config' = 'folder';
                    let size = 5;
                    let color = '#a0a0a0'; // Default gray

                    if (isLast) {
                        type = 'file';
                        size = 2; // Smaller for files
                        const ext = part.split('.').pop()?.toLowerCase();

                        // Color coding
                        if (['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'].includes(ext || '')) color = '#00f0ff'; // Neon Blue (JS/TS)
                        else if (['css', 'scss', 'less', 'sass', 'styl'].includes(ext || '')) color = '#d8b4fe'; // Purple (Styles)
                        else if (['json', 'yml', 'yaml', 'toml', 'xml', 'env'].includes(ext || '')) {
                            color = '#facc15'; // Yellow (Config)
                            type = 'config';
                        }
                        else if (['md', 'txt', 'LICENSE'].includes(ext || '')) color = '#9ca3af'; // Gray (Docs)
                        else if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'ico'].includes(ext || '')) color = '#00ff9d'; // Green (Assets)
                        else if (['go', 'rs', 'java', 'py', 'rb', 'php', 'c', 'cpp', 'h'].includes(ext || '')) color = '#ff5722'; // Orange (Backend/System)
                        else if (['dockerfile', 'makefile'].includes(part.toLowerCase())) color = '#3b82f6'; // Blue (Build)

                        // Component Heuristic - PascalCase + UI extension + NOT a config file
                        if (part.match(/^[A-Z][a-zA-Z0-9]*\.(tsx|jsx|vue|svelte)$/) && !part.includes('config')) {
                            type = 'component';
                            size = 8;
                            color = '#ff0055'; // Pink/Red for components
                        }
                    } else {
                        // Folder Heuristics
                        if (['src', 'app', 'pages', 'components', 'lib', 'utils'].includes(part)) {
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
                        animated: false,
                        style: { stroke: '#4b5563', strokeWidth: 1, opacity: 0.5 }
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
        const paths = files.map(f => f.path.toLowerCase());

        // Frameworks
        if (paths.some(p => p.includes('next.config'))) return 'Next.js';
        if (paths.some(p => p.includes('remix.config'))) return 'Remix';
        if (paths.some(p => p.includes('vite.config'))) return 'Vite/React';
        if (paths.some(p => p.includes('nuxt.config'))) return 'Nuxt';
        if (paths.some(p => p.includes('angular.json'))) return 'Angular';

        // Languages/Platforms
        if (paths.includes('cargo.toml')) return 'Rust';
        if (paths.includes('go.mod')) return 'Go';
        if (paths.includes('pom.xml') || paths.some(p => p.endsWith('.java'))) return 'Java/Maven';
        if (paths.includes('build.gradle') || paths.some(p => p.endsWith('.kt'))) return 'Kotlin/Gradle';
        if (paths.includes('requirements.txt') || paths.includes('pyproject.toml') || paths.includes('poetry.lock')) return 'Python';
        if (paths.includes('composer.json')) return 'PHP/Laravel';
        if (paths.includes('gemfile')) return 'Ruby/Rails';
        if (paths.includes('dockerfile')) return 'Docker';

        return 'JavaScript/Unknown';
    }
}
