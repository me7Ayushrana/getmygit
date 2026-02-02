'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float, Environment } from '@react-three/drei';

function Node({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    roughness={0}
                />
                <pointLight distance={3} intensity={5} color={color} />
            </mesh>
        </Float>
    );
}

function Connections({ count = 15 }: { count?: number }) {
    const lines = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            const start = [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            ] as [number, number, number];
            const end = [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            ] as [number, number, number];
            return { start, end };
        });
    }, [count]);

    return (
        <group>
            {lines.map((line, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([...line.start, ...line.end])}
                            itemSize={3}
                            args={[new Float32Array([...line.start, ...line.end]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00f0ff" transparent opacity={0.1} />
                </line>
            ))}
        </group>
    );
}

function Scene() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation of the entire system
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Node position={[-4, 2, -2]} color="#00f0ff" />
            <Node position={[4, -2, -2]} color="#d8b4fe" />
            <Node position={[0, 4, -4]} color="#00ff9d" />

            {/* Background Particles/Stars */}
            <Connections />

            {/* Random smaller nodes */}
            <Node position={[5, 3, -5]} color="#00f0ff" />
            <Node position={[-5, -3, -5]} color="#d8b4fe" />
        </group>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 2]} // Optimization for varying pixel ratios
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <Scene />
                <Environment preset="city" />
                <fog attach="fog" args={['#030014', 5, 20]} />
            </Canvas>
        </div>
    );
}
