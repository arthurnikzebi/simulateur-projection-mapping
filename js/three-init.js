import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Variables globales
let scene, camera, renderer, controls;
let sceneSide, cameraSide, rendererSide;
let sceneTop, cameraTop, rendererTop;

// Initialisation de Three.js
function initThreeJS() {
    // Configuration de la scène principale
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene-3d'), antialias: true });
    renderer.setSize(document.getElementById('scene-3d').clientWidth, document.getElementById('scene-3d').clientHeight);
    
    // Configuration de la vue de côté
    sceneSide = new THREE.Scene();
    cameraSide = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererSide = new THREE.WebGLRenderer({ canvas: document.getElementById('scene-side'), antialias: true });
    rendererSide.setSize(document.getElementById('scene-side').clientWidth, document.getElementById('scene-side').clientHeight);
    
    // Configuration de la vue du dessus
    sceneTop = new THREE.Scene();
    cameraTop = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererTop = new THREE.WebGLRenderer({ canvas: document.getElementById('scene-top'), antialias: true });
    rendererTop.setSize(document.getElementById('scene-top').clientWidth, document.getElementById('scene-top').clientHeight);

    // Ajout des contrôles OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Positionnement des caméras
    camera.position.set(50, 30, 50);
    cameraSide.position.set(50, 0, 0);
    cameraTop.position.set(0, 50, 0);
    cameraSide.lookAt(0, 0, 0);
    cameraTop.lookAt(0, 0, 0);

    // Ajout d'une grille de référence
    const gridHelper = new THREE.GridHelper(100, 20);
    scene.add(gridHelper);
    sceneSide.add(gridHelper);
    sceneTop.add(gridHelper);

    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    sceneSide.add(ambientLight);
    sceneTop.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    sceneSide.add(directionalLight);
    sceneTop.add(directionalLight);

    // Gestion du redimensionnement
    window.addEventListener('resize', onWindowResize, false);

    // Animation
    animate();
}

// Fonction de redimensionnement
function onWindowResize() {
    const container = document.getElementById('visualisation-3d-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Mise à jour de la scène principale
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width * 0.66, height);

    // Mise à jour de la vue de côté
    cameraSide.aspect = width * 0.33 / (height / 2);
    cameraSide.updateProjectionMatrix();
    rendererSide.setSize(width * 0.33, height / 2);

    // Mise à jour de la vue du dessus
    cameraTop.aspect = width * 0.33 / (height / 2);
    cameraTop.updateProjectionMatrix();
    rendererTop.setSize(width * 0.33, height / 2);
}

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    rendererSide.render(sceneSide, cameraSide);
    rendererTop.render(sceneTop, cameraTop);
}

// Export de la fonction d'initialisation
export { initThreeJS };