import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Resources } from "@/game/Utils/Resources";
import { sceneStore } from "@/game/stores/sceneStore";
import { Floor } from "@/game/World/Floor";
import { Environment } from "@/game/World/Environment";
import { Ostrich } from "@/game/World/Ostrich";

export class World {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  floor!: Floor;
  ostrich!: Ostrich;
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
    this.ostrich = new Ostrich();
    this.environment = new Environment();

    this.experience.setIsWorldReady()
  }

  update() {
    if (this.ostrich) {
      this.ostrich.update();
    }
  }

  syncModels() {
    if (this.ostrich) {
      this.ostrich.syncModelPosition(); // Updates Three.js model from rigid body
    }
    // Sync other physics-driven models here
  }
}
