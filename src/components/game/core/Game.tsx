import { StrictMode, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";
import { Leva } from "leva";
import Experience from "@/components/game/core/Experience";
import Controls from "@/components/game/utils/Controls";

export enum GameControls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  run = "run",
  lightAttack = "lightAttack",
  heavyAttack = "heavyAttack",
}

export default function Game() {
  const controlsMap = useMemo<KeyboardControlsEntry<GameControls>[]>(
    () => [
      { name: GameControls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: GameControls.back, keys: ["ArrowDown", "KeyS"] },
      { name: GameControls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: GameControls.right, keys: ["ArrowRight", "KeyD"] },
      { name: GameControls.run, keys: ["Shift"] },
    ],
    []
  );

  return (
    <StrictMode>
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
    </StrictMode>
  );
}
