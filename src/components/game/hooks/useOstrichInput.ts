// src/components/game/hooks/useOstrichInput.ts
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState } from "react"; // Need useState and useEffect
import type { GameControls } from "@/components/game/core/Game";

// Define the return type of the hook
interface OstrichInputState {
    keys: () => Record<GameControls, boolean>; // Keyboard state function
}


export function useOstrichInput(): OstrichInputState { // Update return type
  const [, getKeys] = useKeyboardControls<GameControls>(); // For keyboard

  return {
    keys: getKeys,
  };
}