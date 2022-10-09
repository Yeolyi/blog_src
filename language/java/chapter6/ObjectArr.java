package chapter6;

public class ObjectArr {

  public static void main(String[] args) {
    A[] arr = new A[3];
    System.out.println(arr[0].toString());
    // Exception in thread "main" java.lang.NullPointerException
  }
}

class A {}
