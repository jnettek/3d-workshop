import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshPhysicalMaterial as ThreeMeshPhysicalMaterial } from 'three';
import { Box } from '@react-three/drei';
import { useBox } from '@react-three/cannon';



const RotatingBox = ({position}) => {
    const meshRef = useRef();
    const [ref, api] = useBox(() => ({ mass: 1, position: position }));


    const physicalMaterial = new ThreeMeshPhysicalMaterial({
        color: 'white',
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.7,
    });

    // useFrame(() => {
    //     if (meshRef.current) {
    //         meshRef.current.rotation.x += 0.005;
    //         meshRef.current.rotation.y += 0.005;
    //     }
    // });

    const handlePointerDown = (e) => {
        console.log("Event triggered");
        console.log(e)
        e.object.active = true;
        if (window.activeMesh) {
            scaleDown(window.activeMesh)
            window.activeMesh.active = false;
        } 
        window.activeMesh = e.object; // Set the active mesh
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
        <Box 
        args={[1, 1, 1]} 
        api={api}
        position={position} 
        ref={ref} receiveShadow castShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        >
            <primitive object={physicalMaterial} />
        </Box>
    );
}

export default RotatingBox;