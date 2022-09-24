package chapter6;

public class StaticVar {
    public static void main(String[] args) {
        (new B()).foo();
    }
}

// A -> B로 변경하기 전에 java.lang.NoClassDefFoundError: 에러 뜸.
// 다른 파일에 같은 클래스 이름이 있으면 안되는건가?
class B {
    int sv;

    void foo() {
        // Swift와 달리 따로 명시하지 않아도 된다.
        System.out.println(sv);
    }
}
