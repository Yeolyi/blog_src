function getArea(shape) {
  if (shape.kind === "circle") {
    // shape: Circle
    return Math.PI * Math.pow(shape.radius, 2);
  }
}
