import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ReadmeViewer = ({ content }: { content: string }) => {
    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-8 text-center">
                <p>No README found.</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-6 bg-white dark:bg-[#09090b] transition-colors duration-500">
            <article className="prose dark:prose-invert prose-sm max-w-none prose-pre:bg-gray-50 dark:prose-pre:bg-[#18181b] prose-pre:border prose-pre:border-black/[0.05] dark:prose-pre:border-[#27272a] text-gray-900 dark:text-zinc-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </article>
        </div>
    );
};
