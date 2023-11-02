import { useFrame } from '@react-three/fiber';
import state from "../state";
import * as THREE from 'three'



const CameraControls = ({ orbitRef }) => {

        const vec = new THREE.Vector3();

        useFrame(({ camera, scene }) => {
            if (state.activeMesh.name !== state.activeMeshName) {
                state.activeMesh =scene.getObjectByName(
                    state.activeMeshName
                ) || {}
            }
            if (state.shouldUpdate)
            camera.position.lerp(vec.set(...state.cameraPos),0.1);
            orbitRef.current.target.lerp(state.target,0.1) 
            orbitRef.current.update();
            
        const diff = camera.position.clone().sub(state.cameraPos).length();
        if (diff < 0.1) state.shouldUpdate = false;
        });
    
        return null;
    }


export default CameraControls;