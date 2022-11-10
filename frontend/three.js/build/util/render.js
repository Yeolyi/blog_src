const updateCameraAspect = (renderer, camera) => {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
};

export default updateCameraAspect;
