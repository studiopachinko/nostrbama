import type { GameControls } from "@/components/game/core/Game";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export function useOstrichInput() {
  const [, getKeys] = useKeyboardControls<GameControls>();

  const [isClicking, setIsClicking] = useState<boolean>(false);

  useEffect(() => {
    // for pointer controls
    const onPointerDown = (e: PointerEvent | TouchEvent): void => {
      const eventType = e.type;
      let clicking = false;
      if (eventType === "touchstart" && e instanceof TouchEvent) {
        if (e.touches.length === 1) {
          clicking = true;
        }
        if (e.touches.length === 2) {
          // need to handle camera zoom ie pinch
        }
      } else {
        // mousedown event
        clicking = true;
      }
      setIsClicking(clicking);
    };

    const onPointerUp = (e: PointerEvent | TouchEvent): void => {
      const eventType = e.type;
      // Start assuming not clicking after 'up' event
      let clicking = false;
      // For touchend, check changedTouches for the lifted touch
      if (eventType === "touchend" && e instanceof TouchEvent) {
        // Keep clicking true if other touches remain, otherwise false
        clicking = e.touches.length > 0; // Check if any touches *still* active
        // Or, if you only care about *this* touch ending:
        // if (e.changedTouches.length === 1) { clicking = false; } else { clicking = isClicking; } // Needs refinement based on exact goal
      } else if (eventType === "mouseup") {
        clicking = false;
      }
      setIsClicking(clicking);
    };

    document.addEventListener("mousedown", onPointerDown as EventListener);
    document.addEventListener("mouseup", onPointerUp as EventListener);
    document.addEventListener("touchstart", onPointerDown as EventListener);
    document.addEventListener("touchend", onPointerUp as EventListener);

    return () => {
      document.removeEventListener("mousedown", onPointerDown as EventListener);
      document.removeEventListener("mouseup", onPointerUp as EventListener);
      document.removeEventListener(
        "touchstart",
        onPointerDown as EventListener
      );
      document.removeEventListener("touchend", onPointerUp as EventListener);
    };
  }, []);

  return {
    keys: getKeys,
    isClicking: isClicking,
  };
}
