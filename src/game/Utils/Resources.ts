import { sceneStore } from "@/game/stores/sceneStore";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

interface Source {
  type: "gltfModel" | "texture" | "cubeTexture";
  path: string;
  name: string;
}

export class Resources {
  sources: Source[];
  items: { [key: string]: any };
  loaders!: { [key: string]: any };
  toLoad: number;
  loaded: number;

  constructor(sources: Source[]) {
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: Source, file: any) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      sceneStore.getState().setResourcesLoaded();
    }
  }
}
