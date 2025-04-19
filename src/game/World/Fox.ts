import { Experience } from "@/game/Experience";
import type { Debug } from "@/game/Utils/Debug";
import { Resources } from "@/game/Utils/Resources";
import { Time } from "@/game/Utils/Time";
import GUI from "lil-gui";
import * as THREE from "three";

export class Fox {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  time: Time;
  debug: Debug;
  debugFolder?: GUI;
  model!: THREE.Group;
  animation!: {
    mixer: THREE.AnimationMixer;
    actions: {
      idle: THREE.AnimationAction;
      walking: THREE.AnimationAction;
      running: THREE.AnimationAction;
      current: THREE.AnimationAction;
    };
    play: (name: string) => void;
  };
  resource!: {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

    // Resource
    this.resource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    // @ts-ignore
    this.animation = {};

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Actions
    //@ts-ignore
    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Play the action
    this.animation.play = (name) => {
      // @ts-ignore
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      if (this.debugFolder) {
        this.debugFolder.add(debugObject, "playIdle");
        this.debugFolder.add(debugObject, "playWalking");
        this.debugFolder.add(debugObject, "playRunning");
      }
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
