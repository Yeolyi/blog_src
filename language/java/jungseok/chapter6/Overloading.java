package chapter6;

class Overloading {

  public static void main(String[] args) {
    System.out.println(add(3, 3));
  }

  static long add(int a, long b) {
    return a + b;
  }
  // 이 함수가 있는 순간 main에서의 함수 호출 유추가 불가능해짐.
  // static long add(long a, int b) {
  //     return a + b;
  // }
}
