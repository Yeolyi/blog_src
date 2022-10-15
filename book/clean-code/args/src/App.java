import start.Args;

public class App {

  public static void main(String[] args) throws Exception {
    Args arg = new Args("l", args);
    System.out.println(arg.getBoolean('l'));
  }
}
