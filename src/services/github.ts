import { GitHubRepo, FileTreeNode } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
    /**
     * Fetch repository metadata
     */
    static async getRepo(owner: string, name: string): Promise<GitHubRepo> {
        const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${name}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        if (!res.ok) {
            if (res.status === 404) throw new Error('Repository not found');
            if (res.status === 403) throw new Error('API Rate limit exceeded');
            throw new Error('Failed to fetch repository');
        }

        const data = await res.json();
        return {
            owner: data.owner.login,
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            language: data.language,
            default_branch: data.default_branch,
            topics: data.topics || [],
            forks_count: data.forks_count,
            watchers_count: data.watchers_count,
            open_issues_count: data.open_issues_count,
            updated_at: data.updated_at,
            homepage: data.homepage,
        };
    }

    /**
     * Fetch file tree (recursive)
     * Limit to 1000 files for MVP safety
     */
    static async getFileTree(owner: string, name: string, branch: string): Promise<FileTreeNode[]> {
        const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${name}/git/trees/${branch}?recursive=1`, {
            next: { revalidate: 3600 },
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch file tree');
        }

        const data = await res.json();

        // Filter and map
        return data.tree
            .filter((node: any) => node.type === 'blob' || node.type === 'tree')
            .map((node: any) => ({
                path: node.path,
                type: node.type,
                sha: node.sha,
                size: node.size
            }));
    }

    /**
     * Fetch specific file content (raw)
     */
    static async getFileContent(owner: string, name: string, path: string): Promise<string> {
        const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${name}/contents/${path}`, {
            headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });
        if (!res.ok) return '';
        return await res.text();
    }
}
