import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const IPA_SYMBOLS = ['ə', 'ʃ', 'θ', 'ŋ', 'ʒ', 'dʒ', 'tʃ', 'ð', 'b', 'd', 'g', 'p', 't', 'k', 'm', 'n'];

const GridItem = ({ position, symbol }: { position: [number, number, number], symbol: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Random initial phase for gentle breathing
    const initialPhase = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Use built-in state.mouse (NDC: -1 to 1) and state.viewport to get world coordinates
        const { mouse, viewport } = state;
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        const dx = mouseX - position[0];
        const dy = mouseY - position[1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction Radius
        const radius = 4; // Increased radius for better feel
        let scale = 1;
        let color = new THREE.Color("#1e293b"); // slate-800 (default)

        if (dist < radius) {
            const intensity = Math.pow(1 - (dist / radius), 2); // easing
            scale = 1 + intensity * 2; // Grow up to 3x

            const activeColor = new THREE.Color("#38bdf8"); // sky-400
            color.lerp(activeColor, intensity);
        }

        // Idle breathing
        const time = state.clock.getElapsedTime();
        scale *= 1 + Math.sin(time * 2 + initialPhase) * 0.05;

        meshRef.current.scale.setScalar(scale);

        // We need to specifically type the material to access color
        if (Array.isArray(meshRef.current.material)) {
            // handle array if needed (Text shouldn't be array though)
        } else {
            (meshRef.current.material as THREE.MeshBasicMaterial).color = color;
        }
    });

    return (
        <Text
            ref={meshRef}
            position={position}
            fontSize={0.35}
            color="#1e293b" // Initial color
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff" // Use a standard font if loaded, or relying on default
        >
            {symbol}
        </Text>
    );
};

const IPAGrid = () => {
    // Generate grid points
    const points = useMemo(() => {
        const p = [];
        const cols = 26; // Covers most wide screens at scale
        const rows = 14;
        const spacingX = 1.2;
        const spacingY = 1.2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                p.push({
                    position: [
                        (i - cols / 2) * spacingX + spacingX / 2,
                        (j - rows / 2) * spacingY + spacingY / 2,
                        0
                    ] as [number, number, number],
                    symbol: IPA_SYMBOLS[(i + j) % IPA_SYMBOLS.length]
                });
            }
        }
        return p;
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-[#020617]">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <gridHelper args={[100, 100, 0x1e293b, 0x1e293b]} position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]} /> {/* Subtle background grid connection */}
                <group>
                    {points.map((pt, i) => (
                        <GridItem key={i} position={pt.position} symbol={pt.symbol} />
                    ))}
                </group>
                <ambientLight intensity={1} />
            </Canvas>
        </div>
    );
}

export default IPAGrid;
