'use client';

import { RepoAnalysis } from '@/types';
import { useCallback, useEffect, useState, useRef } from 'react';
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
import { ReadmeViewer } from './ReadmeViewer';
import { StatsPanel } from './StatsPanel';
import { CodeViewer } from './CodeViewer';
import { GalaxyView } from './GalaxyView';
import { IntelligenceView } from './IntelligenceView';
import { TimelineView } from './TimelineView';
import { LayoutGrid, Table as TableIcon, Search, FileCode, Star, GitFork, Eye, CircleDot, Calendar, ExternalLink, Github, X, BookOpen, BarChart2, Download, Code, Globe, Shield, Activity, Clock, Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';

const nodeTypes = {
    folder: GlassNode,
    component: GlassNode,
    service: GlassNode,
    file: GlassNode
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // Set graph direction to Left-Right for cleaner tree view
    dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 30 });

    nodes.forEach((node) => {
        // Adjust width/height based on node type for better packing
        dagreGraph.setNode(node.id, { width: 180, height: 50 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        node.position = {
            x: nodeWithPosition.x - 90, // half width
            y: nodeWithPosition.y - 25,  // half height
        };

        return node;
    });

    return { nodes: layoutedNodes, edges };
};

export default function VisualizerClient({ data }: { data: RepoAnalysis }) {
    const [viewMode, setViewMode] = useState<'graph' | 'table' | 'galaxy' | 'intelligence' | 'timeline'>('graph');
    const [sidebarTab, setSidebarTab] = useState<'readme' | 'stats' | 'code' | 'none'>('readme');
    const [searchTerm, setSearchTerm] = useState('');
    const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

    // Code View State
    const [codeContent, setCodeContent] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFilePath, setSelectedFilePath] = useState('');
    const [isLoadingCode, setIsLoadingCode] = useState(false);
    
    const [showBadgeCopied, setShowBadgeCopied] = useState(false);

    const graphRef = useRef<HTMLDivElement>(null);

    // React Flow State
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Logic to filter nodes/edges based on condensed state AND search
    const getVisibleGraph = useCallback(() => {
        const allNodes = data.architecture.nodes;
        const allEdges = data.architecture.edges;

        const visibleNodeIds = new Set<string>();
        const rootId = 'root';

        // If Searching: Show matches and their ancestors
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            const matches = allNodes.filter(n => n.label.toLowerCase().includes(term));

            matches.forEach(match => {
                visibleNodeIds.add(match.id);
                // Add ancestors
                let currentId = match.id;
                while (currentId !== rootId) {
                    const parentEdge = allEdges.find(e => e.target === currentId);
                    if (!parentEdge) break;
                    visibleNodeIds.add(parentEdge.source);
                    currentId = parentEdge.source;
                }
            });
            // Ensure root is there
            visibleNodeIds.add(rootId);
        }
        else {
            // Normal Tree Logic (Collapse/Expand)
            visibleNodeIds.add(rootId);
            const queue = [rootId];
            while (queue.length > 0) {
                const currentId = queue.shift()!;
                if (!collapsedIds.has(currentId)) {
                    const children = allEdges.filter(e => e.source === currentId).map(e => e.target);
                    children.forEach(childId => {
                        visibleNodeIds.add(childId);
                        queue.push(childId);
                    });
                }
            }
        }

        const filteredNodes = allNodes.filter(n => visibleNodeIds.has(n.id));
        const filteredEdges = allEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
        return { filteredNodes, filteredEdges };
    }, [data.architecture, collapsedIds, searchTerm]);

    // Auto Layout Effect
    useEffect(() => {
        const { filteredNodes, filteredEdges } = getVisibleGraph();

        // Dagre Layout
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            filteredNodes.map(n => ({
                id: n.id,
                type: n.type,
                position: { x: 0, y: 0 },
                data: {
                    label: n.label,
                    tech: n.data?.tech,
                    path: n.data?.path,
                    collapsed: collapsedIds.has(n.id),
                    hasChildren: data.architecture.edges.some(e => e.source === n.id)
                }
            })),
            filteredEdges.map(e => ({
                id: e.id,
                source: e.source,
                target: e.target,
                animated: false,
                style: { stroke: '#94a3b8', strokeWidth: 1.5, opacity: 0.4 },
                type: 'smoothstep'
            }))
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [data, setNodes, setEdges, getVisibleGraph, collapsedIds]);

    const onNodeClick = useCallback(async (_: any, node: Node) => {
        if (node.type === 'folder' || node.type === 'root') {
            setCollapsedIds(prev => {
                const next = new Set(prev);
                if (next.has(node.id)) next.delete(node.id);
                else next.add(node.id);
                return next;
            });
        }
        else if (['file', 'component', 'service', 'config'].includes(node.type || '')) {
            const { owner, name, default_branch } = data.repo;
            const path = node.data.path;
            const fileName = node.data.label;
            const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(fileName.split('.').pop()?.toLowerCase() || '');

            setSidebarTab('code');
            setSelectedFile(fileName);
            setSelectedFilePath(path);
            setIsLoadingCode(true);
            setCodeContent('');

            if (isImage) {
                const rawUrl = `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/${path}`;
                setCodeContent(rawUrl);
                setIsLoadingCode(false);
            } else {
                try {
                    const res = await fetch(`/api/github/content?owner=${owner}&repo=${name}&path=${encodeURIComponent(path)}`);
                    if (!res.ok) throw new Error('Failed to fetch');
                    const content = await res.text();
                    setCodeContent(content);
                } catch (error) {
                    console.error("Failed to fetch code", error);
                    setCodeContent("Error loading code.");
                } finally {
                    setIsLoadingCode(false);
                }
            }
        }
    }, [data.repo]);

    const handleExport = useCallback(() => {
        if (graphRef.current === null) return;
        toPng(graphRef.current, { cacheBust: true, backgroundColor: document.documentElement.classList.contains('dark') ? '#050505' : '#ffffff' })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${data.repo.name}-architecture.png`;
                link.href = dataUrl;
                link.click();
            });
    }, [graphRef, data.repo.name]);

    const handleCopyBadge = useCallback(() => {
        try {
            const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
            const shareMessage = `Explore the visual architecture and structural intelligence of this repository: ${currentUrl}`;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareMessage).then(() => {
                    setShowBadgeCopied(true);
                    setTimeout(() => setShowBadgeCopied(false), 3000);
                });
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = shareMessage;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    setShowBadgeCopied(true);
                    setTimeout(() => setShowBadgeCopied(false), 3000);
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        } catch (error) {
            console.error('Link copy error:', error);
        }
    }, []);

    return (
        <div className="w-full h-full min-h-[700px] flex flex-col gap-4 transition-colors duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-[#09090b] border border-black/[0.05] dark:border-[#27272a] p-3 rounded-xl flex items-center justify-between shadow-sm gap-4 transition-colors duration-500">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                            <Github size={18} />
                            {data.repo.owner} / <span className="text-blue-600 dark:text-blue-400">{data.repo.name}</span>
                        </h2>
                    </div>
                </div>

                <div className="flex-1 max-w-md relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#18181b] border border-black/[0.05] dark:border-[#27272a] rounded-lg pl-10 pr-8 py-1.5 text-sm text-gray-900 dark:text-zinc-200 outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleCopyBadge}
                            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-600/5 dark:bg-green-600/10 text-green-600 dark:text-green-400 border border-green-600/10 dark:border-green-600/20 hover:bg-green-600/10 dark:hover:bg-green-600/20 transition-all text-xs font-medium"
                        >
                            <Shield size={14} /> 
                            {showBadgeCopied ? 'Intelligence Link Copied!' : 'Generate Intelligence Link'}
                        </button>
                        <Tooltip text="Copy a markdown snippet to display your repository's structural intelligence on your GitHub README." position="bottom">
                            <button className="p-1 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 transition-colors">
                                <Info size={14} className="cursor-help" />
                            </button>
                        </Tooltip>
                    </div>
                    
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/5 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/10 dark:border-blue-600/20 hover:bg-blue-600/10 dark:hover:bg-blue-600/20 transition-all text-xs font-medium mr-2"
                    >
                        <Download size={14} /> Export
                    </button>

                    <div className="flex bg-gray-50 dark:bg-[#18181b] rounded-lg p-1 border border-black/[0.05] dark:border-[#27272a] transition-colors">
                        <button onClick={() => setViewMode('graph')} className={`p-1.5 rounded-md transition-all ${viewMode === 'graph' ? 'bg-white dark:bg-[#27272a] text-blue-600 dark:text-zinc-100 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Graph View">
                            <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setViewMode('galaxy')} className={`p-1.5 rounded-md transition-all ${viewMode === 'galaxy' ? 'bg-white dark:bg-[#27272a] text-blue-600 dark:text-zinc-100 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Architecture View">
                            <Globe size={16} />
                        </button>
                        <button onClick={() => setViewMode('intelligence')} className={`p-1.5 rounded-md transition-all ${viewMode === 'intelligence' ? 'bg-white dark:bg-[#27272a] text-blue-600 dark:text-zinc-100 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Intelligence View">
                            <Activity size={16} />
                        </button>
                        <button onClick={() => setViewMode('timeline')} className={`p-1.5 rounded-md transition-all ${viewMode === 'timeline' ? 'bg-white dark:bg-[#27272a] text-blue-600 dark:text-zinc-100 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Timeline View">
                            <Clock size={16} />
                        </button>
                        <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-[#27272a] text-blue-600 dark:text-zinc-100 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Table View">
                            <TableIcon size={16} />
                        </button>
                    </div>

                    <div className="h-4 w-[1px] bg-black/[0.05] dark:bg-[#27272a] mx-1" />

                    <div className="flex bg-gray-50 dark:bg-[#18181b] rounded-lg p-1 border border-black/[0.05] dark:border-[#27272a] transition-colors">
                        <button onClick={() => setSidebarTab(prev => prev === 'readme' ? 'none' : 'readme')} className={`p-1.5 rounded-md transition-all ${sidebarTab === 'readme' ? 'bg-white dark:bg-[#27272a] text-blue-600 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="README">
                            <BookOpen size={16} />
                        </button>
                        <button onClick={() => setSidebarTab(prev => prev === 'stats' ? 'none' : 'stats')} className={`p-1.5 rounded-md transition-all ${sidebarTab === 'stats' ? 'bg-white dark:bg-[#27272a] text-blue-600 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Stats">
                            <BarChart2 size={16} />
                        </button>
                        <button onClick={() => setSidebarTab(prev => prev === 'code' ? 'none' : 'code')} className={`p-1.5 rounded-md transition-all ${sidebarTab === 'code' ? 'bg-white dark:bg-[#27272a] text-blue-600 shadow-sm dark:shadow-none' : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`} title="Code View">
                            <Code size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content (Split View) */}
            <div className="flex-1 flex overflow-hidden gap-4">
                {/* Visualizer Area */}
                <div ref={graphRef} className={`flex-1 bg-[#fcfcfc] dark:bg-[#050505] rounded-xl overflow-hidden relative border border-black/[0.05] dark:border-[#27272a] shadow-inner transition-all duration-500`}>
                    {viewMode === 'graph' ? (
                        <div className="w-full h-full relative">
                            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Architectural Blueprint
                                </h3>
                                <p className="text-gray-400 dark:text-zinc-400 text-xs mt-1 font-light">
                                    Structural anatomy and file hierarchy
                                </p>
                            </div>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onNodeClick={onNodeClick}
                                nodeTypes={nodeTypes}
                                fitView
                                minZoom={0.1}
                                maxZoom={2}
                                proOptions={{ hideAttribution: true }}
                            >
                                <Background color={document.documentElement.classList.contains('dark') ? '#27272a' : '#e2e8f0'} gap={24} size={1} />
                                <Controls className="!bg-white dark:!bg-[#18181b] !border-black/[0.05] dark:!border-[#27272a] [&>button]:!fill-gray-400 dark:[&>button]:!fill-zinc-400 [&>button:hover]:!fill-gray-900 dark:[&>button:hover]:!fill-zinc-100" />
                            </ReactFlow>
                        </div>
                    ) : viewMode === 'galaxy' ? (
                        <GalaxyView nodes={nodes} edges={edges} />
                    ) : viewMode === 'intelligence' ? (
                        <IntelligenceView data={data} />
                    ) : viewMode === 'timeline' ? (
                        <TimelineView data={data} />
                    ) : (
                        <div className="h-full overflow-auto p-6" data-lenis-prevent>
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="text-xs uppercase bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 rounded-tl-lg">Type</th>
                                        <th className="px-6 py-3">File Name</th>
                                        <th className="px-6 py-3">Path</th>
                                        <th className="px-6 py-3 rounded-tr-lg">Size (Bytes)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/[0.05] dark:divide-white/5">
                                    {data.fileTree
                                        .filter(file => file.path.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .slice(0, 100)
                                        .map((file, i) => (
                                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 flex items-center gap-2">
                                                    {file.type === 'tree' ? <FolderIcon /> : <FileCode size={16} className="text-blue-600 dark:text-blue-400" />}
                                                </td>
                                                <td className={`px-6 py-4 font-mono ${file.type === 'tree' ? 'font-bold text-gray-900 dark:text-white' : ''}`}>
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

                {/* Sidebar */}
                <AnimatePresence>
                {sidebarTab !== 'none' && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 500, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-white dark:bg-[#09090b] border border-black/[0.05] dark:border-[#27272a] rounded-xl flex flex-col shadow-xl overflow-hidden transition-colors duration-500"
                    >
                        <div className="p-3 border-b border-black/[0.05] dark:border-[#27272a] flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-zinc-200 text-sm flex items-center gap-2">
                                {sidebarTab === 'readme' ? <><BookOpen size={14} /> README</> :
                                    sidebarTab === 'stats' ? <><BarChart2 size={14} /> Statistics</> :
                                        <><Code size={14} /> Code Preview</>}
                            </h3>
                            <div className="flex items-center gap-3">
                                {sidebarTab === 'code' && selectedFilePath && (
                                    <a 
                                        href={`https://github.com/${data.repo.owner}/${data.repo.name}/blob/${data.repo.default_branch}/${selectedFilePath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        title="View on GitHub"
                                    >
                                        <Github size={14} />
                                    </a>
                                )}
                                <button onClick={() => setSidebarTab('none')} className="text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden" data-lenis-prevent>
                            {sidebarTab === 'readme' ? (
                                <ReadmeViewer content={data.readme || ''} />
                            ) : sidebarTab === 'stats' ? (
                                <StatsPanel languages={data.languages || {}} repo={data.repo} />
                            ) : (
                                <div className="h-full">
                                    {isLoadingCode ? (
                                        <div className="flex items-center justify-center h-full text-gray-400 dark:text-zinc-500 text-sm animate-pulse">Loading content...</div>
                                    ) : (
                                        <CodeViewer content={codeContent} fileName={selectedFile} />
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function FolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600 dark:text-blue-500/80">
            <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
        </svg>
    );
}
