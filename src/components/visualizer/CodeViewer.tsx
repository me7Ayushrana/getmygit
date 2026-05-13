import React, { useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
    content: string;
    fileName: string;
}

export const CodeViewer = ({ content, fileName }: CodeViewerProps) => {
    const language = useMemo(() => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'ts':
            case 'tsx':
                return 'typescript';
            case 'js':
            case 'jsx':
                return 'javascript';
            case 'css':
                return 'css';
            case 'html':
                return 'html';
            case 'json':
                return 'json';
            case 'md':
                return 'markdown';
            case 'py':
                return 'python';
            case 'go':
                return 'go';
            case 'rs':
                return 'rust';
            case 'java':
                return 'java';
            case 'c':
            case 'cpp':
            case 'h':
                return 'cpp';
            default:
                return 'text';
        }
    }, [fileName]);

    const isImage = useMemo(() => {
        return ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(fileName.split('.').pop()?.toLowerCase() || '');
    }, [fileName]);

    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-8 text-center">
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden flex flex-col bg-[#1e1e1e]">
            {/* Simple Header */}
            <div className="bg-[#252526] px-4 py-2 border-b border-[#3e3e42] text-xs text-zinc-400 font-mono flex justify-between items-center">
                <span>{fileName}</span>
                {isImage && <span className="text-zinc-500">Image Preview</span>}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center bg-[#09090b]">
                {isImage ? (
                    <div className="p-4">
                        <img
                            src={content}
                            alt={fileName}
                            className="max-w-full max-h-[60vh] object-contain rounded-lg border border-[#27272a] shadow-lg bg-[url('https://transparenttextures.com/patterns/stardust.png')]"
                        />
                    </div>
                ) : (
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', lineHeight: '1.5', background: 'transparent', width: '100%' }}
                        showLineNumbers={true}
                        wrapLines={true}
                    >
                        {content}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
};
