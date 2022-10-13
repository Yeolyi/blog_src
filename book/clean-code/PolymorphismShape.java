class Point {}

// 새 도형을 추가해도 기존 함수에 전혀 영향이 없지만,
// 새 함수를 추가하고 싶다면 도형 클래스 전부를 고쳐야 한다.
// VISITOR / Dual-Patch와 같은 기법을 사용할 수 있지만 대가가 따른다.
// 위에 두 개는 공부해보기!
interface Shape {
  double area();
}

class Square implements Shape {

  // 절차지향적인 코드와 다르게 private이 가능하다.
  private double side;

  Square(double side) {
    this.side = side;
  }

  public double area() {
    return side * side;
  }
}

class PolymorphismShape {

  public static void main(String[] args) {
    Shape shape = new Square(10);
    System.out.println(shape.area());
  }
}
