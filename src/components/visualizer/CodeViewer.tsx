import React, { useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

interface CodeViewerProps {
    content: string;
    fileName: string;
}

export const CodeViewer = ({ content, fileName }: CodeViewerProps) => {
    const { theme } = useTheme();
    
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
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-zinc-500 p-8 text-center">
                <p>Loading content...</p>
            </div>
        );
    }

    const isDarkMode = theme === 'dark';

    return (
        <div className="h-full overflow-hidden flex flex-col bg-white dark:bg-[#1e1e1e] transition-colors duration-500">
            {/* Simple Header */}
            <div className="bg-gray-50 dark:bg-[#252526] px-4 py-2 border-b border-black/[0.05] dark:border-[#3e3e42] text-xs text-gray-500 dark:text-zinc-400 font-mono flex justify-between items-center transition-colors">
                <span>{fileName}</span>
                {isImage && <span className="text-gray-400 dark:text-zinc-500">Image Preview</span>}
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-auto custom-scrollbar flex ${isImage ? 'items-center justify-center' : 'items-start'} bg-white dark:bg-[#09090b] transition-colors`} data-lenis-prevent>
                {isImage ? (
                    <div className="p-4">
                        <img
                            src={content}
                            alt={fileName}
                            className="max-w-full max-h-[60vh] object-contain rounded-lg border border-black/[0.1] dark:border-[#27272a] shadow-lg"
                        />
                    </div>
                ) : (
                    <SyntaxHighlighter
                        language={language}
                        style={isDarkMode ? vscDarkPlus : vs}
                        customStyle={{ 
                            margin: 0, 
                            padding: '1.5rem', 
                            fontSize: '13px', 
                            lineHeight: '1.5', 
                            background: 'transparent', 
                            width: '100%',
                        }}
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
