import { useAnimations } from "@react-three/drei";
import type { ObjectMap } from "@react-three/fiber";
import { useRef } from "react";
import type { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

interface UseOstrichAnimationsProps {
  animations: THREE.AnimationClip[];
  scene: THREE.Group<THREE.Object3DEventMap>; // Or THREE.Group if you know it's always a Group
}

interface ReturnType {
  fadeToAction: (actionName: string, duration?: number) => void;
}

export function useOstrichAnimations({
  animations,
  scene,
}: UseOstrichAnimationsProps): ReturnType {
  const { mixer, actions, names } = useAnimations(animations, scene);

  const currentAction = useRef<THREE.AnimationAction | null>(null);

  // Helper function to handle crossfade
  const fadeToAction = (actionName: string, duration = 0.5) => {
    const nextAction = actions[actionName];

    const current = currentAction.current;

    // Don't crossfade to the action that's already playing
    if (current === nextAction) return;

    if (current) {
      // Fade from current to next
      nextAction?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
      nextAction?.crossFadeFrom(current, duration, true);
    } else if (nextAction) {
      // No current action, just play the next one. This is the initialisation case when Ostrich model is loaded.
      nextAction?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    } else {
      console.warn(
        `Animation action "${actionName}" not found when trying to play.`
      );
    }

    currentAction.current = nextAction ?? null;
  };

  return {
    fadeToAction,
  };
}
