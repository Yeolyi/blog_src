---
title: Clean Code
---

## 1. Clean Code

코드는 요구사항을 표현하는 언어이다.

나중을 결코 오지 않는다.

나쁜 코드의 위험을 이해하지 못하는 관리자 말을 그대로 따르는 행동은 전문가답지 못하다.

기한을 맞추는 유일한 방법은 코드를 최대한 깨끗하게 유지하는 습관이다.

나쁜 코드는 나쁜 코드를 유혹한다.

아무리 코드가 우아해도 테스트 케이스가 없으면 깨끗하지 않다.

## 2. Meaningful Names

좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다.

실제 List가 아니라면 accountList는 적당한 이름이 아니다. accountGroup, bunchOfAccounts, Accounts등을 고려해보자.

```java
// source와 destination이 더 명확하다.
public static void copyChars(char a1[], char a2[]) {
  for (int i=0; i<a1.length; i++) {
    a2[i] = a1[i]
  }
}
```

프로그래밍은 사회 활동이기에 발음하기 쉬운 이름이 중요하다.

이름 길이는 범위 크기에 비례해야 한다.

팩토리 패턴에서 인터페이스 클래스/구체 클래스의 명명은 IShapeFactory/ShapeFactory보다는 ShapeFactory/ShapeFactoryImp가 낫다. 인터페이스인 것이 꼭 필요한 정보일까?

클래스 이름은 명사/명사구, 메서드 이름은 동사/동사구.

```java
Complex fulcrumPoint = Complex.FromRealNumber(23.0);
Complex fulcrumPoint = Complex(23.0);
// 위가 아래보다 좋다는데 Swift랑은 관점이 다른듯
```

## 3. Functions

함수는 작게 만들어야 한다.

if/while 문 등에 들어가는 블록은 한 줄이어야 한다?! 함수에서 들여쓰기 수준은 1단이나 2단을 넘억면 안 된다.

함수는 한 가지를 잘해야 한다. 더 정확히는, 추상화 수준이 하나여야한다.

