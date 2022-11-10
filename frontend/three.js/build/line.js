import * as THREE from 'three';
// 무언갈 보이기 위해서는 scene, camera, renderer가 필요하다.
// camera를 통해 scene을 render한다.
const scene = new THREE.Scene();

// WebGL 없는 브라우저를 위한 다른 렌더러도 있음.
const renderer = new THREE.WebGLRenderer();
// 세번째 인자가 false인 채로 반반 크기로 렌더링하면 해상도가 줄음.
// 문서에서는 half resolution인데 quater 아닌가? 0.5 * 0.5 = 0.25..
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);

renderer.render(scene, camera);
