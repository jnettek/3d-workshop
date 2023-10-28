import { DragControls } from 'three/addons/controls/DragControls.js';
import { useThree, extend } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
extend({ DragControls });

const Dragable = (props) => {
    const groupRef = useRef();
    const { camera, gl } = useThree();

    useEffect(() => {
        const controls = new DragControls(groupRef.current.children, camera, gl.domElement);

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

        return () => {
            controls.dispose();
        };
    }, [camera, gl, props.orbitControlsRef]);

    return (
        <group ref={groupRef}>
            {props.children}
        </group>
    );
}


export default Dragable;