"use client"
import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import SceneInit from "./SceneInit";

const ThreeScene = () => {
    useEffect(() => {
        const sceneInit = new SceneInit("myThreeJsCanvas");
        sceneInit.initialize();
        const gltfLoader = new GLTFLoader();
        let loadedModel;
        gltfLoader.load(
            "/diamond.gltf",
            (gltfScene) => {
                loadedModel = gltfScene;
                gltfScene.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material.color.set(0xadd8e6);
                        child.material.emissiveIntensity = 1;
                    }
                });
                gltfScene.scene.rotation.y = Math.PI / 8;
                gltfScene.scene.position.set(250, 50, 50);
                gltfScene.scene.scale.set(10, 10, 10);
                sceneInit.scene.add(gltfScene.scene);
            }
        );
        let startTime = Date.now();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsed = Date.now() - startTime;

            if (loadedModel && elapsed < 2000) {
                loadedModel.scene.position.y -= 0.025 * (loadedModel.scene.position.y - 3);
                loadedModel.scene.position.z -= 0.025 * (loadedModel.scene.position.z - 0);
            } else if (loadedModel) {
                loadedModel.scene.position.y = 3; // Final position
                loadedModel.scene.position.z = 0; // Final position
            }

            if (loadedModel) {
                loadedModel.scene.rotation.y += 0.01;
            }
            sceneInit.renderer.render(sceneInit.scene, sceneInit.camera);
            sceneInit.stats.update();
            sceneInit.controls.update();
        };
        animate();
    }, []);

    return (
            <div id="threejs-container">
                <canvas id="myThreeJsCanvas" />
            </div>
    );
};

export default ThreeScene;