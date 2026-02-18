import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Switched from raw IPA to "Phonetic Data" concepts for a more "Institute/Data" feel
const PHONETIC_DATA = [
    '[+voice]', '[-nasal]', 'PLOSIVE', 'FRICATIVE',
    '0x0259', // Hex for Schwa
    '[+high]', '[-back]', 'VELAR', 'GLOTTAL',
    'VOT:12ms', 'F0:120Hz', 'FORMANT', 'ONSET',
    'CODA', 'NUCLEUS', '[+round]', '[-cont]',
    'BILABIAL', 'ALVEOLAR', 'PALATAL', 'NASAL',
    '0x00E6', // Hex for Ash
    'GEMINATE', 'ASPIRATED'
];

const GridItem = ({ position, text }: { position: [number, number, number], text: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport, mouse } = useThree();

    const initialPhase = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        const dx = mouseX - position[0];
        const dy = mouseY - position[1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction Settings
        const radius = 4.0;
        const baseScale = 0.35; // Smaller font size for longer text
        let scale = baseScale;

        let color = new THREE.Color("#f1f5f9"); // slate-100

        if (dist < radius) {
            const intensity = Math.pow(1 - (dist / radius), 2);

            scale = baseScale + (intensity * 0.15); // Slight grow

            const activeColor = new THREE.Color("#94a3b8"); // slate-400
            color.lerp(activeColor, intensity);

            meshRef.current.rotation.x = dy * 0.05 * intensity;
            meshRef.current.rotation.y = -dx * 0.05 * intensity;
        } else {
            meshRef.current.rotation.x = 0;
            meshRef.current.rotation.y = 0;
        }

        const time = state.clock.getElapsedTime();
        scale *= 1 + Math.sin(time * 0.5 + initialPhase) * 0.05; // Slower breathing

        meshRef.current.scale.setScalar(scale);

        if (!Array.isArray(meshRef.current.material)) {
            (meshRef.current.material as THREE.MeshBasicMaterial).color = color;
        }
    });

    return (
        <Text
            ref={meshRef}
            position={position}
            fontSize={0.4} // Base size, scaled down in loop
            color="#f1f5f9"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5qRSN.woff" // Monospace for data look
        >
            {text}
        </Text>
    );
};

const IPAGrid = () => {
    const points = useMemo(() => {
        const p = [];
        // Adjusted grid density for longer text
        const cols = 12;
        const rows = 12;
        const spacingX = 3.5; // Much wider for words
        const spacingY = 1.5;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                p.push({
                    position: [
                        (i - cols / 2) * spacingX + spacingX / 2,
                        (j - rows / 2) * spacingY + spacingY / 2,
                        0
                    ] as [number, number, number],
                    text: PHONETIC_DATA[(i + j) % PHONETIC_DATA.length]
                });
            }
        }
        return p;
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-background pointer-events-auto overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ antialias: true, alpha: true }}>
                <color attach="background" args={['#ffffff']} />
                <group>
                    {points.map((pt, i) => (
                        <GridItem key={i} position={pt.position} text={pt.text} />
                    ))}
                </group>
                <ambientLight intensity={1} />
            </Canvas>

            {/* Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none opacity-50" />
        </div>
    );
}

export default IPAGrid;
