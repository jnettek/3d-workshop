import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Box, OrbitControls, Sphere } from '@react-three/drei';
import { AxesHelper, MeshPhysicalMaterial as ThreeMeshPhysicalMaterial, TextureLoader, WebGLCubeRenderTarget } from 'three';
import { Suspense } from 'react';
import * as THREE from 'three';
import autoshop from "./asset/autoshop.jpg";



//------------------------- BOX //
const RotatingBox = ({position}) => {
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

    const handlePointerDown = (e) => {
        console.log("Event triggered");
        console.log(e)
        e.object.active = true;
        if (window.activeMesh) {
            scaleDown(window.activeMesh)
            window.activeMesh.active = false;
        } 
    }

    const handlePointerEnter = (e) => {
        e.object.scale.x = 1.5
        e.object.scale.y = 1.5
        e.object.scale.z = 1.5
    }

    const handlePointerLeave = (e) => {
        if (!e.object.active) {
           scaleDown(e.object);
        }
    }

    const scaleDown = (object) => {
        object.scale.x = 1
        object.scale.y = 1
        object.scale.z = 1
    }

    return (
        <Box args={[1, 1, 1]} 
        position={position} 
        ref={meshRef} receiveShadow castShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        >
            <primitive object={physicalMaterial} />
        </Box>
    );
}

//----------------------- Floor //

const Floor = () => {
  return (
    <mesh position={[0, -0.5, 0]} receiveShadow>
    <Box args={[20, 1, 10]} receiveShadow />
    <meshPhysicalMaterial receiveShadow={true}/>
  </mesh>
  );
}


//------------------- Light Bulb //

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

//-------------------------- BACKGROUND //

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
    const handleClick = (e) => {
        if (!window.activeMesh) return;
        window.activeMesh.material.color = new THREE.Color(e.target.style.background)
    }
    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <div style={{position: 'absolute', zIndex: 1}}>
                <div
                onClick={handleClick}
                style={{background: 'blue',
                height: 50,
                width: 50
                }}
                ></div>
                   <div
                onClick={handleClick}
                style={{background: 'yellow',
                height: 50,
                width: 50
                }}
                ></div>
                   <div
                onClick={handleClick}
                style={{background: 'white',
                height: 50,
                width: 50
                }}
                ></div>
            </div>
            <Canvas style={{background: 'black'}}
            camera={{ position: [7,7,7]}} shadowMap>
                <ambientLight intensity={0.2} />
                <Bulb/>
                <RotatingBox  position={[-4, 1, 0]} />
                <RotatingBox  position={[4, 1, 0]} />
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
