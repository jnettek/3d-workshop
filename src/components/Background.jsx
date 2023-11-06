import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import autoshop from "../asset/autoshop.jpg";
import { useMemo } from 'react';

const Background = () => {

    const { gl } = useThree();
    const texture = useLoader(THREE.TextureLoader, autoshop)
    const formatted = useMemo(() => 
    new THREE.WebGLCubeRenderTarget(texture.image.height)
    .fromEquirectangularTexture(gl, texture)
    ,[gl, texture]);
    
    return (
        <primitive 
        attach='background'
        object={formatted.texture} />
    )
}

export default Background;