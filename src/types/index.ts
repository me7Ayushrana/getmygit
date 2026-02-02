export interface GitHubRepo {
    owner: string;
    name: string;
    description: string;
    stars: number;
    language: string;
    default_branch: string;
    topics: string[];
}

export interface FileTreeNode {
    path: string;
    type: 'blob' | 'tree';
    sha: string;
    size?: number;
}

// Visualization Types
export interface GraphNode {
    id: string;
    label: string;
    type: 'component' | 'file' | 'folder' | 'service';
    data?: any;
    position?: { x: number; y: number };
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
    animated?: boolean;
}

export interface RepoAnalysis {
    repo: GitHubRepo;
    summary: string;
    architecture: {
        nodes: GraphNode[];
        edges: GraphEdge[];
    };
    fileTree: FileTreeNode[];
}
