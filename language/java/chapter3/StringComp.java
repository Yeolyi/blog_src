package chapter3;
public class StringComp {
    public static void main(String[] args) {
        String str1 = "abc";
        String str2 = new String("abc");
        System.out.println(str1 == "abc"); // true
        System.out.println("abc" == "abc"); // true
        System.out.println(str1 == str2); // false
        // String과 string 차이 그런 느낌인가?
    }
}
