import { create } from "zustand";

// Define the interface for the store's state and actions
interface GamepadState {
  gamepad: Gamepad | null | {}; // Use Gamepad | null if it can be null, or {} if it starts empty
  buttons: readonly GamepadButton[]; // Represents the actual button objects (read-only from API)
  buttonsCache: boolean[];        // Cache of previous pressed states? (Assuming boolean)
  buttonsState: boolean[];        // Current pressed states? (Assuming boolean)
  buttonsStatus: boolean[];       // Another representation of pressed states? (Assuming boolean)
  axesStatus: number[];           // Array of axis values (numbers)

  // Define the types for the actions/functions in the store
  addGamepad: (gamepad: Gamepad) => void;
  removeGamepad: (index: number) => void;
  // You might add an 'update' method type here later if you uncomment that logic
  // update: () => void;
}

// Use the interface with Zustand's create function
export const useGamepadStore = create<GamepadState>((set, get) => ({
  gamepad: null, // Initial state - maybe null is better?
  buttons: [],
  buttonsCache: [],
  buttonsState: [],
  buttonsStatus: [],
  axesStatus: [],

  addGamepad: (gamepad) =>
    set(() => {
      console.log(gamepad);
      // Ensure the GamepadButton array is read-only as per the API standard
      const buttonsArray = gamepad.buttons ? Array.from(gamepad.buttons) : [];
      return { gamepad: gamepad, buttons: buttonsArray };
    }),

  removeGamepad: (index) => set(() => ({ gamepad: {}, buttons: [] })), // Also clear buttons when removing

  // Add the 'update' function here later if needed, ensuring it conforms
  // to the 'update: () => void;' type in the interface.

}));

// Example Usage (in a component):
// const { gamepad, axesStatus, addGamepad } = useGamepadStore();
// const firstAxis = axesStatus[0]; // TypeScript knows this is a number