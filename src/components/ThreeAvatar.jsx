// src/components/ThreeAvatar.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useTexture } from "@react-three/drei";

const AvatarModel = () => {
  const { scene } = useGLTF("/models/avatar.glb");

  const [colorMap, metalMap, roughMap] = useTexture([
    "/models/texture_diffuse.png",
    "/models/texture_metallic.png",
    "/models/texture_roughness.png",
  ]);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = colorMap;
      child.material.metalnessMap = metalMap;
      child.material.roughnessMap = roughMap;
      child.material.metalness = 1;
      child.material.roughness = 1;
    }
  });

  return <primitive object={scene} scale={2.2} />;
};

const ThreeAvatar = () => (
  <Canvas style={{ height: 400 }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[3, 2, 1]} />
    <Suspense fallback={null}>
      <AvatarModel />
      <Environment preset="studio" />
    </Suspense>
    <OrbitControls enableZoom={false} />
  </Canvas>
);

export default ThreeAvatar;
