public class App {

  public static void main(String[] args) throws Exception {
    System.out.println(new ComparisonCompactorOriginal(1, "abcde", "abfde").compact(null));
    System.out.println(new ComparisonCompactorOriginal(0, "abc", "adc").compact(null));
  }
}
