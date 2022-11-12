// @ts-nocheck
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { extend } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

const App = () => {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 100,
        position: [0, 0, 5],
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 0]} />
      <OrbitControls enableZoom={false} />
      <Text />
    </Canvas>
  );
};

export default App;

extend({ TextGeometry });

const Text = () => {
  const font = useLoader(FontLoader, 'Pretendard_Bold.json');

  return (
    <mesh
      onUpdate={(self) => {
        const center = getCenterPoint(self);
        self.position.set(-center.x, 0, -center.z);
      }}
    >
      <textGeometry
        args={[
          'yeolyi',
          {
            font,
            size: 1,
            height: 0.5,
            curveSegments: 1,
          },
        ]}
      />
      <Edges />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
};

function getCenterPoint(mesh: Mesh) {
  var geometry = mesh.geometry;
  geometry.computeBoundingBox();
  var center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  mesh.localToWorld(center);
  return center;
}
