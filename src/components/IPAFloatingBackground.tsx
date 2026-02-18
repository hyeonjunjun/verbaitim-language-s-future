import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const IPA_SYMBOLS = [
  'ə', 'ʃ', 'θ', 'ŋ', 'ʒ', 'dʒ', 'tʃ', 'ð',
  'b', 'd', 'g', 'p', 't', 'k', 'm', 'n',
  'æ', 'ɑ', 'ɛ', 'ɪ', 'i', 'ɔ', 'u', 'ʊ', 'ʌ'
];

const FloatingSymbol = ({ symbol, ...props }: { symbol: string;[key: string]: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Random slight rotation or movement could be added here if needed beyond Float

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.2, 0.2]}
    >
      <Text
        ref={meshRef}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.15} // Adjusted for subtle background effect
        {...props}
      >
        {symbol}
      </Text>
    </Float>
  );
};

const IPAFloatingBackground = () => {
  const symbols = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      symbol: IPA_SYMBOLS[Math.floor(Math.random() * IPA_SYMBOLS.length)],
      position: [
        (Math.random() - 0.5) * 15, // Spread across x
        (Math.random() - 0.5) * 10, // Spread across y
        (Math.random() - 0.5) * 5 - 2 // Spread across z, pushed back slightly
      ] as [number, number, number],
      rotation: [
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      ] as [number, number, number],
      scale: 0.8 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {symbols.map((item) => (
            <FloatingSymbol
              key={item.id}
              symbol={item.symbol}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IPAFloatingBackground;
