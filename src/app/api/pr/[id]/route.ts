import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pr = await prisma.pullRequest.findUnique({
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

        if (!pr) {
            return NextResponse.json({ error: 'PR not found' }, { status: 404 });
        }

        return NextResponse.json(pr);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
