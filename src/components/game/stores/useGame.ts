import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Define the state structure
interface GameState {
  canvas: HTMLCanvasElement | null; // State to hold the canvas element
  setCanvas: (canvas: HTMLCanvasElement | null) => void; // Action to set it
}

// Create the store
const useGameStore = create<GameState>()(
  subscribeWithSelector((set) => ({
    canvas: null, // Initial state is null
    setCanvas: (canvasElement) => set({ canvas: canvasElement }), // Action implementation
  }))
);

export default useGameStore;
