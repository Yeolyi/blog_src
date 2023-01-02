package chapter7;

public class WrongCast {

  public static void main(String[] args) {
    X x = new X();
    Y y = (Y) x;
    // Exception in thread "main" java.lang.ClassCastException: class chapter6.X
    // cannot be cast to class chapter6.Y (chapter6.X and chapter6.Y are in unnamed
    // module of loader 'app')
    // at chapter6.WrongCast.main(WrongCast.java:6)
    System.out.print(y.toString());

    if (y instanceof Y) {
      // ...
    }
  }
}

class X {}

class Y extends X {}
