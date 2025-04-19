import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

export interface SceneState {
  canvasSize: {
    width: number;
    height: number;
  };
  tick: number;
  resourcesLoaded: boolean;
  setCanvasSize: (canvasSize: { width: number; height: number }) => void;
  setTick: () => void;
  setResourcesLoaded: () => void;
}

export const sceneStore = createStore<SceneState>()(
  subscribeWithSelector((set) => ({
    canvasSize: { width: 0, height: 0 },
    tick: 0,
    resourcesLoaded: false,
    setCanvasSize: (canvasSize) => set({ canvasSize }),
    setTick: () => set((state) => ({ tick: state.tick + 1 })),
    setResourcesLoaded: () => set({ resourcesLoaded: true }),
  }))
);
