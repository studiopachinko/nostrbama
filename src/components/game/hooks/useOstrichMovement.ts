// src/components/game/hooks/useOstrichMovement.ts
import { useFrame, type RootState } from "@react-three/fiber";
import { vec3, type RapierRigidBody } from "@react-three/rapier";
import type {
  KinematicCharacterController,
  Collider as RapierCollider,
} from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import type { GameControls } from "@/components/game/core/Game";

interface UseOstrichMovementProps {
  getKeys: () => Record<GameControls, boolean>;
  isClicking: boolean;
  // Allow null for the .current property of the refs
  rigidBodyRef: React.RefObject<RapierRigidBody | null>;
  ostrichRef: React.RefObject<THREE.Group | null>;
  collider: React.RefObject<RapierCollider | null>;
  charController: React.RefObject<KinematicCharacterController | null>;
  fadeToAction: (actionName: string, duration?: number) => void;
  cameraLogic: (
    state: RootState,
    ostrichPosition: THREE.Vector3,
    delta: number
  ) => void;
}

export function useOstrichMovement({
  getKeys,
  isClicking,
  rigidBodyRef,
  ostrichRef,
  collider,
  charController,
  fadeToAction,
  cameraLogic,
}: UseOstrichMovementProps): void {
  useFrame((state: RootState, delta: number) => {
    // Get current key state inside the frame loop
    const currentKeys = getKeys();
    const { forward, back, left, right } = currentKeys;

    // Check if refs are ready
    if (
      !rigidBodyRef.current ||
      !ostrichRef.current ||
      !charController.current ||
      !collider.current
    ) {
      return; // Exit if refs aren't ready
    }

    // --- Determine Movement Intent ---
    const isMoving = forward || back || left || right || isClicking;

    if (isMoving) {
      // --- Calculate Movement Vector ---
      try {
        const position = vec3(rigidBodyRef.current.translation()); // Get current position
        const movement = new THREE.Vector3(); // Initialize movement vector

        // Handle keyboard input
        if (forward) movement.z -= 0.1;
        if (back) movement.z += 0.1;
        if (left) movement.x -= 0.1;
        if (right) movement.x += 0.1;

        // Handle pointer input
        if (isClicking) {
          const pointer = state.pointer;
          const MOVEMENT_SCALE = 0.1;
          movement.x += (+pointer.y + pointer.x) * MOVEMENT_SCALE * 0.707;
          movement.z += (-pointer.y + pointer.x) * MOVEMENT_SCALE * 0.707;
        }

        // Normalize and apply downward force if moving
        if (movement.lengthSq() > 1) {
          movement.normalize();
          movement.y = -0.5; // Stop fucking moving this, it puts the bird in the ground
        }

        // --- Apply Rotation ---
        const horizontalMovement = movement.x !== 0 || movement.z !== 0;
        if (horizontalMovement) {
          const angleToTurnTo = Math.atan2(movement.x, movement.z);
          const characterRotation = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            angleToTurnTo
          );
          ostrichRef.current.quaternion.slerp(characterRotation, 0.1); // Adjust lerp factor as needed
        }

        // --- Update Physics ---
        charController.current.computeColliderMovement(
          collider.current,
          movement // Pass the calculated movement vector
        );
        const correctedMovement = charController.current.computedMovement();
        position.add(vec3(correctedMovement));
        rigidBodyRef.current.setNextKinematicTranslation(position);

        // --- Update Animation ---
        fadeToAction("run"); // Trigger run animation
      } catch (err) {
        console.error("Error in movement calculation:", err);
      }
    } else {
      // --- Ostrich is Idle ---
      // No movement input, trigger idle animation
      fadeToAction("idle-1", 0.2);
    }

    // --- Update Camera ---
    // Call cameraLogic AFTER movement calculations and physics update
    // We already checked rigidBodyRef.current exists above
    const ostrichPosition = rigidBodyRef.current.translation();
    cameraLogic(state, vec3(ostrichPosition), delta); // Pass state, position, delta
  }); // End of useFrame
}
