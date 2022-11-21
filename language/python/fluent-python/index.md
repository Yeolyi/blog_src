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

!@chapter1/1-2/specialMethod.py@!

파이썬 데이터 모델을 leverage하기 위한 특별 메서드는 클래스의 사용자가 임의의 메서드 이름을 외울 필요가 없게 하고 풍부한 파이썬 표준 라이브러리로부터 이득을 취하기 쉽게 한다.

특별 메서드는 내가 아닌 파이썬 인터프리터에 의해 호출되어야한다. 유일하게 자주 직접 불러야하는 특별 메서드는 \_\_init\_\_이다. 빌트인 함수들이 부르는게 다른 작업도 해주고 빌트인 타입에서는 빠르니까 좋다.

!@chapter1/1-2/vector.py@!

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

표준 라이브러리는 C로 구현된 풍부한 시퀀스 타입을 제공한다.

list, tuple, deque같은 container sequence는 다른 타입의 요소를 가질 수 있고 str, byte, array같은 flat sequence는 한 타입만 가질 수 있다. 전자는 참조, 후자는 값을 가진다. 전자는 숫자를 넣어도 참조로 가지는 듯?(Figure 2-1)

이렇게 말고 mutability로 나눌 수도 있다. tuple, str, byte는 변경 불가능하다. mutable sequence들은 immutable sequence의 것들을 상속받는다.

모든 파이썬 객체는 메타데이터가 든 헤더를 가진다.

생성된 list로 뭘 할게 아니라면 list comprehension은 사용하면 안된다.

!@chapter1/1-2/listComp.py@!

Listcomp는 map과 filter가 하는거 다 할 수 있다. 더 예쁨.

다른 시퀀스 다루려면 generator expression을 사용한다.

!@chapter1/1-2/genExp.py@!

튜플은 변경 불가능한 리스트 외에도 records with no field names로 사용할 수 있다.

!@chapter1/1-2/tupleUnpacking.py@!

Mutable한 객체를 담은 튜플은 버그의 원인이 될 수 있다.

튜플은 리스트보다 성능이 좋다.

> Unpacking is important because it avoids unnecessary and error-prone use of indexes to extract elements from sequences.

!@chapter1/1-2/unpacking.py@!

single-item 튜플은 trailing comma와 함께 써야한다. (a, )

```py
# One key improvement of match over switch is destructuring
def handle_command(self, message):
  match message:
    case ['BEEPER', frequency, times]:
      self.beep(times, frequency)
    case ['NECK', angle]:
      self.rotate_neck(angle)
    case ['LED', ident, intensity]:
      self.leds[ident].set_brightness(ident, intensity)
    case ['LED', ident, red, green, blue]:
      self.leds[ident].set_color(ident, red, green, blue)
    case _:
      raise InvalidCommand(message)
# Sequence pattern은 튜플이든 리스트든 상관이 없다. collection.abs.Sequence의 서브클래스면 되지만 str, bytes, bytearray는 예외.
# patterns don't destructure iterables that are not sequences. like iterator
# 여기서 사용된 _에는 값이 바인딩되지 않는다.
```

시퀀스 패턴에서 \*는 시퀀스당 한번만 등장할 수 있다.

> Pattern matching is an example of declarative programming: the code describes “what” you want to match, instead of “how” to match it.

