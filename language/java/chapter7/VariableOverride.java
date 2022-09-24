package chapter7;

import static java.lang.System.out;

// AA INIT
// 10
// 20
class VariableOverride {
    public static void main(String[] args) {
        new BB();
    }
}

class AA {
    int x = 10;

    AA() {
        System.out.println("AA INIT");
    }
}

class BB extends AA {
    int x = 20;

    BB() {
        out.println(super.x); // 10
        out.println(x); // 20
    }
}
