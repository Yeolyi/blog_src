---
title: Fluent Python 2ed
---

## Preface

많은 개발자들이 파이썬을 이전에 쓰던 언어처럼 사용해버린다.

알지 못하는 기능에 대해서는 아쉬워할 수 없다. 파이썬을 강력하게 사용하자.

> Its emphasis is on the language features that are either unique to Python or not found in many other popular languages.

> Premature abstraction is as bad as premature optimization.

[doctest](https://docs.python.org/3/library/doctest.html)

[GitHub](https://github.com/fluentpython/example-code-2e)

[fluentpython.com](https://www.fluentpython.com)

## 1. Data Structures

### 1. The Python Data Model

파이썬의 강점 중 하나는 일관성이다.

> You can think of the data model as a description of Python as a framework.

파이썬 인터프리터는 기본적인 객체 연산을 위해 특별 메서드(special method)를 호출한다. obj[key]는 \_\_getitem\_\_ 특별 메서드에 의해 지원된다.

!@chapter1/specialMethod.py@!

파이썬 데이터 모델을 leverage하기 위한 특별 메서드는 클래스의 사용자가 임의의 메서드 이름을 외울 필요가 없게 하고 풍부한 파이썬 표준 라이브러리로부터 이득을 취하기 쉽게 한다.

특별 메서드는 내가 아닌 파이썬 인터프리터에 의해 호출되어야한다. 유일하게 자주 직접 불러야하는 특별 메서드는 \_\_init\_\_이다. 빌트인 함수들이 부르는게 다른 작업도 해주고 빌트인 타입에서는 빠르니까 좋다.

!@chapter1/vector.py@!

[what does r do in str and repr](https://stackoverflow.com/questions/38418070/what-does-r-do-in-str-and-repr)

\_\_repr\_\_은 match the source code to re-create the represented object, \_\_str\_\_는 엔드 유저가 보기 적합하게. 둘 중 하나만 한다면 \_\_str\_\_

불리언이 사용될 맥락에서 객체를 사용하는 것이 허용된다. \_\_bool\_\_을 호출해보고, 없으면 len을 호출해 0인지 아닌지 확인한다. 이것도 없으면 true.

ABC: abstract base classes

- Iterable - unpacking, iteration
- Sized - len
- Container - in operator

중요한 Collection의 분화에는 Sequence, Mapping, Set이 있다.

> len is not called as a method because it gets special treatment as part of the Python Data Model, just like abs.But thanks to the special method \_\_len\_\_, you can also make len work with your own custom objects.

### 2. An Array of Sequences



## 2. Functions as Objects

## 3. Classes and Protocols

## 4. Control Flow

## 5. Metaprogramming
