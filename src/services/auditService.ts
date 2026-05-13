import prisma from '@/lib/prisma';

export class AuditService {
    static async log(userId: string, action: string, details?: any) {
        try {
            await prisma.auditLog.create({
                data: {
                    userId,
                    action,
                    details: details ? JSON.stringify(details) : null,
                },
            });
        } catch (error) {
            console.error('Audit Log Error:', error);
        }
    }

    static async getLogs(userId?: string) {
        return prisma.auditLog.findMany({
            where: userId ? { userId } : {},
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                timestamp: 'desc',
            },
        });
    }
}
