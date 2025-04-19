import { Experience } from "@/game/Experience";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;
if (!canvas) throw new Error("Canvas element not found");
const experience = new Experience(canvas);
