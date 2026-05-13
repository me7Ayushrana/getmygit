import { NextResponse } from 'next/server';
import { ReviewService } from '@/services/reviewService';

export const dynamic = 'force-dynamic';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { reviewerId, analystId } = await request.json();
        if (!reviewerId || !analystId) throw new Error('reviewerId and analystId are required');
        const assignment = await ReviewService.assignReviewer(id, reviewerId, analystId);
        return NextResponse.json(assignment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
