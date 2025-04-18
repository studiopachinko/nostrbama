import type { RootState } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface useFollowCameraReturnType {
  cameraLogic: (
    state: RootState,
    ostrichPosition: THREE.Vector3,
    delta: number
  ) => void;
}

export function useFollowCamera(): useFollowCameraReturnType {
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 20, 10));
  const smoothedCameraTarget = useRef(new THREE.Vector3());

  const cameraLogic = (
    state: RootState,
    ostrichPosition: THREE.Vector3,
    delta: number
  ) => {
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ostrichPosition);
    cameraPosition.z += 4.25;
    cameraPosition.y += 7;
    cameraPosition.x -= 4;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ostrichPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.current.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.current.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition.current);
    state.camera.lookAt(smoothedCameraTarget.current);
  };

  return { cameraLogic };
}
