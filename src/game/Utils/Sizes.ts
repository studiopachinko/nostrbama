import { sceneStore } from "@/game/stores/sceneStore";

export class Sizes implements Sizes {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;

  constructor(canvas: HTMLCanvasElement) {
    // Setup
    this.canvas = canvas;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Initial store setup
    sceneStore
      .getState()
      .setCanvasSize({ width: this.width, height: this.height });

    window.addEventListener("resize", this.onResize);
  }

  private onResize = () => {
    console.log("onResize fires!");
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    // update on resize
    sceneStore
      .getState()
      .setCanvasSize({ width: this.width, height: this.height });
  };
}
