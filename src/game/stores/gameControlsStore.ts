import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

export interface GameControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  setKeyState: (
    key: keyof Omit<GameControlsState, "setKeyState" | "toggleRun">,
    value: boolean
  ) => void;
  toggleRun: () => void;
}

export const gameControlsStore = createStore<GameControlsState>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  run: false,
  setKeyState: (key, value) => set({ [key]: value }),
  toggleRun: () => {
    set((prevState) => {
      return { run: !prevState.run };
    });
  },
}));
