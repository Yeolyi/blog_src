interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    // shape: Circle
    return Math.PI * shape.radius ** 2;
  }
}
