import { useTexture } from '@react-three/drei';
import { Block } from 'interfaces/global.interface';

type CubeProps = {
  position: [number, number, number];
  image: string;
  block?: Block;
  selectGallery?: (value: Block) => void;
};

const CubeComponent = ({ position, image, block, selectGallery }: CubeProps) => {
  const texture = useTexture(image);

  return (
    <mesh position={position} onClick={() => selectGallery(block)}>
      <boxGeometry args={[5,5,5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default CubeComponent;
