import { useGLTF } from "@react-three/drei";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import type {
  KinematicCharacterController,
  Collider as RapierCollider,
} from "@dimforge/rapier3d-compat";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useOstrichInput } from "@/components/game/hooks/useOstrichInput";
import { useOstrichAnimations } from "@/components/game/hooks/useOstrichAnimations";
import { useFollowCamera } from "@/components/game/hooks/useFollowCamera";
import { useOstrichMovement } from "@/components/game/hooks/useOstrichMovement";

export default function OstrichController(): React.ReactNode {
  const { cameraLogic } = useFollowCamera();
  const ostrich = useGLTF("./game/nla_ostrich--01_1k.glb");
  const { fadeToAction } = useOstrichAnimations({
    animations: ostrich.animations,
    scene: ostrich.scene,
  });

  const ostrichRef = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const collider = useRef<RapierCollider>(null);
  const charController = useRef<KinematicCharacterController>(null);

  // RAPIER SET UP
  const rapier = useRapier();
  useEffect(() => {
    // load initial animation
    fadeToAction("idle-1");

    // set up rapier character controller
    const offsetFromGameWorld = 0.01;
    const c = rapier.world.createCharacterController(offsetFromGameWorld);
    c.setApplyImpulsesToDynamicBodies(true);
    c.enableAutostep(5, 0.1, false);
    c.enableSnapToGround(1);
    charController.current = c;

    return () => {
      if (charController.current) {
        rapier.world.removeCharacterController(charController.current); // Example cleanup
      }
    };
  }, [rapier, fadeToAction]); // Add fadeToAction to dependency array if linting suggests

  const { keys } = useOstrichInput();

  useOstrichMovement({
    getKeys: keys,
    rigidBodyRef,
    ostrichRef,
    collider,
    charController,
    fadeToAction,
    cameraLogic,
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
