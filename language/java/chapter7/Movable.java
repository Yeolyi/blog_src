package chapter7;

interface Movable {
  void move();
}

class Fighter implements Movable {

  // Cannot reduce the visibility of the inherited method from Movable
  // void move() {
  // }
  public void move() {}
}
