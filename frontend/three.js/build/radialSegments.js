import * as THREE from 'three';
import updateCameraAspect from './util/render.js';
import resizeRendererToDisplaySize from './util/resizeRenderToDisplaysize.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20);
camera.position.z = 15;

const scene = new THREE.Scene();

const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

const geometry1 = new THREE.ConeGeometry(3, 4, 16);
const cone1 = new THREE.Mesh(geometry1, material);
cone1.position.x = -3.5;
scene.add(cone1);

const geometry2 = new THREE.ConeGeometry(3, 4, 32);
const cone2 = new THREE.Mesh(geometry2, material);
cone2.position.x = 3.5;
scene.add(cone2);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(0, 0, 20);
scene.add(light);

renderer.render(scene, camera);

function render(time) {
  time *= 0.001; // time to second;
  if (resizeRendererToDisplaySize(renderer)) {
    updateCameraAspect(renderer, camera);
  }
  cone1.rotation.y = time / 2;
  cone2.rotation.y = -time / 2;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
