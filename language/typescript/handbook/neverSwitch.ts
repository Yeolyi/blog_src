function getArea2(shape: Shape) {
    switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

interface Triangle {
    kind: "triangle";
    sideLength: number;
}

// type Shape = Circle | Square | Triangle;
// 위와 같이 바꾸면 switch문에서 에러난다 