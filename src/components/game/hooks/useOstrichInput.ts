import type { GameControls } from "@/components/game/core/Game";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export function useOstrichInput() {
  const [, getKeys] = useKeyboardControls<GameControls>();

 

  return {
    keys: getKeys,
  };
}
