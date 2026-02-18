import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, DragControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const IPA_SYMBOLS = [
    'ə', 'ʃ', 'θ', 'ŋ', 'ʒ', 'dʒ', 'tʃ', 'ð',
    'b', 'd', 'g', 'p', 't', 'k', 'm', 'n',
    'æ', 'ɑ', 'ɛ', 'ɪ', 'i', 'ɔ', 'u', 'ʊ', 'ʌ',
    'ɾ', 'ʔ', 'ʍ', 'h', 'j', 'w', 'l', 'ɹ'
];

const SPHERE_RADIUS = 8;
const CONNECTION_DISTANCE = 3.5;

const GlobeNode = ({ position, symbol, isHovered, onHover }: { position: [number, number, number], symbol: string, isHovered: boolean, onHover: (hover: boolean) => void }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.lookAt(0, 0, 0); // Face center, or face camera?
            // Actually face camera for readability
            meshRef.current.quaternion.copy(meshRef.current.parent?.parent?.quaternion || new THREE.Quaternion()).invert();
        }
    });

    return (
        <group position={position}>
            <Text
                ref={meshRef}
                fontSize={isHovered ? 0.8 : 0.4}
                color={isHovered ? "#38bdf8" : "#94a3b8"} // sky-400 vs slate-400
                anchorX="center"
                anchorY="middle"
                onPointerOver={() => onHover(true)}
                onPointerOut={() => onHover(false)}
                className="cursor-pointer"
            >
                {symbol}
            </Text>
            {isHovered && (
                <mesh position={[0, -0.6, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="#38bdf8" />
                </mesh>
            )}
        </group>
    );
};

const Connections = ({ points }: { points: [number, number, number][] }) => {
    const lines = useMemo(() => {
        const _lines: [number, number, number][] = [];
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = new THREE.Vector3(...points[i]).distanceTo(new THREE.Vector3(...points[j]));
                if (dist < CONNECTION_DISTANCE) {
                    _lines.push(points[i]);
                    _lines.push(points[j]);
                }
            }
        }
        return _lines;
    }, [points]);

    return (
        <Line
            points={lines}
            color="#334155" // slate-700
            opacity={0.2}
            transparent
            lineWidth={1}
            segments
        />
    );
};


const IPAGlobe = () => {
    const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);

    const points = useMemo(() => {
        const _points: { pos: [number, number, number], symbol: string }[] = [];
        const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < 80; i++) {
            const y = 1 - (i / (80 - 1)) * 2; // y goes from 1 to -1
            const radius = Math.sqrt(1 - y * y); // radius at y

            const theta = phiSpan * i; // golden angle increment

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            _points.push({
                pos: [x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS],
                symbol: IPA_SYMBOLS[i % IPA_SYMBOLS.length]
            });
        }
        return _points;
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-[#020617]"> {/* Slate-950/Black background for depth */}
            <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
                <ambientLight intensity={0.5} />
                <pointLight position={[20, 20, 20]} intensity={1} color="#38bdf8" />

                <group>
                    <Connections points={points.map(p => p.pos)} />
                    {points.map((p, i) => (
                        <GlobeNode
                            key={i}
                            position={p.pos}
                            symbol={p.symbol}
                            isHovered={hoveredSymbol === p.symbol}
                            onHover={(hover) => setHoveredSymbol(hover ? p.symbol : null)}
                        />
                    ))}
                </group>

                <fog attach="fog" args={['#020617', 15, 25]} />
            </Canvas>
        </div>
    );
};

export default IPAGlobe;
