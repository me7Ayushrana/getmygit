import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export class UserService {
    static async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    }

    static async getUsersByRole(role: Role) {
        return prisma.user.findMany({
            where: { role },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }

    static async getUserProfile(id: string) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
    }
}
