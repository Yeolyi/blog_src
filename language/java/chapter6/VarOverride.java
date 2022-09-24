package chapter6;

public class VarOverride {
    public static void main(String[] args) {
        YY yy = new YY();
        XX xx = yy;

        yy.printVal(); // 20
        xx.printVal(); // 20

        System.out.println(yy.val); // 20
        System.out.println(xx.val); // 10
    }
}

class XX {
    int val = 10;

    void printVal() {
        System.out.println(val);
    }
}

class YY extends XX {
    int val = 20;

    void printVal() {
        System.out.println(val); // this.val 느낌인가?
    }
}