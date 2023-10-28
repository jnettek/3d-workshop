
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AxesHelper } from 'three';
import { Suspense } from 'react';
import RotatingBox from './components/RotatingBox';
import Background from './components/Background';
import Floor from './components/Floor';
import ColorPicker from './components/ColorPicker';
import Bulb from './components/Bulb';
import Dragable from './components/Dragable';



function App() {

   const orbitRef = useRef();


    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <ColorPicker />
            <Canvas style={{background: 'black'}}
            camera={{ position: [7,7,7]}} shadowMap>
                <ambientLight intensity={0.2} />
                <Bulb/>
                <Dragable orbitControlsRef={orbitRef}>
                <RotatingBox  position={[-4, 1, 0]} />
                <RotatingBox  position={[4, 1, 0]} />
                </Dragable>
                <Suspense fallback={null}>
                    <Background />
                </Suspense>
                <Floor/>
                <primitive object={new AxesHelper(5)} />
                <OrbitControls ref={orbitRef}/>
            </Canvas>
        </div>
     
    );
}

export default App;
