import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Noodle1 from "./Noodle1";
import { Html, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <div id="canvas-container" style={{ height: "100vh" }}>
      <Canvas shadows camera={{ position: [4, 5, 9], fov: 30 }}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          enablePan={false}
        />
        <ambientLight intensity={0.1} />
        <Suspense fallback={<Html>Loading!</Html>}>
          <Noodle1 />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
