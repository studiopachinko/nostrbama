import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Sizes } from "@/game/Utils/Sizes";
import { OrbitControls } from "three-stdlib";
import { sceneStore } from "@/game/stores/sceneStore";
import type { SceneState } from "@/game/stores/types";

export class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  private setInstance = () => {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 0);
    this.scene.add(this.instance);
  };

  private setControls = () => {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  };

  resize = () => {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  };

  update = () => {
    this.controls.update();
  };
}
