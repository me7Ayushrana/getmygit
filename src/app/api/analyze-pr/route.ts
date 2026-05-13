import { NextRequest, NextResponse } from 'next/server';
import { PrAnalyzerService } from '@/services/prAnalyzer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const analysis = await PrAnalyzerService.analyze(url);
        return NextResponse.json(analysis);

    } catch (error: any) {
        console.error('PR Analysis API Error:', error);
        
        if (error.message && error.message.includes('403')) {
            return NextResponse.json(
                { error: 'GitHub API rate limit reached. Please try again shortly.' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to analyze PR' },
            { status: 500 }
        );
    }
}
