import { renderHook, act } from "@testing-library/react";
import { useOstrichInput } from "@/components/game/hooks/useOstrichInput";
import { describe, expect, it } from "vitest";
import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";
import { GameControls } from "@/components/game/core/Game";

const testMap: KeyboardControlsEntry<GameControls>[] = [
  { name: GameControls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: GameControls.back, keys: ["ArrowDown", "KeyS"] },
  { name: GameControls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: GameControls.right, keys: ["ArrowRight", "KeyD"] },
  { name: GameControls.run, keys: ["Shift"] },
];

describe("useOstrichInput Hook", () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <KeyboardControls map={testMap}>{children}</KeyboardControls>
  );

  it("should initialize with isClicking as false", () => {
    const { result } = renderHook(() => useOstrichInput(), {
      wrapper: Wrapper,
    });
    expect(result.current.isClicking).toBe(false);
  });

  /** MOUSE DOWN */

  it("should set isClicking to true on mousedown", () => {
    // Test setup
    const { result } = renderHook(() => useOstrichInput(), {
      wrapper: Wrapper,
    });

    // SImulate browser event on the document
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    // assert the state updated correctly
    expect(result.current.isClicking).toBe(true);
  });

  /** MOUSE UP */

  it('should set isClicking to false on mouseup', () => {
    const { result } = renderHook(() => useOstrichInput(), {
      wrapper: Wrapper,
    });

    // Dispatch mousedown first
    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    // Assert true AFTER mousedown
    expect(result.current.isClicking).toBe(true);

    // NOW dispatch mouseup
    act(() => {
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
    // Assert false AFTER mouseup
    expect(result.current.isClicking).toBe(false);
  });

  // --- Touch Tests ---

  // Helper to create a mock Touch object (you might not need all properties)
  const mockTouch = {
    identifier: Date.now(),
    target: document, // Or specific element if needed
    clientX: 10, clientY: 10,
    screenX: 10, screenY: 10,
    pageX: 10, pageY: 10,
    radiusX: 1, radiusY: 1,
    rotationAngle: 0, force: 0.5
} as Touch; // Cast to Touch type

it('should set isClicking to true on touchstart with one touch', () => {
  const { result } = renderHook(() => useOstrichInput(), { wrapper: Wrapper });

  act(() => {
    // Dispatch touchstart WITH a touches array
    document.dispatchEvent(new TouchEvent('touchstart', {
        bubbles: true,
        touches: [mockTouch] // Provide mock touch data
    }));
  });

  expect(result.current.isClicking).toBe(true);
});

it('should set isClicking to false on touchend when last touch ends', () => {
  const { result } = renderHook(() => useOstrichInput(), { wrapper: Wrapper });

  // Simulate touch start first
  act(() => {
    document.dispatchEvent(new TouchEvent('touchstart', {
        bubbles: true,
        touches: [mockTouch]
    }));
  });
   expect(result.current.isClicking).toBe(true); // Verify start

  // Simulate touchend, providing the removed touch in changedTouches
  // and an empty touches list (assuming last touch ended)
  act(() => {
    document.dispatchEvent(new TouchEvent('touchend', {
        bubbles: true,
        touches: [], // No remaining touches
        changedTouches: [mockTouch] // The touch that was lifted
    }));
  });

  // Assert false only if your hook logic sets it based on touches/changedTouches
  expect(result.current.isClicking).toBe(false);
});
});
