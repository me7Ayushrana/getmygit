import { GitHubService } from '@/services/github';
import { RepoAnalyzer } from '@/services/analyzer';
import VisualizerClient from '@/components/visualizer/VisualizerClient';

export default async function DashboardPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
    const { owner, repo } = await params;

    try {
        // 1. Fetch Repo Metadata first to get the correct default branch
        const repoData = await GitHubService.getRepo(owner, repo);
        
        // 2. Fetch the rest using the correct default branch
        const [files, languages, readme] = await Promise.all([
            GitHubService.getFileTree(owner, repo, repoData.default_branch),
            GitHubService.getLanguages(owner, repo).catch(() => ({})),
            GitHubService.getReadme(owner, repo).catch(() => '')
        ]);

        const analysis = RepoAnalyzer.analyze(repoData, files);
        analysis.languages = languages;
        analysis.readme = readme;

        return (
            <div className="w-full h-screen pt-28 px-6 pb-6 flex flex-col">
                <VisualizerClient data={analysis} />
            </div>
        );
    } catch (error: any) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Analysis Failed</h2>
                <p className="text-gray-400 max-w-md text-center">
                    {error.message?.includes('403') 
                        ? 'GitHub API rate limit reached. Please try again shortly.' 
                        : (error.message || 'Could not analyze repository. Please check the URL and try again.')}
                </p>
                <p className="text-xs text-gray-500 mt-4">
                    Note: This requires a public repository and is subject to GitHub API rate limits.
                </p>
                <a href="/" className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded transition">
                    Go Back
                </a>
            </div>
        );
    }
}
