import { NextResponse } from 'next/server';
import { UserService } from '@/services/userService';

export const dynamic = 'force-dynamic';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as Role | null;

    try {
        if (role) {
            const users = await UserService.getUsersByRole(role);
            return NextResponse.json(users);
        }
        const users = await UserService.getAllUsers();
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
