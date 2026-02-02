'use client';

import { RepoAnalysis } from '@/types';
import { useCallback, useEffect } from 'react';
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

const nodeTypes = {
    folder: GlassNode,
    component: GlassNode,
    service: GlassNode,
    file: GlassNode
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 220, height: 100 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = Position.Top;
        node.sourcePosition = Position.Bottom;

        // Shift the dagre node position (top left) to React Flow (center)
        // node.position = {
        //   x: nodeWithPosition.x - nodeWithPosition.width / 2,
        //   y: nodeWithPosition.y - nodeWithPosition.height / 2,
        // };

        // Actually dagre gives center point if configured, but default is top-left in some versions? 
        // Wait, dagre gives x,y which is center of node. ReactFlow 11 uses top-left.
        // Let's assume top-left needs adjustment.

        node.position = {
            x: nodeWithPosition.x - 110, // width / 2
            y: nodeWithPosition.y - 50,  // height / 2
        };

        return node;
    });

    return { nodes: layoutedNodes, edges };
};

export default function VisualizerClient({ data }: { data: RepoAnalysis }) {
    const initialNodes: Node[] = data.architecture.nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: { x: 0, y: 0 },
        data: { label: n.label, ...n.data }
    }));

    const initialEdges: Edge[] = data.architecture.edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: e.animated,
        label: e.label,
        style: { stroke: 'var(--border-highlight)' }
    }));

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [data]); // Run when data changes

    return (
        <div className="w-full h-full min-h-[600px] glass-panel rounded-xl overflow-hidden relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#aaa" gap={16} size={1} />
                <Controls className="bg-slate-800 border-none fill-white" />
            </ReactFlow>

            <div className="absolute top-4 left-4 z-10 glass-node p-4 max-w-xs">
                <h2 className="font-bold text-lg">{data.repo.name}</h2>
                <p className="text-sm text-gray-300">{data.summary}</p>
                <div className="mt-2 text-xs flex gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded">{data.repo.language}</span>
                    <span className="px-2 py-1 bg-white/10 rounded">⭐ {data.repo.stars}</span>
                </div>
            </div>
        </div>
    );
}
