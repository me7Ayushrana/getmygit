import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { File, Folder, Box, Server, Settings, ChevronRight, ChevronDown } from 'lucide-react';

const icons = {
    folder: Folder,
    component: Box,
    service: Server,
    file: File,
    config: Settings
};

export const GlassNode = memo(({ data, type }: any) => {
    const Icon = icons[type as keyof typeof icons] || (data.label?.includes('.') ? File : Folder);
    const isFolder = type === 'folder' || type === 'root';
    const isCollapsed = data.collapsed;
    const hasChildren = data.hasChildren;

    return (
        <div className="relative group min-w-[150px]">
            <div className={`relative flex items-center bg-white dark:bg-[#09090b] border ${isFolder ? 'border-l-4 border-l-blue-500 border-y-black/[0.05] border-r-black/[0.05] dark:border-y-[#27272a] dark:border-r-[#27272a]' : 'border-black/[0.05] dark:border-[#27272a]'} rounded-md p-2 shadow-sm dark:shadow-none hover:border-black/[0.1] dark:hover:border-[#3f3f46] hover:shadow-md transition-all duration-200 transition-colors`}>
                <div className="flex items-center gap-2 w-full">
                    {/* Icon Container */}
                    <div className={`p-1.5 rounded bg-gray-50 dark:bg-[#18181b] border border-black/[0.03] dark:border-[#27272a] ${type === 'component' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-zinc-400'}`}>
                        <Icon size={14} strokeWidth={1.5} />
                    </div>

                    {/* Label & Meta */}
                    <div className="flex flex-col overflow-hidden mr-2">
                        <span className="text-[12px] font-medium text-gray-900 dark:text-zinc-200 truncate max-w-[120px]" title={data.label}>
                            {data.label}
                        </span>
                    </div>

                    {/* Collapse Indicator */}
                    {isFolder && hasChildren && (
                        <div className="ml-auto text-gray-400 dark:text-zinc-500">
                            {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                        </div>
                    )}
                </div>
            </div>

            <Handle type="target" position={Position.Left} className="!bg-gray-400 dark:!bg-zinc-600 !w-1.5 !h-1.5 !border-none !-left-0.5" />
            <Handle type="source" position={Position.Right} className="!bg-gray-400 dark:!bg-zinc-600 !w-1.5 !h-1.5 !border-none !-right-0.5" />
        </div>
    );
});

GlassNode.displayName = 'GlassNode';