slice/range에서 명시한? 마지막 원소를 포함하지 않는 것은 길이를 알기 쉽고 계산하기도 쉽고(stop - start) 시퀀스를 두 개로 나누기(list[:x], list[x:]도 쉽다.

!@chapter1/1-2/slice.py@!

Augmented assignment operator. +=의 경우 \_\_iadd\_\_를 통해 작동하고 구현되어있지 않으면 \_\_add\_\_를 사용한다. 따라서 후자의 경우 a = a + b처럼 작동하고 a + b를 평가할 때 새로운 객체를 만들게 된다. 객체의 identity가 바뀔 수도 안바뀔 수도 있다.

따라서 mutable 객체는 iadd가 구현되어 inplace로 작동한다 생각해도 좋다.

!@chapter1/1-2/sequenceOperator.py@!

- 튜플에 mutable 넣는 것 지양
- Augmented assignement는 원자적 작업이 아니다.
- Python bytecode를 보는건 그리 어렵지 않다.

> Receiver is the target of a method call, the object bound to self in the method body.

list.sort는 inplace.

[Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface#Swift)

이진 검색 모듈인 bisect가 있다.

리스트도 좋지만 다른걸 사용하는게 좋은 경우도 있다. array, dequeue 등,,,

!@chapter1/1-2/arrray.py@!

> A memoryview is essentially a generalized NumPy array structure in Python itself (without the math). It allows you to share memory between data-structures (things like PIL images, SQLite databases, NumPy arrays, etc.) without first copying. This is very important for large data sets.

> NumPy implements multi-dimensional, homogeneous arrays and matrix types that hold not only numbers but also user-defined records, and provides efficient element-wise operations.

> SciPy is a library, written on top of NumPy, offering many scientific computing algorithms from linear algebra, numerical calculus, and statistics.

> NumPy and SciPy are formidable libraries, and are the foundation of other awesome tools such as the Pandas—which implements efficient array types that can hold nonnumeric data and provides import/export functions for many different formats’

!@chapter1/1-2/numpyEx.py@!

> The class collections.deque is a thread-safe double-ended queue designed for fast inserting and removing from both ends

!@chapter1/1-2/dequeEx.py@!

덱은 양 끝에서는 빠른 대신에 중간에서 하는건 느림에 유의. append와 popleft는 원자적이라서 멀티쓰레드에서 락 없이 사용해도 좋다.

이외에도 queue, multiprocessing, asyncio, heapq가 있다.

### 3. Dictionaries and Sets

> Python is basically dicts wrapped in loads of syntactic sugar.

파이썬과 딕셔너리는 떼놓을 수 없다. 중요한 역할을 맞기에 매우 최적화되어있다.

!@chapter1/3/modernDict.py@!

!@chapter1/3/dictPatternMatching.py@!

> An object is hashable if it has a hash code which never changes during its lifetime (it needs a \_\_hash\_\_() method), and can be compared to other objects (it needs an \_\_eq\_\_() method). Hashable objects which compare equal must have the same hash code.

Container 타입은 immutable하고 contained object가 hashable할 때 hashable하다.

보안상의 이유로 파이썬 버전별로, 컴퓨터 아키텍처에 따라 해시 값은 다를 수 있다. 해시 값은 한 파이썬 프로세스내에서만 같을 것이 보장된다.

```py
# setdefault example
if key not in my_dict:
  my_dict[key] = []
my_dict[key].append(new_value)

my_dict.setdefault(key, []).append(new_value)
```

defaultdict은 \_\_missing\_\_을 통해 작동한다.

k in my_dict.keys()보다 k in my_dict가 더 빠르다.

3.6부터 기본 dict도 순서를 보존해서 OrderedDict는 보통 하위호환을 위해 사용한다. 어느정도 차이는 있는데, dict는 mapping 연산에 특화되었고 OrderedDict는 reorder에 특화되어있다. LRU 캐시에서 최근 접근을 관리하는데 용이하다.

```py
# A ChainMap instance holds a list of mappings that can be searched as one.
import builtins
pylookup = ChainMap(locals(), globals(), vars(builtins)
```

!@chapter1/3/counterEx.py@!

> The shelve module in the standard library provides persistent storage for a mapping of string keys to Python objects serialized in the pickle binary format.

dict보다 UserDict를 서브클래싱하는 것이 좋다.

!@chapter1/3/mappingProxyTypeEx.py@!

dict의 .keys(), .values(), .items()는 특정 클래스의 인스턴스를 반환하는데, 이 **dictionary view**들은 read-only projections of the internal data structures used in the dict implementation으로 메모리를 절약할 수 있게 해준다. 이 view object는 dynamic proxy이다. 

!@chapter1/3/dictProjections.py@!

> To save memory, avoid creating instance attributes outside of the \_\_init\_\_ method...??

**Set**

```py
# 중복 요소 제거해야되는데 순서도 보장해야할 때
dict.fromkeys(l).keys()
list(dict.fromkeys(l).keys())
```

빈 집합은 {}로는 안되고 set()을 사용해야한다. 

!@chapter1/3/setComprehension.py@!

!@chapter1/3/setOperation.py@!

dict_keys와 dict_items는 frozenset과 아주 유사하다. 

## 2. Functions as Objects

## 3. Classes and Protocols

## 4. Control Flow

## 5. Metaprogramming
