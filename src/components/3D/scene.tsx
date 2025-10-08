import React, { Dispatch, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BakeShadows, Environment, FlyControls, OrbitControls } from '@react-three/drei';
import CubeComponent from 'components/3D/cube';
import { Block } from 'interfaces/global.interface';

const SceneComponent = (props: { blocks: Block[]; selectGallery: Dispatch<Block> }): React.JSX.Element => {
  const { blocks, selectGallery } = props;
  const cubesPerRow = 3; // Number of cubes per row
  const cubeSize = 5;
  const cubesMargin = 3;

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas camera={{ position: [5, 5, 15], castShadow: true, fov: 90 }}>
        <ambientLight intensity={2} />
        <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[5, 15, 10]} />
        {/*<spotLight intensity={2.5} position={[50, 50, 50]} castShadow />*/}
        <BakeShadows />
        {/*<Environment preset="warehouse" />*/}

        {blocks.map((block, index) => {
          const row = Math.floor(index / 3);
          const col = index % cubesPerRow;
          return (
            <CubeComponent
              key={block.identifier + index}
              position={[col * (cubeSize + cubesMargin), 0, row * (cubeSize + cubesMargin)]}
              selectGallery={selectGallery}
              block={block}
              image={block?.blockHD ?? block.blockThumbnail}
            />
          );
        })}
        {/*<FlyControls movementSpeed={14}   />*/}
        <OrbitControls target={[0, 5,0]} />
      </Canvas>
    </Suspense>
  );
};

export default SceneComponent;
