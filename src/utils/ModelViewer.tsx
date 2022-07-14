import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GltfModel, { Gltf } from './GltfModel';

interface ModelViewerProps extends Gltf {
  lightIntensity: number;
}

const ModelViewer = ({ position = [0, 0, 0], ...props }: ModelViewerProps) => {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <ambientLight intensity={props.lightIntensity} />
      <spotLight position={[10, 10, 10]} angle={1} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <GltfModel
          modelPath={props.modelPath}
          modelTexture={props.modelTexture}
          action={props.action}
          scale={props.scale}
          position={position}
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
