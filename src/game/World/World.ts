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
  sub: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    sceneStore.subscribe(
      (state) => state.resourcesLoaded,
      (resourcesLoaded) => {
        this.load();
      }
    );
  }

  load() {
    this.floor = new Floor();
    this.fox = new Fox();
    this.environment = new Environment();
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
