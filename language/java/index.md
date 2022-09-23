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

short는 음수가 있고, char는 음수가 없다. 

기본형과 참조형간의 형변환은 불가능하다. 

부동 소수점 관련해서는 공부해보기~!

형변환을 생략해도 컴파일러가 해준다. 하지만 데이터가 유실될 수 있는 경우 형변환을 명시해주어야 한다. 

> 연산 과정에서 자동적으로 발생하는 형변환을 산술 변환이라고 한다. 

### 3. 연산자

부호 연산자와 뺄셈 연산자는 생긴건 같지만 다르다. 

쉬프트 연산자는 덧셈 연산자보다 우선순위가 낮다. 

비트 연산자는 비교 연산자보다 낮다. 

AND가 OR보다 높다. 

대입 연산자는 연산자의 결합 규칙이 오른쪽에서 왼쪽이다. 

**산술 > 비교 > 논리 > 대입, 단항 > 이항 > 삼항 순서로 진행. 단항과 대입 제외 모두 왼쪽에서 오른쪽으로 결합.**

int / int = int

!@chapter3/CharOperator.java@!

나머지 연산자에서 나누는 수가 음수이면 해당 음수를 무시하고 나온 결과에 왼쪽 피연산자의 부호를 붙인다. 

float과 double의 비교에서 float -> double 변환을 해도 어차피 같은 값이므로 double -> float 형변환을 해야 한다. 

!@chapter3/StringComp.java@!

단축 평가로 인해 같은 조건식이라도 피연산자의 위치에 따라서 연산속도가 달라질 수 있다. 

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

switch문의 조건식 결과는 반드시 정수/문자열이어야 한다. case문의 값은 정수 상수/문자열 리터럴만 가능하다. 

Switch의 구현은 공부해봐야겠지만 조건식을 한번만 계산하는 듯? switch 테이블 어쩌구 그건가. 

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

String 객체의 내용을 바꿀 수는 없다. Mutable한 문자열은 StringBuffer 클래스를 사용한다. 

!@chapter5/StringObj.java@!

이전에 말한 길이 0인 배열은 커맨드라인에서 인수가 0개일 때 args값에서 사용된다. 



