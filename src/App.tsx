import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Noodle1 from "./Noodle1";
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import * as THREE from "three";
import Ground from "./Ground";

import Particles from "./Particles";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { Resizer, KernelSize } from "postprocessing";

function App() {
  const mouse = useRef([0, 0]);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const lightRef = useRef();
  const bloomRef = useRef();

  return (
    <div style={{ width: "100%", backgroundColor: "black" }}>
      <div
        id="canvas-container"
        style={{
          height: "100vh",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <Canvas shadows dpr={[1, 2]}>
          <Stats />
          <PerspectiveCamera makeDefault position={[10, 7, -5]} fov={20} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.05}
            enablePan={false}
            maxAzimuthAngle={Math.PI * 0.75} // right
            minAzimuthAngle={Math.PI * 0.4} // left
            minDistance={8}
            maxDistance={15}
            maxPolarAngle={Math.PI * 0.4} // up down
            minPolarAngle={Math.PI * 0.2}
          />
          <spotLight
            ref={lightRef}
            castShadow
            intensity={9.5}
            angle={0.1}
            penumbra={1}
            position={[3, 20, 20]}
            shadow-mapSize-width={1048}
            shadow-mapSize-height={1048}
            shadow-camera-far={500}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />

          <Suspense fallback={<Html>Loading!</Html>}>
            <Noodle1 ref={bloomRef} />
            <Environment preset="sunset" />

            <Particles count={isMobile ? 500 : 3000} mouse={mouse} />
            <Ground />

            <EffectComposer>
              <DepthOfField
                focusDistance={0}
                focalLength={0.025}
                bokehScale={5}
                height={800}
              />
              <Noise opacity={0.015} />
              <Vignette eskil={false} offset={0.1} darkness={0.8} />
              <SelectiveBloom
                lights={[lightRef]} // ⚠️ REQUIRED! all relevant lights
                selection={[bloomRef]} // selection of objects that will have bloom effect
                selectionLayer={5} // selection layer
                intensity={2.0} // The bloom intensity.
                blurPass={undefined} // A blur pass.
                width={Resizer.AUTO_SIZE} // render width
                height={Resizer.AUTO_SIZE} // render height
                kernelSize={KernelSize.SMALL} // blur kernel size
                luminanceThreshold={0.3} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
              />
            </EffectComposer>
          </Suspense>

          <color attach="background" args={["black"]} />
          <fog
            color={"black" as unknown as THREE.Color}
            attach="fog"
            near={8}
            far={23}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
