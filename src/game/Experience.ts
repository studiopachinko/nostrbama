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

import RAPIER from "@dimforge/rapier3d";
import { RapierDebugRenderer } from "@/game/Utils/RapierDebugRenderer";
import { GameControls } from "@/game/Utils/GameControls";
import type { Ostrich } from "@/game/World/Ostrich";

declare global {
  interface Window {
    experience: Experience;
    RAPIER: typeof RAPIER;
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
  ostrich!: Ostrich;
  gameControls!: GameControls;
  physicsWorld!: RAPIER.World;
  rapierDebugRenderer!: RapierDebugRenderer;
  isWorldReady: boolean = false;

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

    // init Rapier physics world
    const gravity = new RAPIER.Vector3(0.0, -9.81, 0.0);
    this.physicsWorld = new RAPIER.World(gravity);
    window.RAPIER = RAPIER;

    this.rapierDebugRenderer = new RapierDebugRenderer();

    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.ostrich = this.world.ostrich;

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
    if (this.isWorldReady) {
      this.world.update();
      this.physicsWorld.step();
      this.world.syncModels();
      this.rapierDebugRenderer.update();
    }
    this.camera.update();
    this.renderer.update();
  };

  setIsWorldReady() {
    this.isWorldReady = true;
    this.gameControls = new GameControls();
  }
}
