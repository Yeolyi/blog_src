import * as THREE from 'three';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  // Those four settings define a "frustum". A frustum is the name of a 3d shape that is like a pyramid with the tip sliced off.
  // The height of the near and far planes are determined by the field of view. The width of both planes is determined by the field of view and the aspect.
  // 대부문의 각은 라디안 단위를 사용하지만 모종의 이유로 여기서는 도을 사용한다.
  // fov는 vertical!!! v가 view지만 vertical이라고 외워도 될 듯.
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  // 얘는 단위가 뭘까? 딱히 없나. 길이에 단위가 없는 것 같기도.
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // setZ와 차이점은?
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const makeCubeInstance = (geometry, color, x) => {
    // 이름에 Mesh있는데 material임
    // MeshBasicMaterial은 빛에 영향을 받지 않는다.
    const material = new THREE.MeshPhongMaterial({ color });
    // 부모와 상대적으로 위치, 방향, 스케일도 지정할 수 있다.
    // 이 경우 부모는 scene
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  };

  const cubes = [
    makeCubeInstance(geometry, 0x44aa88, 0),
    makeCubeInstance(geometry, 0x8844aa, -2),
    makeCubeInstance(geometry, 0xaa8844, 2),
  ];

  // 광원 추가
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  renderer.render(scene, camera);
  // 근데 예시 사진에서도 "/", "./"로 시작안한다고 뭐라하네 뭐냐

  function render(time) {
    time *= 0.001; // time to second;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // time이 항상 일정하지는 않으니까 cube.js에서 한 것보다 이게 더 정확한듯
    // 여긴 라디안. 2pi초에 한바퀴니까 6.28초에 한바퀴.
    // cube.rotation.x = time;

    // 왜 ndx?
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    // requestAnimationFrame passes the time since the page loaded to our function.
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// They are also somewhat exaggeratedly warped since the field of view across the canvas is so extreme.

main();

const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = canvas.clientWidth * pixelRatio;
  const height = canvas.clientHeight * pixelRatio;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    // 세번째 안주면 CSS를 바꿔버림.
    // 세번째에 undefined 주면 CSS를 바꿔버리는 듯?
    renderer.setSize(width, height, false);
  }
  return needResize;
};
