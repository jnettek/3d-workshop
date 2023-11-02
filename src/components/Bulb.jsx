import { Sphere } from '@react-three/drei';

const Bulb = () => {
    return (
        <mesh position={[0,6,0]} >
        {/*size of the sphere defines by args */}
        <Sphere args={[0.7, 30, 30]}> 
        <meshStandardMaterial emissive={0xffffeb} />
        </Sphere>
        {/* The light emitted from the bulb */}
        <pointLight castShadow color="yellow" 
        distance={20} 
        intensity={30} 
        decay={2}
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}  />
    </mesh>
    );
} 

export default Bulb;