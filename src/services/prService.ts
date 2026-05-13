import prisma from '@/lib/prisma';
import { PrAnalyzerService } from './prAnalyzer';
import { PrStatus } from '@prisma/client';

export class PrService {
    static async syncPr(githubUrl: string) {
        // 1. Analyze PR using existing analyzer
        const analysis = await PrAnalyzerService.analyze(githubUrl);
        const parsed = PrAnalyzerService.parseUrl(githubUrl);

        if (!parsed) throw new Error('Invalid GitHub URL');

        // 2. Create or Update in Database
        const pr = await prisma.pullRequest.upsert({
            where: { githubUrl },
            update: {
                title: analysis.details.title,
                status: PrStatus.PENDING, // Reset or keep as is? Let's say we keep pending if re-syncing? actually better to not overwrite decisions.
                riskScore: analysis.riskScore,
                filesChanged: analysis.impact.totalFiles,
                additions: analysis.impact.totalAdditions,
                deletions: analysis.impact.totalDeletions,
            },
            create: {
                githubUrl,
                owner: parsed.owner,
                repo: parsed.repo,
                pullNumber: parsed.number,
                title: analysis.details.title,
                author: analysis.details.author,
                filesChanged: analysis.impact.totalFiles,
                additions: analysis.impact.totalAdditions,
                deletions: analysis.impact.totalDeletions,
                riskScore: analysis.riskScore,
                status: PrStatus.PENDING,
            },
        });

        return pr;
    }

    static async getPrById(id: string) {
        return prisma.pullRequest.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        reviewer: {
                            select: { name: true, email: true },
                        },
                    },
                },
                assignments: {
                    include: {
                        reviewer: {
                            select: { name: true, email: true },
                        },
                    },
                },
            },
        });
    }

    static async getAllPrs() {
        return prisma.pullRequest.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    static async getAssignedPrs(reviewerId: string) {
        return prisma.pullRequest.findMany({
            where: {
                assignments: {
                    some: { reviewerId }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
