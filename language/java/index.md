---
title: 자바
---

## 자바의 정석

출처: Java의 정석 3rd Edition, 남궁성

### 1. 자바를 시작하기 전에

자바의 가장 중요한 특징은 OS 독립적이라는 것이다.

자바의 연산자와 기본 구문은 C++에서, 객체지향관련 구문은 스몰토크에서 가져왔다.

인터넷과 대규모 분산 환경을 염두에 두어 다양한 네트워크 API가 존재한다.

멀티쓰레드를 기본으로 지원한다. 스케줄링은 자바 인터프리터가 담당한다.

자바는 동적 로딩을 지원하여 필요한 시점에 클래스가 로딩되고 애플리케이션을 일부만 컴파일할 수 있다. JIT?

!@Start.java@!

자바 컴파일러(javac)로 클래스 파일(*.class) 생성 후 자바 인터프리터(java)로 실행. 

자바의 모든 코드는 반드시 클래스 안에 존재한다. 하나의 소스 파일에는 최대 하나의 public class가 존재할 수 있다. *.class는 클래스 당 하나씩 만들어진다. 

### 2. 변수(variable)

> 변수란 단 하나의 값을 저장할 수 있는 메모리 공간이다. 

기본형과 참조형으로 나뉘는데 C와 달리 참조형 변수간의 연산을 할 수는 없다? 아 배열에서 포인터 뺄셈 등?

기본형: boolean, char, byte, short, int, long, float, double

> The size of an int in Java is completely independent of the 32-bitness or 64-bitness of a JDK. It is always 4 bytes = 32 bits = −2,147,483,648 to 2,147,483,647. https://stackoverflow.com/questions/17553183/integer-range-when-using-64bit-jdk

```java
final int MAX_SPEED = 10;
```

[Java에서의 Emoji처리에 대해](https://meetup.toast.com/posts/317)

덧셈 연산자는 피연산자 중 어느 하나가 String이면 나머지를 문자열로 변환해서 결합. 

```java
System.out.println(true + "");
```

!@ScannerEx.java@!

char에 -1은 int값이라고 대입 못함. 

한글 표현 방식에는 확장형과 조합형이 있는데 후자는 사용되지 않고 완성형인 KSC 5601에 없는 글자를 추가한 확장 완성형 CP 949가 사용된다. 한글 윈도우가 사용.

이후 인터넷 통신이 이루어짐에 따라 유니코드개발. UTF-8은 1~4 가변, UTF-16은 2 고정. 자바는 후자. 인터넷은 전송 속도가 중요하므로 UTF-8 많이 사용. 

JVM의 피연산자 스택은 피연산자를 4바이트 단위로 저장한다. 
