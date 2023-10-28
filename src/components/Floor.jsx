import { Box } from '@react-three/drei';

const Floor = () => {
    return (
      <mesh position={[0, -0.5, 0]} receiveShadow>
      <Box args={[20, 1, 10]} receiveShadow />
      <meshPhysicalMaterial receiveShadow={true}/>
    </mesh>
    );
  }

export default Floor;