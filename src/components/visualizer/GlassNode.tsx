import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { File, Folder, Box, Server, Settings } from 'lucide-react';

const icons = {
    folder: Folder,
    component: Box,
    service: Server,
    file: File,
    config: Settings
};

export const GlassNode = memo(({ data, type }: any) => {
    const Icon = icons[type as keyof typeof icons] || (data.label?.includes('.') ? File : Folder);

    return (
        <div className="relative group min-w-[180px]">
            {/* Glow backing */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-500`} />

            <div className="relative flex flex-col items-center bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl">
                <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-md bg-white/5 border border-white/5 ${type === 'component' ? 'text-neon-blue' : 'text-gray-400'}`}>
                        <Icon size={16} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-gray-200 truncate max-w-[120px]" title={data.label}>
                            {data.label}
                        </span>
                        {data.tech && <span className="text-[10px] text-gray-500 font-mono">{data.tech}</span>}
                    </div>
                </div>
            </div>

            <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-2 !h-2" />
            <Handle type="source" position={Position.Bottom} className="!bg-neon-blue !w-2 !h-2" />
        </div>
    );
});

GlassNode.displayName = 'GlassNode';
