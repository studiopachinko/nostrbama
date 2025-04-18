import { useAnimations } from "@react-three/drei";
import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { useOstrichAnimations } from "@/components/game/hooks/useOstrichAnimations";

const mockIdleAction = {
  reset: vi.fn(() => mockIdleAction),
  setLoop: vi.fn(() => mockIdleAction),
  play: vi.fn(() => mockIdleAction),
  crossFadeFrom: vi.fn(() => mockIdleAction),
  stop: vi.fn(() => mockIdleAction),
};
const mockRunAction = {
  reset: vi.fn(() => mockRunAction),
  setLoop: vi.fn(() => mockRunAction),
  play: vi.fn(() => mockRunAction),
  crossFadeFrom: vi.fn(() => mockRunAction),
  stop: vi.fn(() => mockRunAction),
};
// add more as needed

vi.mock("@react-three/drei", async (importOriginal) => {
  const original = await importOriginal<typeof import("@react-three/drei")>();

  return {
    ...original, // keep exports from drei
    useAnimations: vi.fn(() => ({
      // return the mock actions when useAnimations is called
      actions: {
        "idle-1": mockIdleAction,
        run: mockRunAction,
        // add other actions as needed
        "invalid-action": undefined,
      },
      mixer: {
        setTime: vi.fn(),
      },
      names: ["idle-1", "run"],
    })),
  };
});

/** TESTS */

describe("useOstrichAnimations hook", () => {
  // Create dummy props needed by the hook
  const mockAnimations: THREE.AnimationClip[] = [];
  const mockScene = new THREE.Group();

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Manually reset the internal state of the mock action functions
    mockIdleAction.reset.mockClear().mockReturnValue(mockIdleAction);
    mockIdleAction.setLoop.mockClear().mockReturnValue(mockIdleAction);
    mockIdleAction.play.mockClear().mockReturnValue(mockIdleAction);
    mockIdleAction.crossFadeFrom.mockClear().mockReturnValue(mockIdleAction);

    mockRunAction.reset.mockClear().mockReturnValue(mockRunAction);
    mockRunAction.setLoop.mockClear().mockReturnValue(mockRunAction);
    mockRunAction.play.mockClear().mockReturnValue(mockRunAction);
    mockRunAction.crossFadeFrom.mockClear().mockReturnValue(mockRunAction);

    // reset other mock actions...
  });

  it("should play the initial action when no action is currently playing", () => {
    // render hook with mock args
    const { result } = renderHook(() =>
      useOstrichAnimations({ animations: mockAnimations, scene: mockScene })
    );

    // Call fadeToAction within act
    act(() => {
      result.current.fadeToAction("run");
    });

    // assertions: check if the correct methods were called on the run action;
    expect(mockRunAction.reset).toHaveBeenCalledTimes(1);
    expect(mockRunAction.setLoop).toHaveBeenCalledWith(
      THREE.LoopRepeat,
      Infinity
    );
    expect(mockRunAction.play).toHaveBeenCalledTimes(1);
    // Should NOT crossfade when starting from null
    expect(mockRunAction.crossFadeFrom).not.toHaveBeenCalled();
    // Ensure idle action wasn't touched
    expect(mockIdleAction.play).not.toHaveBeenCalled();
  });

  it("should crossfade from the current action to the next action", () => {
    const { result } = renderHook(() =>
      useOstrichAnimations({ animations: mockAnimations, scene: mockScene })
    );

    // set initial action to idle-1
    act(() => {
      result.current.fadeToAction("idle-1");
    });

    // clear mocks from initial setup call
    vi.clearAllMocks();

    // now transition to run
    act(() => {
      result.current.fadeToAction("run", 0.25);
    });

    expect(mockRunAction.reset).toHaveBeenCalledTimes(1);
    expect(mockRunAction.setLoop).toHaveBeenCalledWith(
      THREE.LoopRepeat,
      Infinity
    );
    expect(mockRunAction.play).toHaveBeenCalledTimes(1);
    // check it crossfades
    expect(mockRunAction.crossFadeFrom).toHaveBeenCalledTimes(1);
    // check it was crossfaded with correct values
    expect(mockRunAction.crossFadeFrom).toHaveBeenCalledWith(
      mockIdleAction,
      0.25,
      true
    );

    // Ensure the previous action (idle) methods weren't called during the *second* fadeToAction call
    expect(mockIdleAction.reset).not.toHaveBeenCalled();
    expect(mockIdleAction.play).not.toHaveBeenCalled();
  });

  it("should not transition if the requested action is already playing", () => {
    const { result } = renderHook(() =>
      useOstrichAnimations({ animations: mockAnimations, scene: mockScene })
    );

    act(() => {
      result.current.fadeToAction("idle-1");
    });

    vi.clearAllMocks();

    // call fadeToAction with same animation
    act(() => {
      result.current.fadeToAction("idle-1");
    });

    expect(mockIdleAction.reset).not.toHaveBeenCalled();
    expect(mockIdleAction.setLoop).not.toHaveBeenCalled();
    expect(mockIdleAction.play).not.toHaveBeenCalled();
    expect(mockIdleAction.crossFadeFrom).not.toHaveBeenCalled();
  });

  it("should handle invalid action names gracefully", () => {
    const { result } = renderHook(() =>
      useOstrichAnimations({ animations: mockAnimations, scene: mockScene })
    );

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {}); // Spy on console.warn

    // call with invalid-action
    act(() => {
      result.current.fadeToAction("invalid-action");
    });

    expect(mockIdleAction.play).not.toHaveBeenCalled();
    expect(mockRunAction.play).not.toHaveBeenCalled();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Animation action "invalid-action" not found')
    );

    // clean up spy
    consoleWarnSpy.mockRestore();
  });
});
