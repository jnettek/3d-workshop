import { DragControls } from 'three/addons/controls/DragControls.js';
import { useThree, extend } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
extend({ DragControls });

const Dragable = (props) => {
    const groupRef = useRef();
    const { camera, gl } = useThree();

    useEffect(() => {
        const controls = new DragControls(groupRef.current.children, camera, gl.domElement);
        controls.transformGroup = true;  // Enable group transform

        controls.addEventListener('hoveron', () => {
            if (props.orbitControlsRef && props.orbitControlsRef.current) {
                props.orbitControlsRef.current.enabled = false;  // Disable OrbitControls during drag
            }
        });

        controls.addEventListener('hoveroff', () => {
            if (props.orbitControlsRef && props.orbitControlsRef.current) {
                props.orbitControlsRef.current.enabled = true;  // Re-enable OrbitControls after drag
            }
        });

          // Additional functionality during drag operations
        controls.addEventListener('dragstart', e => {
            e.object.api?.mass.set(0);  
            console.log(e.object)
        });

        controls.addEventListener('drag', e => {
            e.object.api?.position.copy(e.object.position);  // Update position during drag
            e.object.api?.velocity.set(0, 0, 0);  // Reset velocity during drag (from tutorial)
        });

        controls.addEventListener('dragend', e => {
            e.object.api?.mass.set(1);  
        });

        return () => {
            controls.dispose();
        };
    }, [camera, gl, props.orbitControlsRef]);

    return (
        <group ref={groupRef}
            >
            {props.children}
        </group>
    );
}


export default Dragable;