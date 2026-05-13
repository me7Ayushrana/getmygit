
import { Octokit } from '@octokit/rest';
import { RequestCache } from '@/utils/cache';

// Initialize Octokit (will use GITHUB_TOKEN from env if available)
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim() !== '' ? process.env.GITHUB_TOKEN.trim() : undefined,
});

export interface PrDetails {
    title: string;
    number: number;
    owner: string;
    repo: string;
    author: string;
    avatar_url: string;
    state: string;
    created_at: string;
    updated_at: string;
    additions: number;
    deletions: number;
    changed_files: number;
    description: string;
    url: string;
}

export interface PrFile {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    patch?: string;
}

export interface PrImpact {
    totalFiles: number;
    totalAdditions: number;
    totalDeletions: number;
    sensitiveFiles: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
}

export interface PrAnalysis {
    details: PrDetails;
    files: PrFile[];
    impact: PrImpact;
    riskScore: number;
    readinessScore: number;
    readinessMessage: string;
    suggestedReviewers: string[];
}

export class PrAnalyzerService {

    static parseUrl(url: string): { owner: string; repo: string; number: number } | null {
        try {
            const regex = /github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/;
            const match = url.match(regex);
            if (match) {
                return {
                    owner: match[1],
                    repo: match[2],
                    number: parseInt(match[3])
                };
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    static async getPrDetails(owner: string, repo: string, number: number): Promise<PrDetails> {
        const cacheKey = `pr_details_${owner}_${repo}_${number}`;
        return RequestCache.fetchWithCache(cacheKey, async () => {
            try {
                const { data } = await octokit.pulls.get({
                    owner,
                    repo,
                    pull_number: number
                });

                return {
                    title: data.title,
                    number: data.number,
                    owner,
                    repo,
                    author: data.user.login,
                    avatar_url: data.user.avatar_url,
                    state: data.state,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    additions: data.additions,
                    deletions: data.deletions,
                    changed_files: data.changed_files,
                    description: data.body || '',
                    url: data.html_url
                };
            } catch (error: any) {
                console.error('Error fetching PR details:', error);
                if (error.status === 403) throw new Error('API Rate limit exceeded (403)');
                throw new Error('Failed to fetch PR details. Please check the URL and your token.');
            }
        });
    }

    static async getPrFiles(owner: string, repo: string, number: number): Promise<PrFile[]> {
        const cacheKey = `pr_files_${owner}_${repo}_${number}`;
        return RequestCache.fetchWithCache(cacheKey, async () => {
            try {
                const { data } = await octokit.pulls.listFiles({
                    owner,
                    repo,
                    pull_number: number,
                    per_page: 100 // Limit for MVP
                });

                return data.map(file => ({
                    filename: file.filename,
                    status: file.status,
                    additions: file.additions,
                    deletions: file.deletions,
                    changes: file.changes,
                    patch: file.patch
                }));
            } catch (error: any) {
                console.error('Error fetching PR files:', error);
                if (error.status === 403) throw new Error('API Rate limit exceeded (403)');
                return [];
            }
        });
    }

    static analyzeImpact(files: PrFile[]): PrImpact {
        const totalFiles = files.length;
        let totalAdditions = 0;
        let totalDeletions = 0;
        const sensitiveFiles: string[] = [];

        const sensitivePatterns = [
            /auth/i, /config/i, /secret/i, /token/i, /cred/i, /\.env/i,
            /database/i, /payment/i, /billing/i, /middleware/i, /security/i
        ];

        files.forEach(file => {
            totalAdditions += file.additions;
            totalDeletions += file.deletions;

            for (const pattern of sensitivePatterns) {
                if (pattern.test(file.filename)) {
                    sensitiveFiles.push(file.filename);
                    break;
                }
            }
        });

        let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
        if (totalFiles > 20 || (totalAdditions + totalDeletions) > 1000 || sensitiveFiles.length > 0) {
            riskLevel = 'Medium';
        }
        if (totalFiles > 50 || (totalAdditions + totalDeletions) > 3000 || sensitiveFiles.length > 2) {
            riskLevel = 'High';
        }

        return {
            totalFiles,
            totalAdditions,
            totalDeletions,
            sensitiveFiles,
            riskLevel
        };
    }

    static calculateRisk(impact: PrImpact, details: PrDetails): { score: number; readiness: number; message: string } {
        let score = 0;

        // Size Impact
        if (impact.totalFiles > 50) score += 30;
        else if (impact.totalFiles > 20) score += 15;

        if (impact.totalAdditions + impact.totalDeletions > 2000) score += 20;
        else if (impact.totalAdditions + impact.totalDeletions > 500) score += 10;

        // Sensitive Files
        if (impact.sensitiveFiles.length > 0) score += 25;
        if (impact.sensitiveFiles.length > 3) score += 15;

        // Description validation
        if (!details.description || details.description.length < 50) score += 10;

        // Cap at 100
        score = Math.min(100, score);
        const readiness = 100 - score;

        let message = "Ready for standard review.";
        if (readiness < 50) message = "High Risk! Requires careful security and architecture review.";
        else if (readiness < 80) message = "Moderate Risk. Pay attention to sensitive files and logic changes.";

        return { score, readiness, message };
    }

    static async suggestReviewers(owner: string, repo: string, files: PrFile[], prAuthor: string): Promise<string[]> {
        const cacheKey = `pr_reviewers_${owner}_${repo}_${files.map(f => f.filename).join('_').substring(0, 50)}`;
        
        return RequestCache.fetchWithCache(cacheKey, async () => {
            const reviewers = new Map<string, number>();

            // For MVP optimization, limit to 3 files and fetch concurrently
            const filesToCheck = files.slice(0, 3);

            await Promise.allSettled(filesToCheck.map(async file => {
                const { data: commits } = await octokit.repos.listCommits({
                    owner,
                    repo,
                    path: file.filename,
                    per_page: 5
                });

                commits.forEach(commit => {
                    const author = commit.author?.login;
                    if (author && author !== prAuthor && !author.includes('[bot]')) {
                        reviewers.set(author, (reviewers.get(author) || 0) + 1);
                    }
                });
            }));

            return Array.from(reviewers.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3) // Top 3
                .map(([author]) => author);
        });
    }

    static async analyze(url: string): Promise<PrAnalysis> {
        const parsed = this.parseUrl(url);
        if (!parsed) throw new Error('Invalid PR URL');

        const { owner, repo, number } = parsed;

        const [details, files] = await Promise.all([
            this.getPrDetails(owner, repo, number),
            this.getPrFiles(owner, repo, number)
        ]);

        const impact = this.analyzeImpact(files);
        const { score, readiness, message } = this.calculateRisk(impact, details);
        const suggestedReviewers = await this.suggestReviewers(owner, repo, files, details.author);

        return {
            details,
            files,
            impact,
            riskScore: score,
            readinessScore: readiness,
            readinessMessage: message,
            suggestedReviewers
        };
    }
}
