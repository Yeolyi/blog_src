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

/*
  FOV: 화면에 보이는 scene의 정도, degree
  aspect ratio,
  near보다 가깝고 far보다 먼 것은 보이지 않음. 좋은 성능을 위해 조절해야될수도. 
  */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 정육면체의 모든 점(vertices)들과 fill(면?)(faces)를 가짐
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 칠하기 위함.
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// geometry를 받아 material을 적용, scene에 삽입하여 움직일 수 있는 객체
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// 없으면 cube안에 들어가는 듯
camera.position.z = 5;

// render or animate loop로 불림
// 화면이 refresh될 때마다 렌더러에게 그리라고 시키는 루프 (초당 60회 느낌)
// 일반적으로 무언가를 움직이거나 바꾸고 싶으면 animate loop안에 넣는다.
function animate() {
  // setInterval도 있지만 다른 탭으로 갔을 때 일시정지하는 등 이점이 많음.
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
