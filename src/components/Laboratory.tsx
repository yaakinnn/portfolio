import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, Environment, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const FloatingBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4);
    meshRef.current.rotation.y = Math.cos(time / 2);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

export const Laboratory = () => {
  return (
    <div className="w-full h-full min-h-[400px] relative bg-black">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status: Experimental</h3>
        <p className="text-sm font-mono text-white/80 tracking-tighter">Liquid_Metal_Rnd_01.obj</p>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <FloatingBlob />
        
        <Environment preset="city" />
        <OrbitControls makeDefault />
        
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.2}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          INTERACT TO MORPH
        </Text>
      </Canvas>
    </div>
  );
};
