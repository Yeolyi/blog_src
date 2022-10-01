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

자바는 동적 로딩을 지원하여 필요한 시점에 클래스가 로딩되고 애플리케이션을 일부
만 컴파일할 수 있다. JIT?

!@Start.java@!

자바 컴파일러(javac)로 클래스 파일(\*.class) 생성 후 자바 인터프리터(java)로 실
행.

자바의 모든 코드는 반드시 클래스 안에 존재한다. 하나의 소스 파일에는 최대 하나의
public class가 존재할 수 있다. \*.class는 클래스 당 하나씩 만들어진다.

### 2. 변수(variable)

> 변수란 단 하나의 값을 저장할 수 있는 메모리 공간이다.

기본형과 참조형으로 나뉘는데 C와 달리 참조형 변수간의 연산을 할 수는 없다? 아 배
열에서 포인터 뺄셈 등?

기본형: boolean, char, byte, short, int, long, float, double

> The size of an int in Java is completely independent of the 32-bitness or
> 64-bitness of a JDK. It is always 4 bytes = 32 bits = −2,147,483,648 to
> 2,147,483,647.
> https://stackoverflow.com/questions/17553183/integer-range-when-using-64bit-jdk

```java
final int MAX_SPEED = 10;
```

[Java에서의 Emoji처리에 대해](https://meetup.toast.com/posts/317)

덧셈 연산자는 피연산자 중 어느 하나가 String이면 나머지를 문자열로 변환해서 결합
.

```java
System.out.println(true + "");
```

!@ScannerEx.java@!

char에 -1은 int값이라고 대입 못함.

한글 표현 방식에는 확장형과 조합형이 있는데 후자는 사용되지 않고 완성형인 KSC
5601에 없는 글자를 추가한 확장 완성형 CP 949가 사용된다. 한글 윈도우가 사용.

이후 인터넷 통신이 이루어짐에 따라 유니코드개발. UTF-8은 1~4 가변, UTF-16은 2 고
정. 자바는 후자. 인터넷은 전송 속도가 중요하므로 UTF-8 많이 사용.

JVM의 피연산자 스택은 피연산자를 4바이트 단위로 저장한다.

short는 음수가 있고, char는 음수가 없다.

기본형과 참조형간의 형변환은 불가능하다.

부동 소수점 관련해서는 공부해보기~!

형변환을 생략해도 컴파일러가 해준다. 하지만 데이터가 유실될 수 있는 경우 형변환
을 명시해주어야 한다.

> 연산 과정에서 자동적으로 발생하는 형변환을 산술 변환이라고 한다.

### 3. 연산자

부호 연산자와 뺄셈 연산자는 생긴건 같지만 다르다.

쉬프트 연산자는 덧셈 연산자보다 우선순위가 낮다.

비트 연산자는 비교 연산자보다 낮다.

AND가 OR보다 높다.

대입 연산자는 연산자의 결합 규칙이 오른쪽에서 왼쪽이다.

**산술 > 비교 > 논리 > 대입, 단항 > 이항 > 삼항 순서로 진행. 단항과 대입 제외 모
두 왼쪽에서 오른쪽으로 결합.**

int / int = int

!@chapter3/CharOperator.java@!

나머지 연산자에서 나누는 수가 음수이면 해당 음수를 무시하고 나온 결과에 왼쪽 피
연산자의 부호를 붙인다.

float과 double의 비교에서 float -> double 변환을 해도 어차피 같은 값이므로
double -> float 형변환을 해야 한다.

!@chapter3/StringComp.java@!

단축 평가로 인해 같은 조건식이라도 피연산자의 위치에 따라서 연산속도가 달라질 수
있다.

### 4. 조건문과 반복문

> 프로그램의 흐름(flow)를 바꾸는 역할을 하는 문장들을 제어문이라고 한다.

switch문에서 break는 필수. 아래같은 경우가 있긴 하다.

```java
switch (level) {
    case 3:
        grantDelete();
    case 2:
        grantWrite();
    case 1:
        grantRead();
}
```

switch문의 조건식 결과는 반드시 정수/문자열이어야 한다. case문의 값은 정수 상수/
문자열 리터럴만 가능하다.

Switch의 구현은 공부해봐야겠지만 조건식을 한번만 계산하는 듯? switch 테이블 어쩌
구 그건가.

for문: 초기화 -> (조건식 -> 수행될 문들 -> 증감식)

for문에서 % 연산자로 순환, / 연산자로 반복을 할 수 있다.

```java
// enhanced for statement
for (int tmp: arr)
    System.out.println(tmp);
```

!@chapter4/While.java@!

```java
// do while 문은 사용자 입력 받아서 처리할 때 사용될 수 있다.

do {
    // ...
} while (input != answer);
```

### 5. 배열

> 배열은 같은 타입의 여러 변수를 하나의 묶음으로 다루는 것.

배열의 길이는 0일 수도 있다.

배열은 한번 생성하면 길이를 변경할 수 없기에 arr.length는 상수이다.

배열은 생성과 동시에 자동적으로 자신의 타입에 해당하는 기본값으로 초기화된다.

```java
int[] score = new int[5];

int[] score = new int[]{1, 2, 3, 4, 5};
int[] score = {1, 2, 3, 4, 5};
// 이외에 선언과 생성이 별도인 경우와 함수의 매개변수에서는 new 어쩌구를 생략할 수 없다.
```

!@chapter5/ArrPrint.java@!

System.arraycopy는 배열 요소를 한 번에 복사한다.

!@chapter5/ArrayCopy.java@!

참조형 변수의 기본값은 null이다.

> String 클래스는 char배열에 기능(메서드)을 추가한 것이다.

String 객체의 내용을 바꿀 수는 없다. Mutable한 문자열은 StringBuffer 클래스를 사
용한다.

!@chapter5/StringObj.java@!

이전에 말한 길이 0인 배열은 커맨드라인에서 인수가 0개일 때 args값에서 사용된다.

[how-do-i-compare-strings-in-java](https://stackoverflow.com/questions/513832/how-do-i-compare-strings-in-java)

```java
// ... but these are because literals are interned by
// the compiler and thus refer to the same object
"test" == "test" // --> true
```

### 6. 객체지향 프로그래밍 1

1960년대에 객체지향이론을 프로그래밍 언어에 적용한 시뮬라라는 최초의 객체지향언
어가 탄생하였다.

객체는 모든 인스턴스를 대표하는 포괄적인 의미를 가지고, 인스턴스는 어떤 클래스로
부터 만들어진 것인지를 강조하는 보다 구체적인 의미를 가지고 있다.

!@chapter6/ObjectArr.java@!

!@chapter6/StaticVar.java@!

**JVM의 메모리 구조**

메서드 영역: 프로그램 실행 중 어떤 클래스가 사용되면 해당 \*.class 파일을 읽어관
련 정보를 이곳에 저장한다. 클래스 변수도 이 영역에 생성된다.

힙: 인스턴스가 생성되는 공간. 인스턴스 변수들이 생성되는 공간.

호출 스택(call stak, execution stack): 메서드 작업에 필요한 메모리 공간 제공.

[Evaluation_strategy](https://en.wikipedia.org/wiki/Evaluation_strategy)

반복문에 비해 재귀 호출은 메서드 호출에서의 오버헤드, 즉 매개변수 복사와 종료 후
복귀할 주소 저장 등이 추가로 필요하기 때문에 더 오래 걸린다.

main 메서드 역시 자기 자신을 호출하는 것이 가능하다.

멤버 변수는 인스턴스 변수와 static 변수를 통칭하는 말이다.

인스턴스 메서드는 실행 시 호출되어야 할 메서드를 찾는 과정이 추가적으로 필요하기
때문에 시간이 더 걸린다.

Math 클래스의 메서드는 모두 클래스 메서드이다.

> 한 클래스 내에 같은 이름의 메서드를 여러 개 정의하는 것을 메서드 오버로딩 혹은
> 오버로딩이라고 한다.

반환 타입은 오버로딩을 구현하는데 아무런 영향을 주지 못한다.

!@chapter6/Overloading.java@!

가변인자가 선언된 메서드를 호출할 때마다 배열이 새로 생성되는 비효율이 숨어있음
알기.

가능한 가변인자를 사용한 메서드는 오버로딩하지 않는 것이 좋다.

연산자 new가 인스턴스를 생성하는 것이지 생성자가 인스턴스를 생성하는 것이 아니다
.

**인스턴스 생성 과정**

- 연산자 new에 의해 힙에 클래스의 인스턴스가 생성된다.
- 생성자가 호출되어 수행된다.
- 연산자 new의 결과로 생성된 인스턴스의 주소가 반환되어 참조변수에 저장된다.

클래스의 접근 제어자가 public인 경우에는 기본 생성자로 public 클래스이름() {}이
추가된다.

생성자간 호출이 가능하지만 생성자의 이름으로 this를 사용하고 반드시 첫 줄에서 호
출해야한다.

지역변수는 사용하기 전에 반드시 초기화해야한다.

```java
// 이런게 된다.
class A {
    int x;
    int y=x;
}
```

초기화 블럭이라는 개념이 존재.

!@chapter6/InitBlock.java@!

클래스 변수는 클래스가 처음 로딩될 때 한번 초기화되고, 로딩 시점은 JVM 종류에 따
라 클래스가 필요할 때일 수도 있고 프로그램 시작 때 미리 로딩할 수도 있다.

!@chapter6/DocumentTest.java@!

### 7. 객체지향 프로그래밍 2

생성자와 초기화 블럭은 상속되지 않고 멤버만 상속된다.

클래스 간의 관계에서 형제 관계와 같은 것은 없다.

is-a, has-a

!@chapter7/ToString.java@!

override하는데 따로 명시가 필요한 것 같지는 않다.

자바에서는 단일 상속만 허용한다.

Object 클래스는 모든 클래스 상속계층도의 최상위에 있는 조상클래스이다.

**오버라이딩에서 접근 제어자는 좁아질 수 없고, 예외는 많아질 수 없다.**

static 메서드는 오버라이드되지 않고 별도의 메서드가 정의되는 것이다.

> 조상의 멤버와 자신의 멤버를 구별하는데 사용된다는 점을 제외하고는 super와 this
> 는 근본적으로 같다. 모든 인스턴스 메서드는 자신이 속한 인스턴스의 주소가 지역
> 변수로 저장되는데, 이것이 참조변수인 this와 super의 값이 된다,,, 객체지향 구현
> 에 대해 더 찾아보기.

같은 패키지 내에서는 클래스 공유되는 듯?

!@chapter7/VariableOverride.java@!

swift와 달리 자기 클래스 변수 초기화 안하고 첫줄에 조상 클래스의 생성자를 호출한
다. 조상 클래스의 멤버변수는 조상의 생성자를 통해 초기화한다. 없으면 컴파일러가
집어넣는듯.

클래스의 실제 이름은 패키지명을 포함한다. 패키지는 물리적으로 .class를 포함하는
하나의 디렉토리이다. 모든 클래스는 하나의 패키지에 속해야 하며 .을 구분자로 계층
구조로 구성할 수 있다.

VSCode에서 하는데 왜 unnamed package가 안될까?

import문에서의 \*가 하위 패키지의 클래스까지 포함하지는 않는다.

System와 String을 사용할 수 있었던건 import java.lang.\*이 생략되어있었기 때문이
다.

import static을 통해 static 멤버를 사용할 수 있다.

주로 접근제어자를 가장 왼쪽에 놓는다.

WindowAdapter처럼 abstract 메서드가 없어도 클래스에 abstract를 붙일 수 있는데,
이 경우 필요한 것만 구현해서 쓸 수 있다.

private는 같은 클래스 내에서, default는 같은 패키지 내에서, protected는 같은 패
키지 혹은 다른 패키지의 자식 클래스에서, public은 접근 제한이 없다. 클래스는
public과 default만 사용할 수 있다.

default 안에 public 메서드가 가능하네??

하나의 소스파일에는 public 클래스가 단 하나만 존재할 수 있고 소스파일의 이름은
public 클래스의 이름과 같아야 한다.

public 클래스가 없어도 되지만 다른 패키지에서 접근은 불가능한듯.
[what is the difference between `public class` and just `class`?](https://stackoverflow.com/questions/16779245/what-is-the-difference-between-public-class-and-just-class)

생성자가 private인 클래스는 다른 클래스의 조상이 될 수 없으므로 클래스 앞에
final을 붙이는 것이 좋다.

!@chapter7/PrivateInit.java@!

모든 참조변수는 null또는 4byte의 주소값이 저장되며, 참조변수의 타입은 참조할 수
있는 객체의 종류와 사용할 수 있는 멤버의 수를 결정한다.

[Package-private class within a .java file - why is it accessible?](https://stackoverflow.com/questions/7634131/package-private-class-within-a-java-file-why-is-it-accessible)

!@chapter7/WrongCast.java@!

**멤버변수가 조상 클래스와 자손 클래스에 중복으로 정의된 경우, 참조변수의 타입에
따라 접근되는 변수가 달라진다.**

!@chapter7/PrivateInit.java@!

print함수는 다형성을 활용해 toString을 호출하여 작동한다.

Vector는 동적으로 크기가 관리되는 객체 배열이다.

추상 메서드가 없는 완성된 클래스라 할지라도 추상클래스로 지정되면 클래스의 인스
턴스를 생성할 수 없다.

> 추상 메서드를 선언하는 이유는 자식 클래스에서 추상메서드를 반드시 구현하도록강
> 요하기 위해서이다.

> 인터페이스는 추상클래스처럼 추상메서드를 갖지만 추상화 정도가 높아 몸통을 갖춘
> 일반 메서드 또는 멤버변수를 구성원으로 가질 수 없다.

인터페이스의 모든 멤버변수는 public static final이고, 메서드는 static 메서드와디
폴트 메서드 제외 public abstract이어야 한다. 이들은 생략 가능하다.

class -> extends, interface -> implements

인터페이스의 이름에는 주로 -able로 끝나는 것들이 많은데 어떠한 기능 또는 행위를
하는데 필요한 메서드를 제공한다는 의미를 강조하기 위해서이다.

!@chapter7/Movable.java@!

**클래스와 클래스간의 직접적인 관계를 인터페이스를 이용해서 간접적인 관계로 변경
하면, 한 클래스의 변경이 관련된 다른 클래스에 영향을 미치지 않는 독립적인 프로그
래밍이 가능하다.**

Thread(Runnable target)이 인터페이스를 매개변수로 전달받는 형태이고, JDBC의
DriverManager클래스처럼 제3의 클래스를 통해 인스턴스를 제공받을 수도 있다.

JDK1.8부터 static 메서드를 인터페이스에 추가할 수 있었으나, 이전에는 아니어서
Collection관련 static 메서드들은 Collections 클래스에 존재한다.

> 디폴트 메서드는 추상 메서드의 기본적인 구현을 제공하는 메서드로 추상 메서드가
> 아니기 때문에 디폴트 메서드가 새로 추가되어도 해당 인터페이스를 구현한 클래스
> 를 변경하지 않아도 된다.

!@chapter7/StaticMethodTest.java@!

```java
// 내부 클래스 예시
class Outer {
    private class InstanceInner {}
    protected static class StaticInner {}
    void myMethod() {
        // 지역 클래스는 외부 클래스에서 final이 붙은 지역 변수만 접근 가능한데 이는 메서드가 수행을 마쳐서 지역변수가 소멸된 시점에도 지역 클래스의 인스턴스가 소멸된 지역변수를 참조하려는 경우가 있을 수 있기 때문이다.
        // final이 없어도 컴파일러가 자동으로 붙여준다.
        // 자바에는 클로저 이런 개념이 없어서 그런가?
        class LocalInner {}
    }
}
```

내부 클래스와 외부 클래스에 선언된 변수명이 같은 때는 외부 클래스명.this로 구분
할 수 있는데 쓸 일이 있을까,,,?

```java
import java.awt.*;
import java.awt.event.*;

class InnerEx7 {
    public static void main(String[] args) {
        Button b = new Button("Start");
        b.addActionListener(new EvenrHandler());
    }
}

class EventHandler implements ActionListener {
    public void actionPerformed(ActionEvent e) {
        System.out.println("ActionEvent occurred");
    }
}
```

### 8. 예외처리

자바는 프로그램 오류를 두 가지로 구분한다.

> 에러(error): 프로그램 코드에 의해서 수습될 수 없는 심각한 오류예외(exception):
> 프로그램 코드에 의해서 수습도리 수 있는 다소 미약한 오류

Exception 클래스의 자손들 중 RuntimeException은 주로 프로그래머의 실수에 의해서
발생될 수 있는 것이고, RuntimeException을 제외한 것들은 외부의 영향으로 발생할수
있는 것들이다.

try-catch문의 마지막에 Exception 클래스를 사용하면 모든 예외를 잡을 수 있다.

|를 사용한 멀티 catch 블럭으로 여러 에러를 잡을 수 있다. 멀티 catch 블럭의 e는상
수이다??

컴파일러가 예외처리를 확인하지 않는 RuntimeException 클래스들은 unchecked 예외라
고 부르고, 예외처리를 확인하는 Exception 클래스들은 checked 예외라고 부른다.
RuntimeException은 메서드에 예외를 선언할 때도 보통 적지 않는다.

두 메서드가 예외처리를 분담할 수도 있다.

try 블럭에서 return 문이 실행되는 경우에도 finally 블럭의 문장들이 먼저 실행된후
에 현재 실행중인 메서드를 종료한다.

기본적으로 finally문에서 예외가 발생하면 try블럭의 예외는 무시된다.
try-with-resources문의 괄호 안에서 Autoclosable을 채택한 객체를 생성하는 문장을
넣으면 try문을 벗어날 때 자동적으로 close가 호출된다. 이때 try에서와 finally에서
모두 예외가 발생하면 CloseException은 억제된 예외로 다룬다.

현재 자바는 모바일이나 웹 프로그래밍에서 주로 사용되는데, 프로그래밍 환경이 달라
진 만큼 필수적으로 처리해야만 할 것 같았던 예외들이 선택적으로 처리해도 되는 상
황으로 바뀌는 경우가 종종 있다. 따라서 unchecked 예외가 더 환영받고 있다. 따라서
점점 Exception보다는 RutimeException을 상속받아서 작성하는 경우가 많아지고 있다.

finally문에서도 return을 할 수 있으며 try나 catch블럭의 return문 다음에 실행되며
최종적으로 반환되는 값이다.

initCause/getCause로 연결된 예외를 다룰 수 있고 checked 예외를 unchecked 예외로
바꿀 수 있다.

```java
RuntimeException(Throwable cause)
```

### 9. java.lang 패키지와 유용한 클래스

!@chapter9/Lang.java@!

equals를 구현했으면 hashCode 메서드도 같은 값이 나오게 바꾸어주어야한다.

```java
// 기본 toString() 구현
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

Clonable 인터페이스를 구현한 클래스만 clone메서드를 부를 수 있다. 이때 공변 변환
타입(coviriant return type)덕분에 Object 타입이 반환되지 않아도 된다.

Clonable은 얕은 복사를 한다.

클래스 객체는 특정 클래스의 인스턴스로 이름이 'Class'이다. Class 객체는 클래스의
모든 정보를 담고 있고 클래스 당 1개만 존재한다. 클래스 파일이 클래스 로더에 의해
메모리에 올라갈 때 자동으로 생성된다.

> 클래스 로더는 실행시에 필요한 클래스를 동적으로 메모리에 로드하는 역할을 하며
> 기존에 생성된 클래스 객체가 메모리에 없다면 클래스 패스에 지정된 경로를 따라클
> 래스 파일을 찾는다.

```java
Class cobj = new Card().getClass();
Class cObj = Card.class;
Class cObj = Class.forName("Card");
```

> 동적으로 객체를 생성하고 메서드를 호출하는 방법에 대해 더 알고 싶다면 '리플렉
> 션 API'로 검색하면 된다.

문자열간의 결합이나 추출 등 문자열을 다루는 작업이 많이 필요한 경우에는
StringBuffer 클래스를 사용하는 것이 좋다.

문자열 리터럴은 이미 존재하는 것을 재사용하는 것이다. 자바 소스파일에 포함된 모
든 문자열 리터럴은 컴파일 시에 클래스 파일에 저장된다. constant pool.

자바는 C와 달리 문자열 맨 끝에 nul이 있지는 않고 문자열의 길이 정보를 저장한다.

intern: 문자열을 상수풀에 등록한다. 이미 있으면 그 문자열의 주소값을 반환한다.

Stringbuffer 클래스에는 append처럼 자기 자신을 반환하는 메서드들이 많이 있다.
.append().append()... 가능.

Stringbuffer는 thread safe하도록 동기화가 되어 성능이 떨어지고, StringBuilder는
멀티쓰레드 지원이 없다. 나머진 완전 동일.

rint는 반환값이 double이고 가장 가까운 짝수 정수를 반환한다.

Math클래스는 OS 의존적인 계산을 하지만 StrictMath는 성능은 다소 포기해도 모두 같
은 결과를 반환한다.

기본형 변수도 객체로 다루어야할 때 래퍼 클래스를 이용한다.

기본형 값을 래퍼 클래스의 객체로 컴파일러가 자동 변환해주는 것을 오토박싱, 반대
는 언박싱이라고 한다.

챕터 9 뒤쪽은 훑어보기만 함~

### 10. 날짜와 시간 & 형식화

Calendar는 바로는 못쓰고 getInstance 메소드를 쓰면 지역에 따라 적당한 인스턴스를
반환해준다.

자바스크립트와 마찬가지로 Month가 0부터 시작한다. 자스가 자바 따라했다는 것 같기
도,,,?

roll 메서드는 다른 필드의 값을 바꾸지 않는다. 회전하는? 느낌인 듯.

날짜 관련은 동기부여가 안돼서 포기,, 나중에 다시 찾아오기-!

### 11. 컬렉션 프레임웍

컬렉션(collection): 데이터 군

Collection -> List(ArrayList, LinkedList, Stack, Vector) -> Set(HashSet,
TreeSet)

Map(HashMap, TreeMap, Hashtable, Propertied)

명명법이 다른 애들은 프레임워크 이전에도 있었던 애들로, 새로 추가된 애들을 대신
사용하는 것이 좋다.

Collection은 인터페이스이고 Collections는 클래스이다.

배열을 이용한 자료구조는 용량을 변경할 때 새로운 배열을 생성해야하므로 효율이 상
당히 떨어진다.

LinkedList 클래스는 양방향 연결 리스트로 구현되어있다.

!@chapter9/ArrayListVSLinkedList.java@!

일반 배열은 짐작?으로 배열 크기를 선언해야하므로 메모리 사용이 비효율적임.

Stack을 구현한 클래스는 따로 있지만 Queue는 해당 인터페이스를 구현한 LinkedList
같은 애들을 가져다 쓰면 된다. Stack은 인터페이스가 없나??

Stack은 맨 위에 저장된 객체의 index를 1로 정의한다??

Enumeration은 Iterator의 구버전이고, ListIterator는 Iterator를 상속받아 향상시킨
것이다. 양방향 이동이 가능하다.

extends Vector implements Iterator로 할 수 있는데 한 클래스에서 한번에 하는거 어
디서 읽었더라?

Arrays에 정의된 메서드는 모두 static 메서드이다.
