import * as THREE from "three";
import { Experience } from "@/game/Experience";
import type { Resources } from "@/game/Utils/Resources";
import RAPIER from "@dimforge/rapier3d"; // Import Rapier

export class Floor {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  geometry!: THREE.PlaneGeometry;
  textures!: {
    color: any;
    normal: any;
  };
  material!: THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh;
  rapierRigidBody!: RAPIER.RigidBody; // Add Rapier rigid body property

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(200, 200);
  }

  setTextures() {
    // @ts-ignore
    this.textures = {};

    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1000, 1000);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.color.repeat.set(0.001, 0.001);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  setPhysics() {
    // Get the physics world from the experience instance
    const physicsWorld = this.experience.physicsWorld;

    // Create a rigid body descriptor for a static body
    const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    ); // Position physics body to match mesh

    // Create a collider descriptor.
    // Since the Three.js floor is a CircleGeometry rotated,
    // we can approximate it with a thin cuboid collider for simplicity
    // positioned at the same height. Adjust the size (10, 0.1, 10) to match your floor size.
    const colliderDesc = RAPIER.ColliderDesc.cuboid(5, 0.05, 5); // half-extents of the cuboid (x, y, z)

    // Create the rigid body and collider in the physics world
    this.rapierRigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
    physicsWorld.createCollider(colliderDesc, this.rapierRigidBody);
  }
}
