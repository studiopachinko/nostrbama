import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Resources } from "@/game/Utils/Resources";
import { sceneStore } from "@/game/stores/sceneStore";
import { Floor } from "@/game/World/Floor";
import { Fox } from "@/game/World/Fox";
import { Environment } from "@/game/World/Environment";

export class World {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  floor!: Floor;
  fox!: Fox;
  environment!: Environment;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    if (sceneStore.getState().resourcesLoaded) {
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    }
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
