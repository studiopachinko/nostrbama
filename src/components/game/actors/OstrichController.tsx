import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
  vec3,
  type RapierContext, // Import Rapier context type
  // type RigidBody as RapierRigidBodyType, // Rename Rapier's RigidBody type
} from "@react-three/rapier";
import type {
  KinematicCharacterController,
  Collider as RapierCollider, // Type for the collider ref if accessing its API
} from "@dimforge/rapier3d-compat";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useOstrichInput } from "@/components/game/hooks/useOstrichInput";
import { useOstrichAnimations } from "@/components/game/hooks/useOstrichAnimations";
import { useFollowCamera } from "@/components/game/hooks/useFollowCamera";

const IDLE = 4;
const WALK = 9;
const RUN = 6;
const PECK_ATTACK = 1;
const JUMP_ATTACK = 2;

export default function OstrichController(): React.ReactNode {
  // camera positioning
  const { cameraLogic } = useFollowCamera();

  /** ASSET LOADING */
  const ostrich = useGLTF("./game/nla_ostrich--01_1k.glb");

  /** ANIMATIONS */
  const { fadeToAction } = useOstrichAnimations({
    animations: ostrich.animations,
    scene: ostrich.scene,
  });

  const currentAction = useRef<THREE.AnimationAction | null>(null);
  const ostrichRef = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const collider = useRef<RapierCollider>(null);
  const charController = useRef<KinematicCharacterController>(null);
  // const isClicking = useRef<boolean>(false);

  const rapier = useRapier();
  // const [, getKeys] = useKeyboardControls();
  const { keys, isClicking } = useOstrichInput();

  // RAPIER SET UP
  useEffect(() => {
    // load animation
    fadeToAction("idle-1");

    // set up rapier character controller
    const offsetFromGameWorld = 0.01;
    const c = rapier.world.createCharacterController(offsetFromGameWorld);
    c.setApplyImpulsesToDynamicBodies(true);
    c.enableAutostep(5, 0.1, false);
    c.enableSnapToGround(1);
    charController.current = c;

    return () => {
      if (currentAction.current) {
        fadeToAction("idle-1", 0.1);
      }
    };
  }, []);

  useFrame((state: RootState, delta: number) => {
    const forward = keys().forward;
    const back = keys().back;
    const left = keys().left;
    const right = keys().right;

    if (forward || back || left || right || isClicking) {
      if (forward) {
        console.log("forward pressed", keys);
      }
      try {
        fadeToAction("run");

        // Add null checks for refs accessed inside useFrame
        if (
          !rigidBodyRef.current ||
          !ostrichRef.current ||
          !charController.current ||
          !collider.current
        ) {
          return; // Exit if refs aren't ready
        }

        const position = vec3(rigidBodyRef.current?.translation());
        const movement = new THREE.Vector3();

        // Handle keyboard input
        if (keys().forward) {
          movement.z -= 0.1; // Moving forward in world space
        }
        if (keys().back) {
          movement.z += 0.1;
        }
        if (keys().left) {
          movement.x -= 0.1;
        }
        if (keys().right) {
          movement.x += 0.1;
        }

        // Handle mouse input with isometric transformation
        if (isClicking) {
          const pointer = state.pointer;
          const MOVEMENT_SCALE = 0.1;

          // Transform screen coordinates to world coordinates
          // Using 45-degree rotation for isometric view
          movement.x += (+pointer.y + pointer.x) * MOVEMENT_SCALE * 0.707;
          movement.z += (-pointer.y + pointer.x) * MOVEMENT_SCALE * 0.707;
        }

        // Normalize movement vector if it's longer than 1
        if (movement.lengthSq() > 1) {
          // Use lengthSq for performance
          movement.normalize();
          movement.y = -0.5; // Apply gravity/downward force for snap-to-ground
        }

        // rotate the ostrich to face movement direction
        if (movement.lengthSq() !== 0) {
          const angleToTurnTo = Math.atan2(movement.x, movement.z);
          const characterRotation = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            angleToTurnTo
          );
          ostrichRef.current?.quaternion.slerp(characterRotation, 0.1);
        }

        charController.current?.computeColliderMovement(
          collider.current,
          movement
        );

        const correctedMovement = charController.current.computedMovement();

        position.add(vec3(correctedMovement)); // Make sure vec3() output matches position type
        rigidBodyRef.current.setNextKinematicTranslation(position);
      } catch (err) {
        console.log("Error in movement calculation:", err);
      }
    } else {
      // Ostrich is not moving
      fadeToAction("idle-1", 0.2);
    }

    if (rigidBodyRef.current) {
      const ostrichPosition = rigidBodyRef.current.translation();
      cameraLogic(state, vec3(ostrichPosition), delta);
    }
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      canSleep={false}
      friction={1}
      mass={1}
      linearDamping={10}
      angularDamping={10}
      position={[0, 0, 0]}
      ref={rigidBodyRef}
    >
      <primitive object={ostrich.scene} ref={ostrichRef} />
      <CapsuleCollider args={[1, 0.55]} position={[0, 2, 0]} ref={collider} />
    </RigidBody>
  );
}

// function cameraLogic(
//   state: RootState,
//   ostrichPosition: THREE.Vector3,
//   smoothedCameraTarget: THREE.Vector3,
//   smoothedCameraPosition: THREE.Vector3,
//   delta: number
// ) {
//   const cameraPosition = new THREE.Vector3();
//   cameraPosition.copy(ostrichPosition);
//   cameraPosition.z += 4.25;
//   cameraPosition.y += 7;
//   cameraPosition.x -= 4;

//   const cameraTarget = new THREE.Vector3();
//   cameraTarget.copy(ostrichPosition);
//   cameraTarget.y += 0.25;

//   smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
//   smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

//   state.camera.position.copy(smoothedCameraPosition);
//   state.camera.lookAt(smoothedCameraTarget);
// }
