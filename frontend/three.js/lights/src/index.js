import * as THREE from 'three';
import updateCameraAspect from '../../build/util/render.js';
import resizeRendererToDisplaySize from '../../build/util/resizeRenderToDisplaysize.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 20);

// Click and drag in the scene to orbit the camera.
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
// call update so the controls will use the new target
controls.update();

const planeSize = 40;

const loader = new THREE.TextureLoader();
const texture = loader.load('checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

// 중괄호 뭔가 했는데 스코프 만드려고 그런듯
{
  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  scene.add(mesh);
}

{
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
  scene.add(mesh);
}
{
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(mesh);
}

// 방향 없음. scene의 모든 것의 색이 바뀌어서 빛같지 않음. 어두운 부분을 밝게 할 때 사용됨.
// const light = new THREE.AmbientLight(0xffffff, 1);

// help give a nice kind of influence of the color of the sky and ground.
// 얘도 다른 애랑 같이 쓰임
// const light = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1);

// target도 추가해줘야한다.
// DirectionalLightHelper란 것도 있다.
//  There is no point the light comes from, it's an infinite plane of light
// shooting out parallel rays of light.
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 10, 0);
// light.target.position.set(-5, 0, 0);
// scene.add(light.target);

// distance는 범위고 intensity는 그 범위 내에서 얼마나 강한지인듯
// const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(0, 10, 0);

const light = new THREE.SpotLight(0xffffff, 1);
scene.add(light.target);

scene.add(light);

// Spotlights are effectively a point light with a cone attached

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light, 'distance', 0, 40);
// blur 느낌
gui.add(light, 'penumbra', 0, 1, 0.01);

// 이거 말고도 RectAreaLight(fluorescent light, frosted sky light 등등 표현)도 있음
// MeshStandardMaterial이랑만 작동함

// physicallyCorrectLights

renderer.render(scene, camera);

function render(time) {
  time *= 0.001; // time to second;
  if (resizeRendererToDisplaySize(renderer)) {
    updateCameraAspect(renderer, camera);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
