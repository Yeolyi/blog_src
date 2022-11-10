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
