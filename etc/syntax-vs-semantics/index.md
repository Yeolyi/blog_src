---
title: statement, expression, syntax, semantics
---

출처: 이웅모, 모던 자바스크립트의 개념과 동작 원리

**값**은 식이 평가되어 생성된 결과이다. **변수**는 하나의 값을 저장하기 위해 확
보된 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름이다. **리터
럴**은 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법
을 말한다.

## Statement(문)

문은 프로그램을 구성하는 기본 단위이자 최소 실행 단위이다. 문은 선언문, 할당문,
조건문, 반복문 등으로 구분될 수 있다.

## Expression(표현식)

값으로 평가될 수 있는 **문**이다. 즉, 표현식이 평가되면 새로운 값을 생성하거나기
존 값을 참조한다.

---

출처:
[What is the difference between syntax and semantics in programming languages?](https://stackoverflow.com/questions/17930267/what-is-the-difference-between-syntax-and-semantics-in-programming-languages)와

## Syntax(구문론)

**언어의 문법**이 기준. 언어의 구조 혹은 문법에 대한 것. C를 예로 들면 '문을 세
미콜론으로 구별한다.' '여러 문을 중괄호를 통해 하나의 문으로 묶는다' 등등.

## Semantics(의미론)

문장의 의미가 기준. 이 문장이 타당한가?

```c
x++;                  // increment
```

x가 포인터면 데이터 타입의 사이즈만큼 증가시킨다는 의미, 정수면 1을 증가시킨다는
의미를 가진다.

몇몇 semantic한 오류들은 컴파일 타임에는 찾지 못하고 런타임에서야 발견된다. 예를
들어, x가 int의 최대값이라면?
