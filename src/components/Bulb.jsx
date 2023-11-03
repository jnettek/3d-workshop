import { Sphere } from '@react-three/drei';

const Bulb = ({position}) => {
    return (
        <mesh position={position} >
        {/*size of the sphere defines by args */}
        <Sphere args={[0.7, 30, 30]}> 
        <meshStandardMaterial emissive={0xffffeb} />
        </Sphere>
        {/* The light emitted from the bulb */}
        <pointLight castShadow color="white" 
        distance={20} 
        intensity={30} 
        decay={2}
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}  />
    </mesh>
    );
} 

export default Bulb;