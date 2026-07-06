import { GitHubService } from '@/services/github';
import { RepoAnalyzer } from '@/services/analyzer';
import VisualizerClient from '@/components/visualizer/VisualizerClient';
import { AnalysisErrorView } from '@/components/visualizer/AnalysisErrorView';
import { cookies } from 'next/headers';

export default async function DashboardPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
    const { owner, repo } = await params;

    const cookieStore = await cookies();
    const customToken = cookieStore.get('github-token')?.value;

    try {
        // 1. Fetch Repo Metadata first to get the correct default branch
        const repoData = await GitHubService.getRepo(owner, repo, customToken);
        
        // 2. Fetch the rest using the correct default branch
        const [files, languages, readme] = await Promise.all([
            GitHubService.getFileTree(owner, repo, repoData.default_branch, customToken),
            GitHubService.getLanguages(owner, repo, customToken).catch(() => ({})),
            GitHubService.getReadme(owner, repo, customToken).catch(() => '')
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
            <AnalysisErrorView 
                owner={owner} 
                repo={repo} 
                errorMessage={error.message || 'Could not analyze repository. Please check the URL and try again.'} 
            />
        );
    }
}
