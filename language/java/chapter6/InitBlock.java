package chapter6;

// 명시적 초기화 이후 초기화 블럭 실행
// 따라서 10 이후 3 출력
public class InitBlock {
    static int a = 10;
    final static int b;
    static {
        System.out.println(a);
        a = 3;
        // 생성자 말고 초기화 블럭에서도 초기화할 수 있다. 
        b = 10;
    }

    public static void main(String[] args) {
        System.out.println(a);
    }
}
