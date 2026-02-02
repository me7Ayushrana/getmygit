'use client';

import { Handle, Position } from 'reactflow';
import { Folder, FileCode, Layers, Server } from 'lucide-react';

const icons = {
    folder: Folder,
    component: Layers,
    service: Server,
    file: FileCode
};

export function GlassNode({ data, type }: any) {
    const Icon = icons[type as keyof typeof icons] || Folder;

    return (
        <div className="glass-node min-w-[150px] px-4 py-3 flex items-center gap-3 shadow-lg">
            <Handle type="target" position={Position.Top} className="!bg-purple-500" />

            <div className="p-2 rounded bg-white/5">
                <Icon size={20} className="text-purple-400" />
            </div>

            <div>
                <div className="text-sm font-bold">{data.label}</div>
                {data.tech && <div className="text-[10px] text-gray-400">{data.tech}</div>}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
        </div>
    );
}
