import java.util.*;

public class ScannerEx {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    // Resource leak: 'scanner' is never closed
    String input = scanner.nextLine();
    int num = Integer.parseInt(input);
    System.out.print(num);
  }
}
