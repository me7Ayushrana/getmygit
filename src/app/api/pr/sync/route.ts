import { NextResponse } from 'next/server';
import { PrService } from '@/services/prService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { githubUrl } = await request.json();
        if (!githubUrl) throw new Error('githubUrl is required');
        const pr = await PrService.syncPr(githubUrl);
        return NextResponse.json(pr);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const prs = await PrService.getAllPrs();
        return NextResponse.json(prs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
