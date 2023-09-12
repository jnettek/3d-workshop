import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { AxesHelper, MeshPhysicalMaterial as ThreeMeshPhysicalMaterial, boxBufferGeometry } from 'three';


function RotatingBox() {
    const meshRef = useRef();

    const physicalMaterial = new ThreeMeshPhysicalMaterial({
        color: 'orange',
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.7,
    });

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Box args={[1, 1, 1]} position={[1, 1, 1]} ref={meshRef}>
            <primitive object={physicalMaterial} />
        </Box>
    );
}

function Floor() {
  return (
      <mesh position={[0, -0.5, 0]} receiveShadow>
          <Box args={[10, 1, 10]} />
          <meshPhysicalMaterial color="lightgrey" />
      </mesh>
  );
}

function App() {
    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <Canvas style={{background: 'black'}}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <RotatingBox />
                <Floor/>
                <primitive object={new AxesHelper(5)} />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
