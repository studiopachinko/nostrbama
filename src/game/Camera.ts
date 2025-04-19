import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Sizes } from "@/game/Utils/Sizes";
import { Time } from "@/game/Utils/Time";

export class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  instance!: THREE.PerspectiveCamera;
  time: Time;

  // --- Isometric Camera Properties ---
  fixedOffset = new THREE.Vector3(10, 12, 10); // Tweak these for angle and distance!

  // Smoothing factor for X/Z movement
  lerpFactor = 0.08;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.setInstance();
  }

  private setInstance = () => {
    this.instance = new THREE.PerspectiveCamera(
      25, // Adjust FOV if needed for isometric feel
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );

    // Set initial position based on offset (relative to world origin 0,0,0 for now)
    this.instance.position.copy(this.fixedOffset);

    // This sets the isometric angle ONCE. We will NOT call lookAt again.
    this.instance.lookAt(new THREE.Vector3(0, 0, 0)); // Look at world origin

    this.scene.add(this.instance);
  };

  resize = () => {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  };

  update = () => {
    const ostrich = this.experience.world?.ostrich;
    if (!ostrich || !ostrich.characterRigidBody) {
      return; // Target not ready
    }

    // Get target's X and Z position (Y is ignored for camera positioning)
    const bodyTranslation = ostrich.characterRigidBody.translation();

    // Calculate the desired camera position
    const desiredCameraPosition = new THREE.Vector3(
      bodyTranslation.x + this.fixedOffset.x, // Target X + Fixed X Offset
      this.fixedOffset.y, // Fixed Y Position (Camera Height)
      bodyTranslation.z + this.fixedOffset.z // Target Z + Fixed Z Offset
    );

    // --- Interpolate Camera Position (X and Z only) ---
    const effectiveLerpFactor =
      1.0 - Math.exp(-this.lerpFactor * this.time.delta * 0.06);

    // Lerp X and Z, keep Y constant
    this.instance.position.x = THREE.MathUtils.lerp(
      this.instance.position.x,
      desiredCameraPosition.x,
      effectiveLerpFactor
    );
    this.instance.position.z = THREE.MathUtils.lerp(
      this.instance.position.z,
      desiredCameraPosition.z,
      effectiveLerpFactor
    );
    // Ensure Y stays fixed (in case of minor lerp inaccuracies if we lerped the whole vector)
    this.instance.position.y = this.fixedOffset.y;
  };
}
