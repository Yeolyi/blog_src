package chapter7;

public class StaticMethodTest {
    public static void main(String[] args) {
        MyClass x = new MyClass();
        MyInterface.method();
        x.method(); // The method method() is undefined for the type MyClass
    }
}

class MyClass implements MyInterface {

}

interface MyInterface {
    static void method() {
    }
}
