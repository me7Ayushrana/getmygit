'use client';

import { RepoAnalysis } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { GlassNode } from './GlassNode';
import { LayoutGrid, Table as TableIcon, Search, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';

const nodeTypes = {
    folder: GlassNode,
    component: GlassNode,
    service: GlassNode,
    file: GlassNode
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // Set graph direction
    dagreGraph.setGraph({ rankdir: direction, ranksep: 80, nodesep: 40 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 200, height: 60 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // Dagre gives center, ReactFlow uses top-left. Adjusting.
        node.position = {
            x: nodeWithPosition.x - 100, // half width
            y: nodeWithPosition.y - 30,  // half height
        };

        return node;
    });

    return { nodes: layoutedNodes, edges };
};

export default function VisualizerClient({ data }: { data: RepoAnalysis }) {
    const [viewMode, setViewMode] = useState<'graph' | 'table'>('graph');

    // React Flow State
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Auto Layout Effect
    useEffect(() => {
        // Convert generic GraphNodes to ReactFlow Nodes
        const initialNodes: Node[] = data.architecture.nodes.map(n => ({
            id: n.id,
            type: n.type, // Map to custom type
            position: { x: 0, y: 0 }, // Initial, will be calculated by dagre
            data: { label: n.label, tech: n.data?.tech, ...n.data }
        }));

        const initialEdges: Edge[] = data.architecture.edges.map(e => ({
            id: e.id,
            source: e.source,
            target: e.target,
            animated: true,
            style: { stroke: '#4b5563' }
        }));

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [data, setNodes, setEdges]);


    return (
        <div className="w-full h-full min-h-[700px] flex flex-col gap-4">
            {/* Header / Controls */}
            <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">{data.repo.name}</h2>
                    <p className="text-xs text-gray-400">{data.repo.description}</p>
                </div>

                <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setViewMode('graph')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all ${viewMode === 'graph' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        <LayoutGrid size={14} /> GRAPH
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all ${viewMode === 'table' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        <TableIcon size={14} /> TABLE
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 glass-panel rounded-xl overflow-hidden relative border border-white/5 bg-[#020010]">
                {viewMode === 'graph' ? (
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        fitView
                        attributionPosition="bottom-right"
                    >
                        <Background color="#333" gap={20} size={1} />
                        <Controls className="bg-[#1a1a1a] border-white/10 fill-white" />
                    </ReactFlow>
                ) : (
                    <div className="h-full overflow-auto p-6">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-xs uppercase bg-white/5 text-gray-200">
                                <tr>
                                    <th className="px-6 py-3 rounded-tl-lg">Type</th>
                                    <th className="px-6 py-3">File Name</th>
                                    <th className="px-6 py-3">Path</th>
                                    <th className="px-6 py-3 rounded-tr-lg">Size (Bytes)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.fileTree.map((file, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {file.type === 'tree' ? <FolderIcon /> : <FileCode size={16} className="text-neon-blue" />}
                                        </td>
                                        <td className={`px-6 py-4 font-mono ${file.type === 'tree' ? 'font-bold text-white' : ''}`}>
                                            {file.path.split('/').pop()}
                                        </td>
                                        <td className="px-6 py-4 truncate max-w-xs opacity-50">{file.path}</td>
                                        <td className="px-6 py-4 font-mono text-xs">{file.size?.toLocaleString() || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function FolderIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-yellow-500"
        >
            <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
        </svg>
    );
}
