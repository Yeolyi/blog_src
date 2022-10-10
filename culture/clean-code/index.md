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

## 4. Comments

## 5. Formatting

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
