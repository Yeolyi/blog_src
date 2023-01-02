package chapter3;

public class CharOperator {

  public static void main(String[] args) {
    System.out.println('d' - 'a'); // 3
    for (int i = 0; i < 10; i++) {
      // 포매팅하니까 (char) 다음 공백 있는게 신기
      System.out.println((char) (i + 'a')); // a-j
    }
    char c2 = 'a' + 1; // 형변환이 없지만 리터럴간의 연산이기에 컴파일러가 계산해서 문제 없음.
  }
}
