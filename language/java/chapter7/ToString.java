package chapter7;

class ToString {
    // 자동완성쓰니 여기에 @override 이런게 삽입됨.
    public String toString() {
        return "Hello, world!";
    }
}

class ToStringTest {
    public static void main(String[] args) {
        System.out.println(new ToString()); // Hello, world!
    }
}
