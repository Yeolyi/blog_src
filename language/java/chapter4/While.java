package chapter4;
public class While {
    public static void main(String[] args) {
        int i = 5;
        while (--i != 0) { // i--와 차이는?
            System.out.println(i);
        }
    }
}
