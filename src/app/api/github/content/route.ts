import { GitHubService } from '@/services/github';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const path = searchParams.get('path');

    if (!owner || !repo || !path) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const content = await GitHubService.getFileContent(owner, repo, path);
        return new NextResponse(content, {
            headers: { 'Content-Type': 'text/plain' },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
