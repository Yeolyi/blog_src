import * as THREE from 'three';
import updateCameraAspect from './util/render.js';
import resizeRendererToDisplaySize from './util/resizeRenderToDisplaysize.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 50, 0);
// lookAt 전에 카메라의 up이 어딘지 지정해주어야한다???
//stackoverflow.com/questions/34936821/what-effect-does-camera-up-have-in-three-js
camera.up.set(0, 0, 1);
// 전달한 좌표를 바라보게 만든다.
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const objects = [];

const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// A phong material's emissive property is basically the color that will be drawn with no light hitting the surface. Light is added to that color.
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

// emissive가 없으면 반대편이 보이지 않음.
const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
// 도는거 보니까 이렇게 해도 회전 중심은 변하지 않는 듯
earthMesh.position.x = 10;
// 별도의 처리가 없으면 sunMesh의 locale space가 5배이기에 지구가 커진다.
// 이에 위에서 solarSystem 이름의 empty scene graph node를 추가한다.
solarSystem.add(earthMesh);
objects.push(earthMesh);

// point light represents light that emanates from a single point.
const light = new THREE.PointLight(0xffffff, 3);
scene.add(light);

renderer.render(scene, camera);

function render(time) {
  time *= 0.001; // time to second;
  objects.forEach((obj) => {
    obj.rotation.y = time;
  });
  if (resizeRendererToDisplaySize(renderer)) {
    updateCameraAspect(renderer, camera);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
