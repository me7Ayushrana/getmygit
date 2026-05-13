import prisma from '@/lib/prisma';

export class NotificationService {
    static async notify(userId: string, message: string, type: string) {
        try {
            await prisma.notification.create({
                data: {
                    userId,
                    message,
                    type,
                },
            });
            // Simulate console log notification
            console.log(`[Notification for ${userId}]: ${message} (Type: ${type})`);
        } catch (error) {
            console.error('Notification Error:', error);
        }
    }

    static async getNotifications(userId: string) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
        });
    }

    static async markAsRead(id: string) {
        return prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
