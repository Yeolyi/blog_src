import * as THREE from 'three';
import updateCameraAspect from './util/render.js';
import resizeRendererToDisplaySize from './util/resizeRenderToDisplaysize.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 20);
const scene = new THREE.Scene();

renderer.render(scene, camera);

function render(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    updateCameraAspect(renderer, camera);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
