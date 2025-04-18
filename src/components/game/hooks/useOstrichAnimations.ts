// src/components/game/hooks/useOstrichAnimations.ts
import { useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react"; // Added useEffect, useRef potentially if needed later
import type { AnimationAction, AnimationMixer } from "three"; // Import types
import * as THREE from "three";

interface UseOstrichAnimationsProps {
  animations: THREE.AnimationClip[];
  scene: THREE.Group<THREE.Object3DEventMap>;
}

// Update the return type
interface ReturnType {
  fadeToAction: (actionName: string, duration?: number) => void;
  actions: {
    // Add actions
    [key: string]: AnimationAction | null; // Be more specific if possible based on your GLTF names
  };
  mixer: AnimationMixer; // Add mixer
}

export function useOstrichAnimations({
  animations,
  scene,
}: UseOstrichAnimationsProps): ReturnType {
  // Update return type here
  const { mixer, actions, names } = useAnimations(animations, scene); //
  const currentAction = useRef<THREE.AnimationAction | null>(null);

  const fadeToAction = (actionName: string, duration = 0.5) => {
    const nextAction = actions[actionName];
    const current = currentAction.current;

    // Don't transition to the same action or if the action doesn't exist
    if (!nextAction || nextAction.isRunning()) {
      // Optionally log a warning if actionName is invalid but not the current one
      if (current !== nextAction && !actions[actionName]) {
        console.warn(
          `Animation action "${actionName}" not found when trying to fade.`
        );
      }
      return;
    }

    // Reset and play the next action
    nextAction.reset();
    // Decide on loop based on action name (attacks shouldn't loop)
    const loopMode = actionName.includes("attack")
      ? THREE.LoopOnce // Play attacks once
      : THREE.LoopRepeat; // Loop others like idle/run
    nextAction.setLoop(loopMode, Infinity); // Infinity is ignored for LoopOnce
    // nextAction.clampWhenFinished = loopMode === THREE.LoopOnce; // Important for LoopOnce
    nextAction.enabled = true; // Ensure action is enabled

    nextAction.play();

    // Crossfade from the current action if there is one
    if (current) {
      current.crossFadeTo(nextAction, duration, true); // Use crossFadeTo on the *current* action
    }

    currentAction.current = nextAction;
  };

  // Return actions and mixer along with fadeToAction
  return {
    fadeToAction,
    actions, // Return the actions object
    mixer, // Return the mixer
  }; //
}
