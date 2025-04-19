import * as THREE from "three";
import { Sizes } from "@/game/Utils/Sizes";
import { Camera } from "@/game/Camera";
import Renderer from "@/game/Renderer";
import { sceneStore } from "@/game/stores/sceneStore";
import type { SceneState } from "@/game/stores/types";
import { Debug } from "@/game/Utils/Debug";
import sources from "@/game/sources";
import { Time } from "@/game/Utils/Time";
import { Resources } from "@/game/Utils/Resources";
import { World } from "@/game/World/World";

declare global {
  interface Window {
    experience: Experience;
  }
}

let instance: Experience | null = null;

export class Experience {
  canvas!: HTMLCanvasElement;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  resources!: Resources;
  camera!: Camera;
  renderer!: Renderer;
  debug!: Debug;
  world!: World;

  constructor(canvas: HTMLCanvasElement | null = null) {
    // Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    // Global access
    window.experience = this;

    // Options
    if (canvas) {
      this.canvas = canvas;
      this.sizes = new Sizes(canvas);
    }

    this.debug = new Debug();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#211d20");
    // @ts-ignore
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    sceneStore.subscribe(
      (state) => state.canvasSize,
      (canvasSize) => {
        this.resize();
      }
    );

    sceneStore.subscribe(
      (state) => state.tick,
      (tick) => {
        this.update();
      }
    );
  }

  resize = () => {
    this.camera.resize();
    this.renderer.resize();
  };

  update = () => {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  };
}
