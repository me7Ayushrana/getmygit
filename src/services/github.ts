import { GitHubRepo, FileTreeNode } from '@/types';
import { RequestCache } from '@/utils/cache';
import { Octokit } from '@octokit/rest';

const getOctokit = () => {
    const token = process.env.GITHUB_TOKEN?.trim();
    return new Octokit({
        auth: token && token !== '' ? token : undefined,
    });
};

export class GitHubService {
    static async getRepo(owner: string, name: string): Promise<GitHubRepo> {
        const cacheKey = `repo_${owner}_${name}`;
        
        return RequestCache.fetchWithCache(cacheKey, async () => {
            const octokit = getOctokit();
            try {
                const { data } = await octokit.repos.get({ owner, repo: name });
                return {
                    owner: data.owner.login,
                    name: data.name,
                    description: data.description ?? '',
                    stars: data.stargazers_count,
                    language: data.language ?? '',
                    default_branch: data.default_branch,
                    topics: data.topics || [],
                    forks_count: data.forks_count,
                    watchers_count: data.watchers_count,
                    open_issues_count: data.open_issues_count,
                    updated_at: data.updated_at,
                    homepage: data.homepage ?? '',
                };
            } catch (error: any) {
                if (error.status === 404) throw new Error('Repository not found (404)');
                if (error.status === 403) throw new Error('API Rate limit exceeded (403)');
                if (error.status === 401) throw new Error('Invalid GitHub Token in environment (401)');
                throw new Error(`Failed to fetch repository: ${error.status} ${error.message}`);
            }
        });
    }

    static async getFileTree(owner: string, name: string, branch: string): Promise<FileTreeNode[]> {
        const cacheKey = `tree_${owner}_${name}_${branch}`;
        
        return RequestCache.fetchWithCache(cacheKey, async () => {
            const octokit = getOctokit();
            try {
                const { data } = await octokit.git.getTree({
                    owner,
                    repo: name,
                    tree_sha: branch,
                    recursive: '1'
                });

                return data.tree
                    .filter((node: any) => node.type === 'blob' || node.type === 'tree')
                    .map((node: any) => ({
                        path: node.path,
                        type: node.type,
                        sha: node.sha,
                        size: node.size
                    }));
            } catch (error: any) {
                if (error.status === 403) throw new Error('API Rate limit exceeded (403)');
                throw new Error(`Failed to fetch file tree: ${error.message}`);
            }
        });
    }

    static async getFileContent(owner: string, name: string, path: string): Promise<string> {
        try {
            const octokit = getOctokit();
            const { data } = await octokit.repos.getContent({
                owner,
                repo: name,
                path,
                headers: {
                    accept: 'application/vnd.github.v3.raw',
                },
            });
            return typeof data === 'string' ? data : '';
        } catch (error) {
            return '';
        }
    }
    static async getLanguages(owner: string, name: string): Promise<Record<string, number>> {
        const cacheKey = `langs_${owner}_${name}`;
        return RequestCache.fetchWithCache(cacheKey, async () => {
            try {
                const octokit = getOctokit();
                const { data } = await octokit.repos.listLanguages({ owner, repo: name });
                return data as Record<string, number>;
            } catch (error) {
                return {};
            }
        });
    }

    static async getReadme(owner: string, name: string): Promise<string> {
        const cacheKey = `readme_${owner}_${name}`;
        return RequestCache.fetchWithCache(cacheKey, async () => {
            try {
                const octokit = getOctokit();
                const { data } = await octokit.repos.getReadme({
                    owner,
                    repo: name,
                    headers: {
                        accept: 'application/vnd.github.v3.raw',
                    },
                });
                return typeof data === 'string' ? data : '';
            } catch (error) {
                return '';
            }
        });
    }
}
