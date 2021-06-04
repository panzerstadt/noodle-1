import React from "react";
import { Reflector, useTexture } from "@react-three/drei";

const Ground = ({ isLowQuality }) => {
  const [floor] = useTexture(["wall_reflection.jpg"]);
  return (
    <Reflector
      receiveShadow
      resolution={isLowQuality ? 100 : 512}
      args={[20, 20]}
      mirror={1}
      mixBlur={5}
      mixStrength={1}
      rotation={[-Math.PI / 2, 0, 0]}
      blur={[400, 100]}
      position={[-3, -1, 0]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.5}
          roughnessMap={floor}
          // normalMap={normal}
          // normalScale={[1, 1] as unknown as THREE.Vector2}
          {...props}
        />
      )}
    </Reflector>
  );
};

export default Ground;
