import { Box } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const Floor = (props) => {
  const [ref, api] = useBox(()=>({mass: 0, args: [20,1,10], ...props}))
    return (
      <Box ref={ref} args={[20, 1, 10]} receiveShadow >
      <meshPhysicalMaterial receiveShadow={true}/>
      </Box>
    );
  }

export default Floor;