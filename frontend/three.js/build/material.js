import * as THREE from 'three';
import updateCameraAspect from './util/render.js';
import resizeRendererToDisplaySize from './util/resizeRenderToDisplaysize.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;
const scene = new THREE.Scene();

const circleGeo = new THREE.SphereGeometry(1, 8, 8);

// Basic 제외 빛 없으면 보이지 않음.
const m1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
// computes lighting only at the vertices
const m2 = new THREE.MeshLambertMaterial({ color: 0xffffff });
// supports specular highlights
// shininess를 지정 가능. 기본값 30
// 얘만으로 위에 두개도 구현할 수 있지만 GPU 자원때문에 그러지는 말기
const m3 = new THREE.MeshPhongMaterial({ color: 0xffffff });
const m4 = new THREE.MeshToonMaterial({ color: 0xffffff });

// roughness, metalness
// metalness 설정 안하니까 거기서 거기 같아보이는데
// rough할수록 점토 느낌
const m5 = new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0.2 });
const m6 = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0.2 });
const m7 = new THREE.MeshStandardMaterial({ roughness: 0.2, metalness: 0 });
const m8 = new THREE.MeshStandardMaterial({ roughness: 0.2, metalness: 0.75 });

// The MeshPhysicalMaterial is same as the MeshStandardMaterial
// but it adds a clearcoat parameter that goes from 0 to 1
// for how much to apply a clearcoat gloss layer
// and a clearCoatRoughness parameter that specifies how rough the gloss layer is.

const objects = [];

const addMesh = (material, m, n) => {
  const mesh = new THREE.Mesh(circleGeo, material);
  mesh.position.set(3 * m, 3 * n, 0);
  scene.add(mesh);
  objects.push(mesh);
};

addMesh(m1, -1, 1);
addMesh(m2, 0, 1);
addMesh(m3, 1, 1);
addMesh(m4, -1, 0);
addMesh(m5, 0, 0);
addMesh(m6, 1, 0);
addMesh(m7, -1, -1);
addMesh(m8, 0, -1);

// AmbiendLight로 하니까 그냥 흰색으로 보임.
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.z = 20;

renderer.render(scene, camera);

function render(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    updateCameraAspect(renderer, camera);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);

  time *= 0.001;
  objects.forEach((x) => (x.rotation.y = time));
}
requestAnimationFrame(render);
