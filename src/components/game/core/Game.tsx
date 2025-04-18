import { StrictMode, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";
import { Leva } from "leva";
import Experience from "@/components/game/core/Experience";
import Controls from "@/components/game/utils/Controls";
import useGameStore from "@/components/game/stores/useGame";

export enum GameControls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  run = "run",
  attackLight = "attackLight",
  attackHeavy = "attackHeavy",
}

export default function Game() {
  const controlsMap = useMemo<KeyboardControlsEntry<GameControls>[]>(
    () => [
      { name: GameControls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: GameControls.back, keys: ["ArrowDown", "KeyS"] },
      { name: GameControls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: GameControls.right, keys: ["ArrowRight", "KeyD"] },
      { name: GameControls.run, keys: ["Shift"] },
      { name: GameControls.attackLight, keys: ["KeyE"] },
      { name: GameControls.attackHeavy, keys: ["KeyR"] },
    ],
    []
  );

  const setCanvas = useGameStore((state) => state.setCanvas);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
      console.log("Canvas ref set in Zustand");
    }

    return () => {
      setCanvas(null);
      console.log("Canvas reference removed from Zustand.");
    };
  }, [setCanvas]);

  return (
    <StrictMode>
      <KeyboardControls map={controlsMap}>
        <Leva collapsed />
        <Canvas
          shadows
          camera={{ fov: 45, near: 0.1, far: 200, position: [2.5, 4, 6] }}
          className="aspect-square rounded-2xl"
          ref={canvasRef}
        >
          <Controls />
          <Experience />
        </Canvas>
      </KeyboardControls>
    </StrictMode>
  );
}
