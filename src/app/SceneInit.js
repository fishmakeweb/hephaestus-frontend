import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default class SceneInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.canvasId = canvasId;
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "/glencairn_expressway_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.flipY = false;
        texture.premultiplyAlpha = false;
        this.scene.environment = texture;
      }
    );

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.directionalLight.position.set(1, 2, 3);
    this.scene.add(this.directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    fillLight.position.set(-1, 1, 2);
    this.scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, -1, -1);
    this.scene.add(backLight);

    const canvas = document.getElementById(this.canvasId);
    if (!canvas) {
      console.error("Canvas not found:", this.canvasId);
      return;
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.setClearColor(0x00001a);
    // this.renderer.setClearColor(0xDDDDE1);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
      this.animateCamera();
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  animateCamera() {
    const startPosition = new THREE.Vector3(100, 0, 150);
    const targetPosition = new THREE.Vector3(450, 400, 500);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    const duration = 2000;
    const startTime = Date.now();

    const animateStep = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      this.camera.position.lerpVectors(startPosition, targetPosition, t);
      const currentLookAt = new THREE.Vector3().lerpVectors(
        this.camera.position,
        targetLookAt,
        t
      );
      this.controls.target.lerpVectors(this.controls.target, currentLookAt, t);

      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      if (t < 1) {
        requestAnimationFrame(animateStep);
      }
    };

    requestAnimationFrame(animateStep);
  }
  dispose() {
    // Dispose of all materials, geometries, and textures
    this.scene.traverse(object => {
      if (object.isMesh) {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (object.material.isMaterial) {
            this.cleanMaterial(object.material);
          } else {
            // an array of materials
            for (const material of object.material) {
              this.cleanMaterial(material);
            }
          }
        }
      }
    });

    this.renderer.dispose(); // Dispose of the renderer resources
    this.controls.dispose(); // Dispose of controls
    if (this.stats) this.stats.domElement.remove(); // Remove stats from the DOM if present

    // Remove the canvas from the document
    this.renderer.domElement.remove();
  }

  // Helper method to clean materials
  cleanMaterial(material) {
    material.dispose(); // Dispose the material
    // Dispose textures if any
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
  }
}