import { GitHubService } from '@/services/github';
import { RepoAnalyzer } from '@/services/analyzer';
import VisualizerClient from '@/components/visualizer/VisualizerClient';

export default async function DashboardPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
    const { owner, repo } = await params;

    try {
        const [repoData, files] = await Promise.all([
            GitHubService.getRepo(owner, repo),
            GitHubService.getFileTree(owner, repo, 'main') // Assuming main for now, needs real branch logic
                .catch(() => GitHubService.getFileTree(owner, repo, 'master')) // Fallback to master
        ]);

        const analysis = RepoAnalyzer.analyze(repoData, files);

        return (
            <div className="w-full h-[calc(100vh-60px)] p-6">
                <VisualizerClient data={analysis} />
            </div>
        );
    } catch (error: any) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Analysis Failed</h2>
                <p className="text-gray-400 max-w-md text-center">
                    {error.message || 'Could not analyze repository. Please check the URL and try again.'}
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
