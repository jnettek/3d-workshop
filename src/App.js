import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Box, OrbitControls, Sphere } from '@react-three/drei';
import { AxesHelper, MeshPhysicalMaterial as ThreeMeshPhysicalMaterial, TextureLoader, WebGLCubeRenderTarget } from 'three';
import { Suspense } from 'react';
import * as THREE from 'three';
import autoshop from "./asset/autoshop.jpg";




const RotatingBox = () => {
    const meshRef = useRef();

    const physicalMaterial = new ThreeMeshPhysicalMaterial({
        color: 'white',
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
        <Box args={[1, 1, 1]} position={[0, 1, 0]} ref={meshRef} castShadow receiveShadow>
            <primitive object={physicalMaterial} />
        </Box>
    );
}

const Floor = () => {
  return (
    <mesh position={[0, -0.5, 0]} receiveShadow>
    <Box args={[20, 1, 10]} receiveShadow />
    <meshPhysicalMaterial />
  </mesh>
  );
}

const Bulb = () => {
    return (
        <mesh position={[0,4,0]} >
        {/*size of the sphere defines by args */}
        <Sphere args={[0.7, 30, 30]}> 
        <meshStandardMaterial emissive={0xffff00} />
        </Sphere>
        {/* The light emitted from the bulb */}
        <pointLight castShadow color="yellow" 
        distance={10} 
        intensity={30} 
        decay={2}
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}  />
    </mesh>
    );
} 

const Background = () => {
    const { gl } = useThree();
    const texture = useLoader(THREE.TextureLoader, autoshop)
    const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture)

    return (
        <primitive 
        attach='background'
        object={formatted.texture} />
    )
}



function App() {
    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <Canvas style={{background: 'black'}}
            camera={{ position: [3,3,3]}} shadowMap>
                <ambientLight intensity={0.2} />
                <Bulb/>
                <RotatingBox />
                <Suspense fallback={null}>
                    <Background />
                </Suspense>
                <Floor/>
                <primitive object={new AxesHelper(5)} />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
