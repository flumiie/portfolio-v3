import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  AnimationClip,
  AnimationMixer,
  Clock,
  GridHelper,
  LoopOnce,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  TextureLoader,
  WebGLRenderer,
} from 'three';

export interface Gltf {
  modelPath: string;
  modelTexture: string;
  action: string;
  scale?: number;
  position?: number[];
}

const GltfModel = ({ scale = 1, position = [0, 0, 0], ...props }: Gltf) => {
  const [wasHover, setHover] = useState(false);

  const ref: any = useRef();
  const gltf = useLoader(GLTFLoader, props.modelPath);

  const scene = new Scene();
  const grid = new GridHelper(30, 30);
  scene.add(grid);

  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 10, 10);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.001));

  let mixer: AnimationMixer;
  const renderer = new WebGLRenderer();
  mixer = new AnimationMixer((gltf as GLTF).scene);
  const clips = gltf.animations;
  const clip = AnimationClip.findByName(clips, props.action);
  const action = mixer.clipAction(clip);
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  renderer.render(scene, camera);

  // Load textures
  var map = new TextureLoader().load(props.modelTexture);
  map.encoding = sRGBEncoding;
  map.flipY = false;

  // Animation Loop
  const clock = new Clock();
  renderer.setAnimationLoop(() => {
    mixer.update(clock.getDelta());
  });

  return (
    <primitive
      ref={ref}
      object={(gltf as GLTF).scene}
      position={position}
      scale={scale}
      onPointerOver={() => {
        if (!action.isRunning() && !wasHover) {
          setHover(true);
          action.stop();
          action.play();
        }
      }}
      onPointerOut={() => {}}
    />
  );
};

export default GltfModel;
