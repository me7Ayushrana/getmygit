import { NextResponse } from 'next/server';
import { ReviewService } from '@/services/reviewService';

export const dynamic = 'force-dynamic';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { reviewerId, status, comment } = await request.json();
        if (!reviewerId || !status) throw new Error('reviewerId and status are required');
        const review = await ReviewService.submitReview(id, reviewerId, status, comment);
        return NextResponse.json(review);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const reviews = await ReviewService.getPrReviews(id);
        return NextResponse.json(reviews);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