[LOGO](<https://en.wikipedia.org/wiki/Logo_(programming_language)>)

```java
// switch문 다형성으로 대체하기
// 아래 함수는 한 가지 작업만 수행하지 않고
// 코드를 변경할 이유가 여러가지이므로 SRP를 위반하며
// OCP도 위반한다.
// 가장 심각한건 이대로면 아래 함수와 같은 구조의 다른 함수들이 무한정 가능하다
// isPayday(Employee e, Date date) 등등..
public Money calculatePay(Employee e) throws Invalid EmploeeType {
  switch (e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}

// switch문을 추상 팩토리에 숨기고 다형적 객체를 생성하는 코드에서 단 한번만 사용한다.
public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
}

public interface EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      // ...
    }
  }
}
```

함수에서 이상적인 인수 개수는 0개이다. 3개는 가능한 피하고, 4개 이상은 특별한 이유가 있어도 사용하면 안된다.

```java
// 인수 1개
// - 인수에 질문 던지기
boolean fileExists("My File");
// - 인수를 변환하기
// 가급적 변환 결과는 반환값으로 돌려준다. 인수 참조를 바꾸고 void 반환하지 말라는 뜻인듯.
InputStream fileOpen("My File");
// 이외에는 가급적 피한다.

// 인수 2개
Point p = new Point(0, 0);
// 여기서 인수 2개는 한 값을 표현하는 두 요소며,
// 자연적인 순서가 있다.

// 가변 함수
public String format(String format, Object... args)
// 사실상 이항 함수이다.
```

플래그 인수는 추하다.

함수 이름에 키워드를 추가해도 좋다. assertEquals보다 assertExpectedEqualsActual이 더 좋다.

부수효과는 시간적인 결합을 초래한다.

출력 인수는 피한다. 출력 인수로 사용하라고 설계한 변수가 this이다?! 함수에서 상태를 변경해야한다면 ㅎ마수가 속한 객체 상태를 변경하는 방식을 택한다.

명령과 조회를 분리하라. 함수는 뭔가를 수행하거나 뭔가에 답하거나 둘 중 하나만 해야 한다.

```java
// try/catch는 원래 추하다. 코드 구조에 혼란을 일으키며 정상 동작과 오류 처리 동작을 뒤섞으니 별도 함수로 뽑아낸다.
// 함수는 한 가지 작업만 해야하고 오류 처리도 한 가지 작업니다.
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  } catch (Exception e) {
    logError(e);
  }
}
```

Enum으로 오류 코드를 정의하면 enum이 바뀌었을 때 관련된 모든 모듈을 재컴파일해야하지만 Exception 클래스에서 파생시키면 괜찮다. OCP를 보여주는 예시이다.

[구조적 프로그래밍](https://ko.wikipedia.org/wiki/구조적_프로그래밍)

JUnit? 관련 리팩터링 예시 있음.

## 4. Comments

우리는 코드로 의도를 표현하지 못해, 그러니까 실패를 만회하기 위해 주석을 사용한다.

코드만이 정확한 정보를 제공하는 유일한 출처다.

많은 경우 주석으로 달려는 설명을 함수로 만들어 표현해도 충분하다.

[VSCode Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

소수 관련 리팩터링 예시 있음.

## 5. Formatting

> 프로그래머라면 형식을 깔끔하게 맞춰 코드를 짜야 한다. 코드 형식을 맞추기 위한 간단한 규칙을 정하고 그 규칙을 착실히 따라야 한다. 코드 형식은 의사소통의 일환이고, 의사소통은 전문 개발자의 일차적인 의무다.

대부분 200줄인 파일로도 커다란 시스템을 구축할 수 있다.

서로 밀접한 코드 행은 세로로 가까이, 한 파일에 속해야 한다. protected 변수를 피해야 하는 이유 중 하나다.

한 함수가 다른 함수를 호출하면 두 함수는 세로로 가까이, 호출하는 함수를 먼저. 소스 코드가 고차원에서 저차원으로 자연스럽게 내려간다.

상수를 잘 알려지지 않은 함수에 묻어놓는 것보다, 상수를 알아야 마땅한 함수에서 상수를 사용하는 함수로 상수를 넘겨주는 방법이 더 좋다.

간단한 if문이더라도 한 행에 범위를 뭉뚱그린 코드를 피한다.

## 6. Objects and Data Structure

```java
// 구체적인 Point 클래스
public class Point {

  public double x;
  public double y;
}

// 추상적인 Point 클래스
// 클래스 메서드가 접근 정책을 강제한다. 읽는 건 따로지만 설정은 반드시 x, y 함께한다.
// 내부 구현에 대해 알 수 없다.
public interface Point {
  double getX();
  double getY();
  void setCartesian(double x, double y);
  double getR();
  double getTheta();
  void getPolar(double r, double theta);
}

```

> 변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지 않는다. 추상화가 필요하다.

!@ProcedureShape.java@!

!@PolymorphismShape.java@!

> 분별 있는 프로그래머는 모든 것이 객체라는 생각이 미신임을 잘 안다.

[Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter)

자료 구조는 무조건 함수 없이 공개 변수만 포함하고, 객체는 비공개 변수와 공개 함수를 포함한다면 문제는 간단해진다.

활성 레코드는 DTO의 특수한 형태다.

시스템을 구현할 때, 새로운 자료 타입을 추가하는 유연성이 필요하면 객체다 적합하고, 새로운 동작을 추가하는 유연성이 필요하면 자료 구조와 절차적인 코드가 더 적합하다.

## 7. Error Handling

오류 코드를 반환하는 방법보다, 예외를 던지면 호출자 코드가 더 깔끔해진다. 논리가 오류 처리 코드와 뒤섞이지 않는다.

try 블럭은 트랜잭션??과 비슷하다. try 블럭에서 무슨 일이 생기든 catch 블럭은 프로그램 상태를 일관성 있게 유지해야 한다.

강제로 예외를 일으키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성하면, 자연스럽게 try 블록의 트랜잭션 범위부터 구현하므로 범위 내에서 트랜잭션 본질을 유지하기 쉬워진다?

확인된 예외는 OCP를 위반한다. 최하위 함수가 바뀐 사실을 나머지 함수들이 알아야 한다.

외부 API를 감싸면 의존성이 크게 줄어든다.

null을 반환하는 코드는 일거리를 늘릴 뿐만 아니라 호출자에게 문제를 떠넘긴다. null 대신 예외를 던지거나 특수 사례 객체를 반환한다.

메서드로 null을 전달하는 방식은 더 나쁘다.

**오류 처리를 프로그램 논리와 분리하면 독립적인 추론이 가능해지며 코드 유지보수성도 크게 높아진다.**

## 8. Boundaries

소프트웨어 경계를 깔끔하게 처리하는 기법과 기교를 살펴보자.

Map과 같은 경계 인터페이스를 이용할 때는 이를 이용하는 클래스나 클래스 계열 밖으로 노출되지 않도록 주의한다. 맥락상 사용하면 안되는 기능들도 노출되기 때문.

간단한 테스트 케이스로 외부 코드를 익히는 것을 학습 테스트라 한다. 새로운 패키지가 나와도 테스트 케이스를 돌려 고장난 부분이 있는지 바로 확인할 수 있다.

151p Communication Controller?

외부 패키지를 호출하는 코드는 새로운 클래스로 경계를 감싸거나 ADAPTER 패턴을 사용한다.

## 9. Unit Tests

TDD 법칙 3가지

- 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
- 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
- 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.

실제 코드가 진화하면 테스트 코드도 변화해야하고, 테스트 코드가 지저분하면 변경하기 어려워진다.

테스트 코드는 실제 코드 못지 않게 중요하다.

코드에 유연성, 유지보수성, 재사용성을 제공하는 버팀목이 바로 단위 테스트다.

가독성은 실제 코드보다 테스트 코드에 더더욱 중요하다.

**개념 당 assert 문 수를 최소로 줄이고, 테스트 함수 하나는 개념 하나만 테스트하라**

FIRST. Fast, Independant, Repeatable, Self-Validating, Timely. (167p)

## 10. Classes

지금까지 배운 것보다 차원 높은 단계도 신경써보자. 깨끗한 클래스에 대해.

공개 변수가 필요한 경우는 거의 없다. 비공개 함수는 자신을 호출하는 공개 함수 직후에 넣는다.

클래스의 간결한 이름이 떠오르지 않는다면 클래스 크기가 너무 커서 그렇다.

클래스는 변경할 이유가 하나여야한다.

> 돌아가는 소프트웨어에 초점을 맞추는 것은 전적으로 올바른 태도이다. 관심사를 분리하는 작업은 중요하다. 하지만 프로그램이 돌아가면 일이 끝났다고 여기고 다음 관심사(깨끗한 소프트웨어)로 전환하지 않는 것은 문제다.

많은 작업을 하는 클래스는 당장 알 필요가 없는 사실까지 들이밀어 독자를 방해한다.

변수가 많은 큰 함수 -> 일부를 작은 함수로 빼고 두 함수에서 공통으로 사용하는 변수를 인스턴스 변수로 승격 -> 클래스가 응집력을 잃음 -> 클래스를 쪼갬.

PrimeGenerator 예시 있음.

깨끗한 시스템은 클래스를 체계적으로 정리해 변경에 수반하는 위험을 낮춘다.

클래스 일부에서만 사용되는 비공개 메서드는 코드를 개선할 잠재적인 여지를 시사한다.

시스템의 결합도를 낮춘다는 것은 각 시스템 요소가 다른 요소로부터 그리고 변경으로부터 잘 격리되어있다는 뜻이다. 결합도를 최소로 줄이면 DIP를 자연스레 따르게 된다. 본질적으로 DIP는 클래스가 상세한 구현이 아니라 추상화에 의존해야 한다는 원칙이다.

## 11. Systems

높은 추상화 수준, 즉 시스템 수준에서도 깨끗함을 유지하는 방법을 살펴보자.

> 소프트웨어 시스템은 (애플리케이션 객체를 제작하고 의존성을 서로 '연결'하는) 준비 과정과 (준비 과정 이후에 이어지는) 런타임 로직을 분리해야 한다?? 와닿지 않네,,

## 12. Emergence

## 13. Concurrency

## 14. Successive Refinement

## 15. JUnit Internals

## 16. Refactoring SerialData

## 17. Smells and Heuristics

## Appendix
