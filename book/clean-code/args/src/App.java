import start.Args;
import start.ArgsException;

public class App {

  public static void main(String[] args) throws Exception {
    try {
      Args arg = new Args("l,p#,d*", args);
      // 값이 명시되어있지 않으면 각 marshaler의 getValue에서 사용된 기본값을 반환한다.
      // 이때 에러를 반환하려면 어떻게 해야 할까?
      // 기본값을 사용자가 지정할 수 있게 하려면 어떻게 해야 할까?
      boolean logging = arg.getBoolean('l');
      int port = arg.getInt('p');
      String directory = arg.getString('d');
      System.out.println(logging);
      System.out.println(port);
      System.out.println(directory);
    } catch (ArgsException e) {
      System.out.printf("Argument error: %s\n", e.errorMessage());
    }
  }
}
