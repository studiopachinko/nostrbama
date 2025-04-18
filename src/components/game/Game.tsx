import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "@/components/game/Experience";
import Controls from "@/components/game/Controls";
import "./index.css";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

export default function Game() {
  return (
    <KeyboardControls map={controlsMap}>
      <Leva collapsed />
      <Canvas
        shadows
        camera={{ fov: 45, near: 0.1, far: 200, position: [2.5, 4, 6] }}
        className="aspect-square rounded-2xl"
      >
        <Controls />
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}
