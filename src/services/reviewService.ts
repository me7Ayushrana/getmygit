import prisma from '@/lib/prisma';
import { PrStatus } from '@prisma/client';
import { NotificationService } from './notificationService';
import { AuditService } from './auditService';

export class ReviewService {
    static async assignReviewer(prId: string, reviewerId: string, analystId: string) {
        const assignment = await prisma.assignment.create({
            data: {
                prId,
                reviewerId,
                analystId,
            },
        });

        await NotificationService.notify(
            reviewerId,
            `You have been assigned to review PR #${prId}`,
            'ASSIGNMENT'
        );

        await AuditService.log(analystId, 'ASSIGN_REVIEWER', { prId, reviewerId });

        return assignment;
    }

    static async submitReview(prId: string, reviewerId: string, status: PrStatus, comment?: string) {
        const review = await prisma.review.create({
            data: {
                prId,
                reviewerId,
                status,
                comment,
            },
        });

        // Update PR Status
        await prisma.pullRequest.update({
            where: { id: prId },
            data: { status },
        });

        const pr = await prisma.pullRequest.findUnique({ where: { id: prId } });

        if (pr) {
            await NotificationService.notify(
                pr.author, // Assuming we want to notify author? or all participants?
                `Your PR "${pr.title}" has been ${status.toLowerCase()}`,
                'REVIEW_UPDATE'
            );
        }

        await AuditService.log(reviewerId, 'SUBMIT_REVIEW', { prId, status });

        return review;
    }

    static async getPrReviews(prId: string) {
        return prisma.review.findMany({
            where: { prId },
            include: {
                reviewer: {
                    select: { name: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
