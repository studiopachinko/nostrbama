import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Sizes } from "@/game/Utils/Sizes";
import type { Camera } from "@/game/Camera";

export default class Renderer {
  experience: Experience;
  canvas: HTMLCanvasElement;
  sizes: Sizes;
  scene: THREE.Scene;
  camera: Camera;
  instance!: THREE.WebGLRenderer;

  constructor() {
    this.experience = new Experience(); // will be getting the single instance with canvas...?
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  private setInstance = () => {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  };

  resize = () => {
    console.log("we resizing in the renderer");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  };

  update = () => {
    this.instance.render(this.scene, this.camera.instance);
  };
}
