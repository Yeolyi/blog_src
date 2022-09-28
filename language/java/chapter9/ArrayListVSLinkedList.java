package chapter9;

import java.util.*;
import static java.lang.System.out;

public class ArrayListVSLinkedList {
    public static void main(String[] args) {
        ArrayList<Number> al = new ArrayList<Number>(2000000);
        LinkedList<Number> ll = new LinkedList<Number>();

        // 순차적으로 추가
        out.println(add1(al));
        out.println(add1(ll));
        // 중간에 추가
        out.println(add2(al));
        out.println(add2(ll));
        // 중간에 삭제
        out.println(remove2(al));
        out.println(remove2(ll));
        // 순차적 삭제
        out.println(remove1(al));
        out.println(remove1(ll));

        // 중간에 추가/삭제는 연결 리스트가 확실히 빠름. 
        // 순차적인건 ArrayList가 빠른데 압도적 차이까지는 아닌 느낌?
    }

    public static long add1(List<Number> list) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 1000000; i++)
            list.add(i);
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long add2(List<Number> list) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++)
            list.add(500, i);
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long remove1(List<Number> list) {
        long start = System.currentTimeMillis();
        for (int i = list.size() - 1; i >= 0; i--)
            list.remove(i);
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long remove2(List<Number> list) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++)
            list.remove(i);
        long end = System.currentTimeMillis();
        return end - start;
    }
}
