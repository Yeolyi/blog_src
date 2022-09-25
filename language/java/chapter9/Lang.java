package chapter9;

import static java.lang.System.out;

public class Lang {
    public static void main(String[] args) {
        A a1 = new A(1);
        A a2 = new A(1);
        out.println(a1 == a2); // false
        out.println(a1.equals(a2)); // true
    }
}

class A {
    int id;

    A(int id) {
        this.id = id;
    }

    public boolean equals(Object obj) {
        return (obj instanceof A && ((A) obj).id == id);
    }
}