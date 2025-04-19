import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Resources } from "@/game/Utils/Resources";
import type { Debug } from "@/game/Utils/Debug";
import GUI from "lil-gui";

export class Environment {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  debug: Debug;
  debugFolder?: GUI;
  sunLight!: THREE.DirectionalLight;
  environmentMap!: {
    intensity: number;
    texture: THREE.Texture;
    updateMaterials: () => void;
  };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight = () => {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.4, 2, -1.24);
    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        ?.add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        ?.add(this.sunLight.position, "x")
        .name("sunlightX")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        ?.add(this.sunLight.position, "y")
        .name("sunlightY")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        ?.add(this.sunLight.position, "z")
        .name("sunlightZ")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  };

  setEnvironmentMap = () => {
    // @ts-ignore
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    if (this.debug.active) {
      // @ts-ignore
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  };
}
