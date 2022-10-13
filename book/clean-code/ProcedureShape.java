class Point {}

class Square {

  public Point topLeft;
  public double side;
}

class Circle {

  public Point center;
  public double radius;
}

class NoSuchShapeException extends Error {

  NoSuchShapeException() {
    super("존재하지 않는 도형입니다.");
  }
}

// 클래스가 절차적이라 비판할 수 있지만, 둘레 길이를 구하는 perimeter 함수를 추가한다 치면 Geometry 클래스만 변경되면 된다.
// 새로운 도형을 추가하고 싶으면 죄다 바뀌어야한다.
class Geometry {

  static final double PI = 3.14;

  // 책에서는 static 아니었는데 왜였을까
  static double area(Object shape) throws NoSuchShapeException {
    if (shape instanceof Square) {
      Square s = (Square) shape;
      return s.side * s.side;
    } else if (shape instanceof Circle) {
      Circle c = (Circle) shape;
      return PI * c.radius * c.radius;
    } else {
      throw new NoSuchShapeException();
    }
  }
}

class ProcedureShape {

  public static void main(String[] args) {
    Circle circle = new Circle();
    circle.radius = 2;
    System.out.println(Geometry.area(circle));
  }
}
