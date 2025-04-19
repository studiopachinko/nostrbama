import { sceneStore } from "@/game/stores/sceneStore";

export class Time {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    // update zustand to trigger... something... prob in exp
    sceneStore.getState().setTick();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
