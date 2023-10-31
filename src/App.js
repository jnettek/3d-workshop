
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AxesHelper } from 'three';
import { Suspense } from 'react';
import { Physics } from '@react-three/cannon';
// import RotatingBox from './components/RotatingBox';
import Background from './components/Background';
import Floor from './components/Floor';
import ColorPicker from './components/ColorPicker';
import Bulb from './components/Bulb';
import Dragable from './components/Dragable';
import Model from './components/Model';
import BoundingBox from './components/BoundingBox';





function App() {

   const orbitRef = useRef();


    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <ColorPicker />
            <Canvas style={{background: 'black'}}
            camera={{ position: [7,7,7]}} shadowMap>
                <ambientLight intensity={0.2} />
                <Physics>
                <Bulb/>
                <Suspense fallback={null}>
                <Dragable orbitControlsRef={orbitRef}>
                <BoundingBox visible 
                position={[-4,4,0]}
                dims={[2,1.5,5]}>
                    <Model 
                    path='/tesla_2018_model_3/scene.gltf'
                    scale={new Array(3).fill(0.01)}
                    
                    />
                </BoundingBox>
                </Dragable>
                </Suspense>
                <Suspense fallback={null}>
                    <Dragable orbitControlsRef={orbitRef}p>
                        <BoundingBox visible
                        position={[4,4,0]}
                        dims={[2,1,5]}
                        offset={[-0.1,-0.5,-0.5]}
                        >
                            <Model 
                            path='/tesla_model_y/scene.gltf'
                            scale={new Array(3).fill(0.01)}
                            />
                </BoundingBox>
                    </Dragable>
                </Suspense>
                <Suspense fallback={null}>
                    <Background />
                </Suspense>
                <Floor/>
                </Physics>
                <primitive object={new AxesHelper(5)} />
                <OrbitControls ref={orbitRef}/>
            </Canvas>
        </div>
     
    );
}

export default App;
