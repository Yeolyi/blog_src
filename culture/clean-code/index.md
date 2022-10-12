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

## 7. Error Handling

## 8. Boundaries

## 9. Unit Tests

## 10. Classes

## 11. Systems

## 12. Emergence

## 13. Concurrency

## 14. Successive Refinement

## 15. JUnit Internals

## 16. Refactoring SerialData

## 17. Smells and Heuristics

## Appendix
