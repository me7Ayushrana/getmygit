import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { Node, Edge } from 'reactflow';

interface GalaxyViewProps {
    nodes: Node[];
    edges: Edge[];
}

function Connection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const ref = useRef<any>(null);

    // Create a curve for the connection
    const curve = useMemo(() => {
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2, start[2] + 50), // Curve out in Z
            new THREE.Vector3(...end)
        );
    }, [start, end]);

    const points = useMemo(() => curve.getPoints(20), [curve]);
    const positions = useMemo(() => new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), [points]);

    return (
        <line ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="#4287f5" opacity={0.3} transparent linewidth={1} />
        </line>
    );
}

function NodeMesh({ node, position }: { node: Node; position: [number, number, number] }) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Rotate the node slowly
    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.2;
        }
    });

    const isFile = ['file', 'component', 'service', 'config'].includes(node.type || '');
    const color = isFile ? (hovered ? '#60a5fa' : '#3b82f6') : (hovered ? '#fbbf24' : '#d97706');
    const size = isFile ? 15 : 25;

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    // Could add selection logic here
                }}
            >
                {isFile ? (
                    <dodecahedronGeometry args={[size, 0]} />
                ) : (
                    <icosahedronGeometry args={[size, 0]} />
                )}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe
                />
            </mesh>

            <Text
                position={[0, -size - 10, 0]}
                fontSize={12}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={1}
                outlineColor="#000000"
            >
                {node.data.label}
            </Text>
        </group>
    );
}

export const GalaxyView = ({ nodes, edges }: GalaxyViewProps) => {
    // Center the graph
    const center = useMemo(() => {
        if (nodes.length === 0) return [0, 0, 0];
        const xs = nodes.map(n => n.position.x);
        const ys = nodes.map(n => n.position.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        return [(minX + maxX) / 2, (minY + maxY) / 2, 0];
    }, [nodes]);

    return (
        <div className="w-full h-full bg-black">
            <Canvas camera={{ position: [0, 0, 1000], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableDamping dampingFactor={0.1} />

                <group position={[-center[0], -center[1], 0] as any}>
                    {edges.map(edge => {
                        const source = nodes.find(n => n.id === edge.source);
                        const target = nodes.find(n => n.id === edge.target);
                        if (!source || !target) return null;

                        return (
                            <Connection
                                key={edge.id}
                                start={[source.position.x, source.position.y, 0]}
                                end={[target.position.x, target.position.y, 0]}
                            />
                        );
                    })}

                    {nodes.map(node => (
                        <NodeMesh
                            key={node.id}
                            node={node}
                            position={[node.position.x, node.position.y, 0]}
                        />
                    ))}
                </group>
            </Canvas>
            <div className="absolute bottom-4 right-4 text-xs text-white/50 pointer-events-none">
                Left Click to Rotate • Right Click to Pan • Scroll to Zoom
            </div>
        </div>
    );
};
