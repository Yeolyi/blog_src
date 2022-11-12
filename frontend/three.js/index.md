---
title: three.js
---

[three.js manual](https://threejs.org/manual/#en/)

## Fundamentals

> Three.js is a 3D library that tries to make it as easy as possible to get 3D content on a webpage.

> WebGL is a very low-level system that only draws points, lines, and triangles.

웹팩 공부가 시급한듯.

> Where possible, we recommend using glTF (GL Transmission Format).

!@build/cube.js@!

!@build/line.js@!

[Libraries and Plugins](https://threejs.org/docs/index.html#manual/en/introduction/Libraries-and-Plugins)

[Cube](./build/cube.html)

[Line](./build/line.html)

> Scene object defines the root of the scenegraph and contains properties like the background color and fog. These objects define a hierarchical parent/child tree like structure and represent where objects appear and how they are oriented.

> Mesh objects represent drawing a specific Geometry with a specific Material.

> Geometry objects represent the vertex data of some piece of geometry like a sphere, cube, plane, etc...

> Material objects represent the surface properties used to draw geometry.

> Texture objects generally represent images

```js
// 뒷쪽에 build/three.module.js를 일관적으로 쓰는게 중요한 듯.
// 다른 js 파일에서 해당 경로에 있는걸 사용해서 한번만 평가?하게 하려면 일관되게.
import * as THREE from '../../../build/three.module.js';
```

## Responsive Design

Making a webpage responsive generally refers to the page displaying well on different sized displays from desktops to tablets to phones.

따로 처리를 안하면 윈도우 크기가 바뀌면 큐브 크기가 바뀐다. 해상도도 낮다.

Canvas 요소는 페이지에서 표시되는 크기(CSS로 설정)와 캔버스 자체의 픽셀 수, 두 가지 크기를 가진다.

캔버스 내부의 크기를 drawingbuffer 크기라 한다.

[helloCube](./build/helloCube.html)

## Primitives

> Primitives are generally 3D shapes that are generated at runtime with a bunch of parameters.

[radialSegments](./build/radialSegments.html)

일반적으로 solid shape는 반대쪽도 그릴 이유가 없다. 그려야되면 Material에 side: THREE.DoubleSide를 설정해준다.

크게 solid gemometry, line geometry, point geometry로 나뉘는 듯.

삼각형 개수를 염두에 두자. 평면을 여러 삼각형으로 나누는건 대부분의 경우 의미가 없다.

## Scene Graph

> A scene graph in a 3D engine is a hierarchy of nodes in a graph where each node represents a local space.

자식 노드는 local space에서 어떻게 움직이는지만 신경쓰면 된다.

[solar system](./build/solarSystem.html)

## Materials

[material](./build/material.html)

## Textures

당장 쓸 일 없을 것 같아 생략

## Lights

여기 예제는 웹팩 배우면 블로그에 올릴 예정

## Cameras

가장 많이쓰는건 PerspectiveCamera. frustum을 정의한다.

scissor function??

near나 far를 너무 작고 크게 설정하면 GPU가 한정된 정확도를 가지기에 이 정확도가 넓은 범위에 퍼지게 된다. **z fighting**이 발생함.

OrthographicCamera는 원근이 없다. 2D를 그릴 때 사용된다.

---

## react-three-fiber

> Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can tap into React's ecosystem.

<mesh/>를 new THREE.Mesh()로 바꿔주는 식.

Canvas 컴포넌트가 Scene과 Camera를 셋업한다. 또한 매 프레임마다 렌더를 해줘서 고전적인 render-loop가 필요하지 않다. 부모 노드에 responsive하게 맞는다.

All three.js objects will be treated as native JSX elements.

```jsx
// Note that every time you change args, the object must be re-constructed!
new THREE.BoxGeometry(2, 2, 2);
<boxGeometry args={[2, 2, 2]} />;

const light = new THREE.DirectionalLight()
light.position.set(0, 0, 5)
light.color.set('red')
<directionalLight position={[0, 0, 5]} color="red" />
```

### Hooks

components that want to participate in the renderloop can use useFrame, components that need to be informed of three.js specifics can use useThree and so on

Context에 의지하므로 Canvas 요소 내부에서 사용해야한다. 