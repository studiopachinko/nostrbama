// src/components/game/hooks/useOstrichCombat.ts
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { AnimationAction, AnimationMixer } from "three";
import type { GameControls } from "@/components/game/core/Game";
import useGameStore from "@/components/game/stores/useGame";

// Update props interface
interface UseOstrichCombatProps {
  getKeys: () => Record<GameControls, boolean>; // Still needed for keyboard alternatives?
  fadeToAction: (actionName: string, duration?: number) => void;
  actions: {
    [key: string]: AnimationAction | null;
  };
  mixer: AnimationMixer;
}

export function useOstrichCombat({
  fadeToAction,
  actions,
  mixer,
}: UseOstrichCombatProps): void {
  const canvas = useGameStore((state) => state.canvas);
  useEffect(() => {
    const strongAttack = () => {
      fadeToAction("attack-2");
    };
    const lightAttack = () => {
      fadeToAction("attack-1");
    };
    if (canvas) {
      canvas.addEventListener("mousedown", (event: MouseEvent) => {
        if (event.button === 0) {
          lightAttack();
        }
        if (event.button === 2) {
          strongAttack();
        }
      });
    }
  }, []);
}
