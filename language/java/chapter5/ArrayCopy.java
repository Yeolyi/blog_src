package chapter5;

import java.util.Arrays;

public class ArrayCopy {

  public static void main(String[] args) {
    final int[] arr1 = { 1, 2, 3 };
    final int[] arr2 = new int[6];
    System.arraycopy(arr1, 0, arr2, 0, 3);
    System.arraycopy(arr1, 0, arr2, 3, 3);
    System.out.println(Arrays.toString(arr2)); // [1, 2, 3, 1, 2, 3]
  }
}
