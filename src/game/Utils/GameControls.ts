import { Experience } from "@/game/Experience";
import {
  gameControlsStore,
  type GameControlsState,
} from "@/game/stores/gameControlsStore";
import type { Ostrich } from "@/game/World/Ostrich";

export class GameControls {
  experience: Experience;
  ostrich: Ostrich;

  constructor() {
    // instantiate Ostrich
    this.experience = new Experience();

    const world = this.experience.world;

    this.ostrich = world.ostrich;
    // set up event listeners for keydown events
    this.setKeyboardEventListeners();
    // onKeyDown -> store state in Zustand
    // sub to state
    gameControlsStore.subscribe((state, prevState) => {
      if (state !== prevState) {
        console.log("gameControlsState updated");
        this.setMovement();
      }
    });
  }

  private setKeyboardEventListeners() {
    const keyMap: {
      [code: string]: keyof Omit<
        GameControlsState,
        "setKeyState" | "toggleRun"
      >;
    } = {
      KeyW: "forward",
      KeyS: "backward",
      KeyA: "left",
      KeyD: "right",
      ArrowUp: "forward",
      ArrowDown: "backward",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      const action = keyMap[event.code];

      if (action) {
        gameControlsStore.getState().setKeyState(action, true);
      }

      if (event.code === "ShiftLeft") {
        if (!event.repeat) {
          gameControlsStore.getState().toggleRun();
        }
      }
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      const action = keyMap[event.code];

      if (action) {
        gameControlsStore.getState().setKeyState(action, false);
      }

      if (event.code === "ShiftLeft") {
        gameControlsStore.getState().toggleRun();
      }
    });
  }

  private setMovement() {
    this.ostrich.setMovementDirection();
  }
}
