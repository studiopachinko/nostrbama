import { Experience } from "@/game/Experience";
import type RAPIER from "@dimforge/rapier3d";
import * as THREE from "three";
export class RapierDebugRenderer {
  experience: Experience;
  scene: THREE.Scene;
  mesh: THREE.LineSegments;
  world: RAPIER.World;
  enabled: boolean = true;

  constructor() {
    this.experience = new Experience();
    this.world = this.experience.physicsWorld;
    this.scene = this.experience.scene
    this.mesh = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xffffff, vertexColors: true })
    );
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  update() {
    if (this.enabled) {
      const { vertices, colors } = this.world.debugRender();
      this.mesh.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      this.mesh.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 4)
      );
      this.mesh.visible = true;
    } else {
      this.mesh.visible = false;
    }
  }
}
