import { Experience } from "@/game/Experience";
import type { Debug } from "@/game/Utils/Debug";
import { Resources } from "@/game/Utils/Resources";
import { Time } from "@/game/Utils/Time";
import GUI from "lil-gui";
import * as THREE from "three";
import RAPIER, { RigidBody } from "@dimforge/rapier3d"; // Import RigidBody type if needed

export class Ostrich {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  time: Time;
  debug: Debug;
  debugFolder?: GUI;
  model!: THREE.Group;
  animation!: {
    mixer: THREE.AnimationMixer;
    actions: { [key: string]: THREE.AnimationAction };
    current?: THREE.AnimationAction;
    play: (name: string) => void;
  };
  resource!: {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  // --- Physics Properties ---
  physicsWorld!: RAPIER.World; // Reference to the main physics world
  characterController!: RAPIER.KinematicCharacterController;
  characterRigidBody!: RAPIER.RigidBody; // Handle to the kinematic rigid body
  characterCollider!: RAPIER.Collider; // Handle to the character's collider

  // --- Movement State (Example) ---
  moveDirection = new THREE.Vector3(); // Desired movement direction
  speed = 5.0; // Movement speed
  rotationSpeed = 3.0; // Rotation speed
  targetRotation = new THREE.Quaternion(); // Target orientation

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.physicsWorld = this.experience.physicsWorld; // Get physics world

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Ostrich");
    }

    // Resource
    this.resource = this.resources.items.ostrichModel;

