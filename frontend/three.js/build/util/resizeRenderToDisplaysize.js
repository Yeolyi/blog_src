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

export default resizeRendererToDisplaySize;
