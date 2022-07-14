import React from 'react';
import ModelViewer from '../utils/ModelViewer';

function Home() {
  return (
    <>
      <ModelViewer
        modelPath={require('../3d/box.open.glb')}
        modelTexture={require('../images/texture.png')}
        action={'ArmatureAction.001'}
        lightIntensity={0.4}
      />
    </>
  );
}

export default Home;