    this.setModel();
    this.setAnimation();
    this.setPhysics(); // Initialize physics components
    this.setupDebug(); // Setup debug controls *after* physics
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.set(0, 0, 0); // Start at floor level for physics setup
    // this.model.scale.set(0.02, 0.02, 0.02); // Adjust scale if needed *before* physics
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true; // Often characters should also receive shadows
      }
    });
  }

  setAnimation() {
    // ... your existing animation setup ...
    // Make sure animation names match keys used in play()
    this.animation = {
      mixer: new THREE.AnimationMixer(this.model),
      actions: {},
      play: (name: string) => {},
    };

    // Ensure the animation names match exactly what you use in play()
    this.animation.actions["idle-1"] = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walk = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.run = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    // Find the default idle animation reliably
    const idleAction = this.resource.animations.find((clip) =>
      clip.name.toLowerCase().includes("idle")
    );
    if (idleAction) {
      this.animation.actions.idle = this.animation.mixer.clipAction(idleAction);
      this.animation.actions.current = this.animation.actions.idle;
    } else {
      // Fallback if no idle found (using the first one)
      console.warn(
        "Could not find idle animation named 'idle'. Using first animation."
      );
      const firstKey = Object.keys(this.animation.actions)[0];
      this.animation.actions.current = this.animation.actions[firstKey];
    }
    this.animation.actions.current?.play(); // Play if an action was found

    this.animation.play = (name: string) => {
      const newAction =
        this.animation.actions[name as keyof typeof this.animation.actions];
      const oldAction = this.animation.actions.current;

      if (!newAction || newAction === oldAction) {
        // console.warn(`Animation "${name}" not found or already playing.`);
        return;
      }

      newAction.reset();
      newAction.play();
      // Make crossFade duration configurable or adjust as needed
      if (oldAction) {
        newAction.crossFadeFrom(oldAction, 0.3); // Adjust fade duration (in seconds)
      }

      this.animation.actions.current = newAction;
    };
  }

  setPhysics() {
    // --- 1. Create the Rigid Body ---
    const rigidBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
      .setTranslation(
        this.model.position.x,
        this.model.position.y + 1.0, // Start slightly above ground
        this.model.position.z
      )
      // Lock rotations if you only want translational movement controlled by the character controller
      // Or handle rotation separately based on input
      .lockRotations(); // Optional: Prevents physics from rotating the character unexpectedly

    this.characterRigidBody = this.physicsWorld.createRigidBody(rigidBodyDesc);

    // --- 2. Create the Collider ---
    // Adjust size (halfHeight, radius) to fit your Ostrich model
    const colliderDesc = RAPIER.ColliderDesc.capsule(0.8, 0.4); // Example: 1.6 units tall, 0.8 units wide
    // Optional: Set density, friction, restitution if needed, though less critical for kinematic
    // .setDensity(1.0)
    // .setFriction(0.7)
    // .setRestitution(0.3)
    // Important: Assign physics groups for filtering collisions if needed
    // .setCollisionGroups(YOUR_CHARACTER_GROUP)
    // .setSolverGroups(YOUR_CHARACTER_GROUP)
    // Attach the collider to the rigid body
    this.characterCollider = this.physicsWorld.createCollider(
      colliderDesc,
      this.characterRigidBody // Pass the parent rigid body handle here
    );

    // --- 3. Create the Character Controller ---
    const offset = 0.05; // Skin width or minimum separation distance
    this.characterController =
      this.physicsWorld.createCharacterController(offset);

    // --- Configure Controller Properties (Optional but Recommended) ---
    this.characterController.enableAutostep(
      0.3, // Max step height
      0.1, // Minimum width where steps are detected
      true // Include dynamic bodies when checking for steps
    );
    this.characterController.enableSnapToGround(0.5); // Max distance to snap down to ground
    this.characterController.setApplyImpulsesToDynamicBodies(true); // Push dynamic objects
    this.characterController.setMaxSlopeClimbAngle(
      THREE.MathUtils.degToRad(45)
    ); // Allow climbing slopes up to 45 degrees
    // this.characterController.setMinSlopeSlideAngle(THREE.MathUtils.degToRad(50)); // Start sliding down slopes steeper than 50 degrees

    console.log("Rapier KinematicCharacterController initialized.");
    console.log("Rigid Body Handle:", this.characterRigidBody.handle);
    console.log("Collider Handle:", this.characterCollider.handle);
  }

  setupDebug() {
    if (this.debug.active && this.debugFolder && this.characterController) {
      this.debugFolder.add(this, "speed", 0, 10).name("Move Speed");
      this.debugFolder.add(this, "rotationSpeed", 0, 10).name("Rotation Speed");

      const controllerParams = {
        offset: this.characterController.offset(),
        // Note: Reading autostep params isn't directly exposed in the API after setting
        // You'd need to store the values you set if you want to display them
        snapToGroundDist: this.characterController.snapToGroundDistance() ?? 0, // Handle null case
        maxSlopeClimb: THREE.MathUtils.radToDeg(
          this.characterController.maxSlopeClimbAngle()
        ),
        // minSlopeSlide: THREE.MathUtils.radToDeg(this.characterController.minSlopeSlideAngle()), // If you set it
        applyImpulses: this.characterController.applyImpulsesToDynamicBodies(),
      };
      this.debugFolder
        .add(controllerParams, "offset", 0, 1)
        .name("Ctrl Offset")
        .onChange((value: number) => {
          // Note: Rapier Controller offset cannot be changed after creation.
          console.warn(
            "CharacterController offset cannot be changed after creation."
          );
        });
      this.debugFolder
        .add(controllerParams, "snapToGroundDist", 0, 2)
        .name("Snap Distance")
        .onChange((value: number | null) => {
          this.characterController.enableSnapToGround(value ?? 0); // Re-enable with new value or 0 to disable
        });
      this.debugFolder
        .add(controllerParams, "maxSlopeClimb", 0, 90)
        .name("Max Slope °")
        .onChange((value: number) => {
          this.characterController.setMaxSlopeClimbAngle(
            THREE.MathUtils.degToRad(value)
          );
        });
      this.debugFolder
        .add(controllerParams, "applyImpulses")
        .name("Apply Impulses")
        .onChange((value: boolean) => {
          this.characterController.setApplyImpulsesToDynamicBodies(value);
        });

      // Add animation debug controls
      this.debugFolder
        .add({ playIdle: () => this.animation.play("idle-1") }, "playIdle")
        .name("Play Idle");
      this.debugFolder
        .add({ playWalk: () => this.animation.play("walk") }, "playWalk")
        .name("Play Walk");
      this.debugFolder
        .add({ playRun: () => this.animation.play("run") }, "playRun")
        .name("Play Run");
    }
  }

  // --- Movement Input Handling (Example) ---
  setMovementDirection(
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean
  ) {
    this.moveDirection.set(0, 0, 0); // Reset direction

    if (forward) this.moveDirection.z -= 1;
    if (backward) this.moveDirection.z += 1;
    if (left) this.moveDirection.x -= 1;
    if (right) this.moveDirection.x += 1;

    // Normalize if moving diagonally
    if (this.moveDirection.lengthSq() > 0) {
      this.moveDirection.normalize();
    }

    // --- Animation Control based on movement ---
    if (this.moveDirection.lengthSq() > 0) {
      // Choose walk or run based on speed or a modifier key (Shift)
      // For now, let's assume always walking when moving
      this.animation?.play("walk"); // Or 'run'
    } else {
      this.animation?.play("idle-1"); // Or your specific idle animation name
    }
  }

  update() {
    const dt = this.time.delta * 0.001; // Delta time in seconds

    // --- Calculate Desired Movement ---
    if (
      this.characterController &&
      this.characterRigidBody &&
      this.characterCollider
    ) {
      // 1. Apply gravity (optional, but common)
      // You might want to check if grounded first using characterController.computedGrounded()
      // For simplicity, apply gravity continuously or manage a vertical velocity state
      const gravity = -9.81; // Or your world's gravity
      // Simple gravity application: Add downward displacement to the desired movement
      // A more robust approach involves tracking vertical velocity.
      const desiredDisplacement = this.moveDirection.clone();

      // --- Rotation Handling ---
      if (this.moveDirection.lengthSq() > 0) {
        // Calculate the target rotation based on movement direction
        const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z);
        this.targetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

        // Smoothly interpolate the current rotation towards the target
        const currentRotation = this.characterRigidBody.rotation();
        const threeCurrentRotation = new THREE.Quaternion(
          currentRotation.x,
          currentRotation.y,
          currentRotation.z,
          currentRotation.w
        );
        threeCurrentRotation.slerp(
          this.targetRotation,
          this.rotationSpeed * dt
        );

        // Apply the new rotation to the kinematic body for the *next* frame
        this.characterRigidBody.setNextKinematicRotation(threeCurrentRotation);
      }

      // Apply movement speed and delta time *to the direction vector*
      desiredDisplacement.multiplyScalar(this.speed * dt);

      // Add gravity effect (simple version)
      // desiredDisplacement.y += gravity * dt * dt * 0.5; // d = 1/2 * g * t^2 - very basic
      desiredDisplacement.y += gravity * dt; // More common: treat as velocity change over dt

      // 2. Compute Allowed Movement
      // This is the core function: it checks collisions based on the collider's current
      // position and the desired displacement vector.
      this.characterController.computeColliderMovement(
        this.characterCollider, // The collider to move
        desiredDisplacement // The desired displacement vector {x, y, z}
        // Optional filter arguments: groups, callback
      );

      // 3. Get the Corrected Movement
      // This contains the actual displacement allowed by the physics engine.
      const correctedMovement = this.characterController.computedMovement();
      // correctedMovement is a {x, y, z} vector

      // 4. Apply the Corrected Movement to the Kinematic Body
      const currentPosition = this.characterRigidBody.translation();
      const nextPosition = {
        x: currentPosition.x + correctedMovement.x,
        y: currentPosition.y + correctedMovement.y,
        z: currentPosition.z + correctedMovement.z,
      };

      this.characterRigidBody.setNextKinematicTranslation(nextPosition);

      // --- Ground Check (Example Usage) ---
      const isGrounded = this.characterController.computedGrounded();
      // You can use 'isGrounded' for logic like:
      // - Allowing jumps only when grounded
      // - Playing landing animations
      // - Applying different friction when grounded vs airborne
      // if (isGrounded) { console.log("Character is grounded"); }

      // --- Update Three.js Model ---
      // This should ideally happen *after* the physics world step (`world.step()`)
      // in your main game loop (e.g., in Experience.ts update).
      // Here, we prepare the data, but the actual sync happens later.
      // For now, we'll put the sync here for simplicity, assuming update() is called before world.step()
      // but syncModelPosition() is called AFTER world.step().
    }

    // --- Update Animation Mixer ---
    this.animation?.mixer.update(dt);
  }

  // Call this function *after* `physicsWorld.step()` in your main loop
  syncModelPosition() {
    if (this.characterRigidBody && this.model) {
      const rigidBodyPosition = this.characterRigidBody.translation();
      const rigidBodyRotation = this.characterRigidBody.rotation();

      this.model.position.set(
        rigidBodyPosition.x,
        rigidBodyPosition.y,
        rigidBodyPosition.z
      );
      this.model.quaternion.set(
        rigidBodyRotation.x,
        rigidBodyRotation.y,
        rigidBodyRotation.z,
        rigidBodyRotation.w
      );
    }
  }
}
