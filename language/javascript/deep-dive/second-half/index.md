---
title: 모던 자바스크립트 Deep Dive 후반부
---

## 24. 클로저

> A closure is the combination of a function and the lexical environment within
> which that function was declared.

### 1. 렉시컬 스코프

> 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장할 참조값, 즉 상위 스코프에
> 대한 참조는 함수 사용 시점이 아닌 정의가 평가되는 시점에 함수가 정의된 환경(위
> 치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.

### 2. 함수 객체의 내부 슬롯 [[Environment]]

함수가 호출되었을 때 생성될 '외부 렉시컬 환경에 대한 참조'에 저장될 참조값과 같
다. 함수는 여기에 저장되는 상위 스코프를 자신이 존재하는 한 기억한다.

!@chapter24/environment.js@!

### 3. 클로저와 렉시컬 환경

> 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가종
> 료된 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저(closure)라고
> 부른다.

자바스크립트의 모든 함수가 상위 스코프를 기억하므로 이론적으로는 모든 함수가 클
로저이지만, 상위 스코프의 어떠한 식별자도 참조하지 않는 경우 대부분의 모던 브라
우저는 최적화를 통해 상위 스코프를 기억하지 않기 때문에 클로저라고 부르기 어렵다
. 일부만 참조하는 경우에도 다른 식별자는 기억하지 않는다.

또한 상위 함수보다 수명이 짧아도 클로저라 부르기 어렵다.

debugger 구문 입력하고 브라우저에서 실행하면 스코프 정보를 볼 수 있다.

> 클로저에 의해 참조되는 상위 스코프의 변수를 자유 변수(free variable)라고 부른
> 다.

### 4. 클로저의 활용

상태를 은닉하고 특성 함수에게만 변경을 허용하기 위해 사용한다.

!@chapter24/informationHiding.js@!

한 함수에서 여러 스코프에 접근한다면 [[Environment]]의 참조는?

함수를 호출할 때마다 새로운 렉시컬 환경이 생김을 기억하자.

### 5. 캡슐화와 정보 은닉

자바스크립트는 접근 제한자를 제공하지 않는다.
[최신 버전에는 있기는 한듯?](https://stackoverflow.com/questions/38243329/classes-access-modifiers-in-javascript)
-> private 필드에 대해서는 25.7.4에서.

[이런](https://medium.com/@weberino/you-can-create-truly-private-properties-in-js-without-es6-7d770f55fbc3)
방법도 있다.

### 6. 자주 발생하는 실수

!chapter24/@commonMistake.js@!

## 25. 클래스

### 1. 클래스는 프로토타입의 문법적 설탕인가?

클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공한
다.

- 클래스를 new 연산자 없이 호출하면 에러가 발생한다.
- 클래스는 extends와 super 키워드를 제공한다.
- 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
- 클래스 내의 모든 코드에는 strict mode가 암묵적으로 적용된다.
- 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 [[Enumerable]]이 false
  이다.

클래스는 새로운 객체 생성 매커니즘이다.

### 2. 클래스 정의

클래스는 함수며 일급 객체이다.

### 3. 클래스 호이스팅

클래스 선언문으로 정의한 클래스는 런타임 이전에 평가되지만 클래스 정의 이전에 참
조할 수 없다.

!@chapter25/classHoisting.js@!

### 5. 메서드

constructor는 메서드로 해석되지 않고 클래스가 평가되어 생성된 함수 객체 코드의일
부가 된다. 이에 클래스가 평가된 함수 객체를 봐도 constructor 메서드가 따로 있지
않다.

constructor는 0개 혹은 1개 존재해야한다. constructor 내에서는 인스턴스의 생성과
프로퍼티 추가를 통한 인스턴스 초기화를 실행한다.

메서드에 static 키워드를 붙이면 정적 메서드가 된다.

프로토타입 메서드에서 this는 인스턴스, 정적 메서드의 this는 클래스를 가리킨다.

정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 전역 함수로 정의하지
않고 메서드로 구조화할 때 유용하다.

- function 키워드를 생략한 축약 표현
- 콤마 필요 없음
- 암묵적 strict mode
- 열거 불가
- non-constructor

### 6. 클래스의 인스턴스 생성 과정

constructor 에서의 this는 내부 코드가 실행될 시점에 이미 클래스의 prototype 프로
퍼티가 가리키는 객체가 프로토타입으로 설정되어있다.

### 7. 프로퍼티

!@chapter25/getOwnPropertyName.js@!

인스턴스 프로퍼티를 자바처럼 정의할 수 있는 Class field declarations가 최신 브라
우저에 구현되어 있다. 메소드도 이를 통해 정의할 수 있지만 프로토타입 메서드가 아
닌 인스턴스 메서드가 되므로 권장하지 않는다.

[선언, 정의, 초기화](https://salkuma.wordpress.com/2014/02/05/선언-정의-초기화-기본생성자-그리고-시그너처/)

!@chapter25/accessModifier.js@!

static을 사용한 정적 필드도 최신 브라우저에 구현되어 있다.

### 8. 상속에 의한 클래스 확장

프로토타입 기반은 다른 객체의 자산을 상속받는 개념이지만 상속에 의한 클래스 확장
은 새로운 클래스를 확장하여 정의하는 것이다.

인스턴스끼리뿐만 아니라 수퍼클래스와 서브클래스는 둘 간 프로토타입 체인도 생성한
다.

동적 상속이 가능하다.

서브클래스에 constructor를 생략하면 다음과 같은 constructor가 암묵적으로 정의된
다.

```javascript
constructor(...args) { super(...args); }
```

super를 호출하면 수퍼클래스의 constructor를 호출한다.

- 서브클래스에서 constructor를 생략하지 않았다면 그 constructor에서는 super를 반
  드시 호출해야한다.
- super 호출 전에는 this를 참조할 수 없다. this를 super에서 만들기 때문이다.
- super는 서브클래스의 constructor 내부에서만 호출할 수 있다.

super를 참조해 수퍼클래스의 메서드를 호출할 수 있다. super는 자신을 참조하는 메
서드가 바인딩된 객체의 프로토타입을 가리킨다.

!@chapter25/superMethod.js@!

super를 위해 메서드는 내부 슬롯 [[HomeObject]]를 가지며 의사 코드는 다음과 같다.
이 슬롯은 ES6 메서드 축약 표현으로 정의된 함수만 지닌다. 이 슬롯을 가져야 super
를 참조할 수 있다.

[[HomeObject]]는 메서드가 바인딩 된 객체를 가리킨다.

```javascript
super = Object.getPrototypeOf([[HomeObject]])
```

[[ConstructorKind]]의 base/derived 구분을 통해 new 연산자로 호출되었을 때 동작을
구분한다. 서브클래스는 수퍼클래스에게 인스턴스 생성을 위임한다. 이때 수퍼클래스
의 constructor의 this의 프로토타입은 서브클래스의 prototype 프로퍼티이다.

!@chapter25/mySpecies.js@!

## 26. ES6 함수의 추가 기능

### 1. 함수의 구분

객체에 바인딩된 함수(콜백 함수도 마찬가지)가 생성자 함수로 호출할 수 있다는 것은
해당 함수가 prototype 프로퍼티를 가지며 프로토타입 객체도 생성한다는 것이므로 성
능상의 문제또한 있다.

ES6 이전의 함수는 명확한 구분이 없었는데, ES6에서부터 함수를 사용 목적에 따라 분
류한다.

- Normal: constructor/prototype/arguments
- Method: super/arguments
- Arrow: -

세 가지 이외에도 제너레이터 함수와 async 함수가 있으며 46장에서 살펴본다.

### 2. 메서드

> ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

[[HomeObject]]를 가지기에 super 키워드를 사용할 수 있다.

### 3. 화살표 함수

화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위
한 대안으로 유용하다.

객체 리터럴을 반환하는 경우 리터럴을 소괄호로 감싸주어야한다. 아니면 객체 리터럴
의 중괄호가 함수 몸체를 감싸는 중괄호로 잘못 해석된다.

화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않으
며 스코프 체인 상에서 가장 가까운 상위 함수 중 화살표 함수가 아닌 함수의 것들을
참조한다.

> 화살표 함수는 자체의 this가 없기에 상위 스코프의 this를 그대로 참조한다. 이를
> lexical this라 한다.

ES6이전에는 this를 스코프 체인을 따라 탐색할 이유가 없었지만, 화살표 함수 이후탐
색이 필요해졌다.

!@chapter26/lexicalThis.js@!

이처럼 메서드(ES6이 아닌 일반적인 의미)를 화살표 함수로 정의하는 것은 피해야 한
다.

스코프에 대해서는 다시 공부해봐야할 듯^^; class도 결국엔 함수라는 것을 체화시켜
야 할 듯. 486페이지 다시 읽어보기.
[실행 컨텍스트와 자바스크립트의 동작 원리](https://poiemaweb.com/js-execution-context)

### 4. Rest 파라미터

화살표 함수는 자신의 argument 객체를 가지지 않고, 접근한다해도 자신과 상관없는상
위 함수에 전달된 인수 목록을 알게 되므로 쓸모가 없다. 화살표 함수로 가변 인자함
수를 구현하기 위해서는 반드시 Rest 파라미터를 사용해야 한다.

> Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

함수의 length 프로퍼티에 영향을 주지 않는다.

유사 배열 객체인 arguments를 사용하는 번거로움을 피할 수 있다.

## 27. 배열

### 1. 배열이란?

!@chapter27/arrayBasic.js@!

배열은 일반 객체와 달리 값의 순서가 존재한다.

### 2. 자바스크립트 배열은 배열이 아니다.

> 자료구조에서 말하는 배열, 즉 밀집 배열(dense array)은 동일한 크기의 메모리 공
> 간이 빈틈없이 연속적으로 나열된 자료구조이다.

> 자바스크립트의 배열은 배열의 구조가 연속적으로 이어져있지 않은 희소 배열
> (sparse array)이다.?

자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다. 해시 테이블
로 구현되어 인덱스 접근은 느리지만 요소의 삽입과 삭제는 빠르다.

!@chapter27/arrayPerformance.js@!

### 3. length 프로퍼티와 희소 배열

length 프로퍼티에 그 값보다 작은 값을 할당하면 배열의 길이가 줄어든다.

!@chapter27/sparseArray.js@!

그보다 큰 값을 할당하면 변화가 없다. 자바스크립트는 배열의 요소가 일부가 비어있
는 희소 배열을 허용한다.

최적화 측면에서 희소 배열은 사용하지 않는 것이 좋다.

### 4. 배열 생성

!@chapter27/arrayConstruct.js@!

### 6. 배열 요소의 추가와 갱신

현재 배열의 length 값보다 큰 인덱스로 요소(element)를 추가하면 희소 배열이 된다.

0 이상의 정수를 사용하지 않으면 프로퍼티가 생성되고 lenght 값에 영향을 주지 않는
다.

### 7. 배열 요소의 삭제

delete로 프로퍼티를 삭제할 수 있지만 희소 배열이 되므로 추천하지 않는다.

### 8. 배열 메서드

mutator method(원본 변경)와 accessor method(새로운 객체 반환)로 구분된다. 부수효
과 방지를 위해 후자가 권장된다.

!@chapter27/arrayMethods.js@!

slice, 스프레드 문법, Object.assign 메서드는 모두 얕은 복사를 수행한다. 깊은 복
사를 위해서는 [참고](https://lodash.com/docs/4.17.15#cloneDeep)

### 9. 배열 고차 함수

고차 함수(Highter-Order Function, HOF)

고차 함수는 외부 상태의 변경이나 가변(mutable) 데이터를 피하고 불변성
(immutability)을 지향하는 함수형 프로그래밍에 기반을 두고 있다.

> 함수형 프로그래밍은 순수 함수(pure function)와 보조 함수의 조합을 통해 로직 내
> 에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하
> 여 상태 변경을 피하려는 프로그래밍 패러다임이다.

!@chapter27/hof.js@!

> 최신 사양의 기능을 지원하지 않는 브라우저를 위해 누락된 최신 사양의 기능을 구
> 현하여 추가하는 것을 폴리필(polyfill)이라 한다.

## 28. Number

MAX_SAFE_INTEGER: 자바스크립트는 Number에서 부동소수점을 사용하기 때문.
[참고](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

## 31. RegExp

### 1. 정규 표현식이란?

> 정규표현식은(regular expression)은 일정한 패턴을 가진 문자열의 집합을 표현하기
> 위해 사용하는 형식 언어(formal language)다.

### 2. 정규 표현식의 생성

!@chapter31/regexConstruct.js@!

Regex 생성자 함수로 동적인 Regex 객체를 만들 수 있다.

### 3. Regex 메서드

!@chapter31/regexMethod.js@!

### 4. 플래그

i: ignore case g: global m: multiline

### 5. 패턴

여기 이후는 저 자세히 설명되어있는 EloquentJavascript에서 다시 읽어보기.

```text
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

[이메일 regex...](https://emailregex.com)

## 32. String

### 1. String 생성자 함수

new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 인스턴스가 아닌
문자열을 반환한다.

### 2. length 프로퍼티

String은 length 프로퍼티를 갖기에 유사 배열 객체다.

### 3. String 메서드

String 래퍼 객체도 읽기 전용 객체로 제공된다.

!@chapter32/stringMethod.js@!

## 33. 7번째 데이터 타입 Symbol

### 2. 심벌 값의 생성

Symbol 함수는 new 연산자와 함께 호출하지 않는다. 심벌 값은 객체가 아닌 변경 불가
능한 원시 값이다.

!@chapter33/symbolMethod.js@!

### 3. 심벌과 상수

!@chapter33/symbolConstant.js@!

### 7. Well-known Symbol

> 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-known
> Symbol이라 부른다.

Symbol.iterator 등등

이처럼 심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영
향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해도
입되었다.

## 34. 이터러블

### 1. 이터레이션 프로토콜

> ES6에서 도입된 iteration protocol은 순회 가능한(iterable) 데이터 컬렉션(자료구
> 조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

- 이터러블 프로토콜: 이터레이터를 반환. for...of, 스프레드 문법, 배열 디스트럭처
  링 할당.
- 이터레이터 프로토콜: next 메서드 소유, iterator result object를 반환.

스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법의 사용을 허용한다.

!@chapter34/iterable.js@!

### 3. for...of문

!@chapter34/forOf.js@!

### 4. 이터러블과 유사 배열 객체

유사 배열 객체는 for...of로 순회할 수 없다. Array.from으로 배열로 변환할 수 있다
.

!@chapter34/brokenIterable.js@!

### 6. 사용자 정의 이터러블

이터러블이면서 이터레이터인 객체를 생성하는 함수

!@chapter34/iterableNIterator.js@!

무한 이터러블을 생성하는 함수를 통해 무한 수열을 구현할 수 있다.

> 지연 평가는 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 필요
> 한 시점이 되면 그때야 데이터를 생성하는 기법이다.

무한 이터러블을 통해 지연 평가를 사용한 데이터 생성이 가능하다.

## 35. 스프레드 문법

> ES6에서 도입된 스프레드 문법은 하나로 뭉쳐있는 여러 값들의 집합을 펼쳐서 개별
> 적인 값들의 목록으로 만든다.

스프레드 문법의 결과는 값이 아니고, 따라서 ... 은 연산자가 아니다. 쉼표로 구분한
값의 목록을 사용하는 문백에서만 사용할 수 있다.

Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다.

!@chapter35/restSpread.js@!

!@chapter35/rest.js@!

## 36. 디스트럭처링 할당

> 디스트럭처링 할당(destructuring assignment)은 구조화된 배열과 같은 이터러블 또
> 는 객체를 destructuring하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다.

!@chapter36/destructuring.js@!

## 37. Set과 Map

### 1. Set

!@chapter37/set.js@!

### 2. Map

> Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.

!@chapter37/map.js@!

Set과 Map 모두 요소의 순서에 의미를 갖지 않지만 다른 이터러블의 순회와 호환성을
유지하기 위해 객체 순회 순서가 요소 추가 순서에 따른다.

## 38. 브라우저의 렌더링 과정

> 파싱(구문 분석, syntax analysis)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트
> 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해(어휘 분석,
> lexical analysis)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구
> 조인 parse tree/syntax tree를 생성하는 일련의 과정을 말한다. 일반적으로 파싱이
> 완료된 이후에는 parse tree를 기반으로 중간언어(intermediate code)인 바이트 코
> 드(byte code)를 생성하고 실행한다.

> 렌더링(renderind)은 HTML, CSS, JS로 작성된 문서를 파싱하여 브라우저에 시각적으
> 로 출력하는 것을 말한다.

1. 렌더링에 필요한 리소스 요청, 서버로부터 응답
2. HTML -> DOM / CSS -> CSSOM. 둘을 결합하여 렌더 트리 생성
3. 서버로부터 온 JS를 파싱해 AST(Abstract Syntax Tree) 생성, 바이트코드로 변환해
   실행. JS를 통해 DOM/CSSOM을 변경할 수 있다.
4. 렌더 트리를 기반으로 HTML 요소의 레이아웃을 계산하고 화면에 페인팅

### 1. 요청과 응답

URI, URL, URN, Scheme(Protocol), Host(Domain), Port, Path, Query(Query String),
Fragment...

브라우저의 렌더링 엔진은 HTML을 파싱하는 도중에 외부 리소스를 로드하는 태그를 만
나면 파싱을 일시중지하고 해당 리소스 파일을 서버로 요청한다.

### 2. HTTP 1.1과 HTTP 2.0

HTTP/1.1은 커넥션당 하나의 요청과 응답만 처리한다. 리소스들에 대한 요청들이 개별
적으로 전송되고 응답 또한 개별적으로 전송된다. 리소스의 개수에 비례해 응답 시간
이 증가한다.

HTTP/2는 다중 요청/응답이 가능하다.

[Introduction to HTTP/2](https://web.dev/performance-http2/)

### 3. HTML 파싱과 DOM 생성

DOM(Document Object Model)

1. 서버로부터 응답된 HTML 문서는 meta 태그의 charset 어트리뷰트에 따라 문자열로
   변화된다. 이 정보는 content-type: text/html; charset=utf-8과 같이 응답 헤더
   (response header)에 담겨 응답된다.
2. 문자열로 변환된 HTML 문서는 토큰들로 분해된다.
3. 각 토큰을 객체로 변환하여 노드(node)를 생성한다. 이 노드는 DOM을 구성하는 기
   본 요소가 된다.
4. 노드들을 트리 자료구조로 구성한 DOM을 생성한다.

### 4. CSS 파싱과 CSSOM 생성

HTML과 동일한 파싱 과정으로 CSSOM(CSS Object Model)을 생성한다. CSSOM은 CSS의 상
속을 반영하여 생성된다.

### 5. 렌더 트리 생성

DOM과 CSSOM은 렌더 트리(render tree)로 결합된다. 화면에 렌더링되지 않는 노드와
CSS에 의해 숨겨지는 노드들은 포함되지 않는다. 렌더 트리는 HTML 요소의 레이아웃계
산에 사용되며 브라우저 화면에 픽셀을 렌더링하는 페인팅(painting) 처리에 입력된다
.

Render tree -> Layout -> Paint. 리렌더링이 빈번하지 않도록 주의해야한다.

### 6. 자바스크립트 파싱과 실행

DOM API를 통해 이미 생성된 얘ㅡ을 동적으로 조작할 수 있다.

렌더링 엔진은 HTML을 파싱하다 JS 파일을 만나면 DOM 생성을 일시 중단하고 자바스크
립트 엔진에 제어권을 넘긴다. 엔진은 코드를 해석하여 AST(Abstract Syntax Tree, 추
상적 구문 트리)를 생성하고, 인터프리터가 실행 가능한 중간 코드(intermeditate
code)인 바이트 코드를 생성해 실행한다.

- 토크나이징: 코드를 어휘 분석(lexical analysis)하여 문법적 의미를 가지는 최소단
  위인 토큰(token)들로 분해한다.
- 파싱: 토큰들의 집합을 구문 분석(syntactic analysis)하여 AST를 생성한다. AST는
  토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료구조다. AST를 통해
  TypeScript, Babel, Prettier같은 transpiler를 구현할 수도 있다.
- 바이트코드 생성과 실행: V8은 터보팬(TurboFan)이라는 컴파일러에 의해 최적화된머
  신 코드로 컴파일되어 성능을 최적화한다. 코드의 사용 빈도가 적어지면 다시 디옵
  티마이징(deoptimizing)하기도 한다.

### 7. 리플로우와 리페인트

> 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레
> 이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링한다. 이를 리플로우
> (reflow), 리페인트(repaint)라 한다.

리플로우는 레이아웃 변경이 발생한 경우에 한해 실행되고, 리페인트는 렌더 트리를기
반으로 다시 페인트를 하는 것을 말한다.

### 8. 자바스크립트 파싱에 의한 HTML 파싱 중단

body 요소 가장 아래에 JS를 위치시키는 것은 좋은 아이디어다.

- DOM 미완성일 때 DOM을 조작하면 에러가 발생할 수 있다.
- JS 로딩/파싱/실행으로 인한 렌더링 지장이 없다.

### 9. script 태그의 async/defer 어트리뷰트

앞선 blocking 문제 때문에 HTML5부터 async와 defer 어트리뷰트가 추가되었다.

aync는 HTML 파싱과 JS 로드가 동시에 일어나고, JS 파싱과 실행이 로드 완료 직후
HTML 파싱을 중단시키고 진행된다. 여러 async 끼리의 순서가 보장되지 않는다.

defer는 JS 파싱과 실행이 DOM 생성 직후에 진행된다.

## 39. DOM

> DOM(Document Object Model)은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제
> 어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.

### 1. 노드

> HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다. 시작 태그, 어트리뷰
> 트 이름, 어트리뷰트 값, 콘텐츠, 종료 태그로 구성된다.

HTML 요소는 파싱되어 요소 노드 객체로 변환된다. HTML 요소간에는 계층적인 부자 관
계가 있기에 트리 자료구조로 구성된다.

노드 객체들로 구성된 트리 자료구조를 DOM이라 한다. 총 12종류가 있고 중요한 4종류
는 아래와 같다.

- 문서 노드: 최상위 루트 노드. window.document. entry point 역할
- 요소 노드: HTML 요소. 부자 관계를 가짐.
- 어트리뷰트 노드: 부모 노드 없이 요소 노드와 연결되어 요소의 어트리뷰트 가리킴.
- 텍스트 노드: 텍스트, 문서의 정보를 표현. leaf node.

모든 노드 객체는 Object, EventTarget(이벤트를 발생시키는 객체), Node(트리 자료구
조의 노드 객체) 인터페이스를 상속받는다.

프런트엔드 개발자에게 HTML은 단순히 태그와 어트리뷰트를 선언적으로 배치하여 뷰를
구성하는 것 이상의 의미를 갖는다. 즉, HTML을 DOM과 연관 지어 바라보아야 한다.

### 2. 요소 노드 취득

!@chapter39/getElementByID.html@!

**HTMLCollection**

- 객체의 상태 변화를 실시간으로 반영하는 live object이다.

**NodeList**

- 대부분 변화 반영 안하고 정적
- NodeList.prototype.forEach를 상속받아 사용할 수 있다.
- childNodes 프로퍼티가 반환하는 NodeList 객체는 live object이다.

!@chapter39/htmlCollectionTroll.html@!

노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection
이나 NodeList 객체를 배열로 변환하여 사용하는 것을 권장한다.

### 3. 노드 탐색

Node.prototype: parentNode, previousSibling, firstChild, childNodes
Element.prototype: previousElementSibling, nextElementSibling

html 요소 사이의 white space는 텍스트 노드를 생성한다.

!@chapter39/nodeTraversing.html@!

### 4. 노드 정보 취득

!@chapter39/nodeType.html@!

### 5. 요소 노드의 텍스트 조작

!@chapter39/changeNode.html@!

innerText는 CSS에 순종적(visibility등에 영향)이고 느리므로 사용하지 않는 것이 좋
다.

### 6. DOM 조작

!@chapter39/domManipulation.html@!

### 7. 어트리뷰트

HTML 요소가 파싱될 때 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결된
다. 어트리뷰트당 하나의 노드가 생성된다.

!@chapter39/attribute.html@!

HTML 어트리뷰트는 1. 요소 노드의 attributes 프로퍼티 2. 각 어트리뷰트에 대응되는
요소 노드의 프로퍼티(이하 DOM 프로퍼티) 로 중복 관리되는 것 같지만 다르다.

요소 노드의 초기 상태(새로고침 등 상황에서 사용)는 어트리뷰트 노드가, 최신 상태
는 DOM 프로퍼티가 관리한다.

사용자 입력과 관계있는 DOM 프로퍼티만 최신 상태 값을 관리하고, 그 이외에는 어트
리뷰트와 DOM 프로퍼티가 동일한 값으로 연동된다.

!@chapter39/dataAttribute.html@!

### 8. 스타일

!@chapter39/style.html@!

### 9. DOM 표준

구글, 애플, 마이크로소프트, 모질라로 구성된 WHATWG가 HTML과 DOM 단일 표준을 내놓
는다.

## 40. 이벤트

### 1. 이벤트 드리븐 프로그래밍

브라우저는 처리해야 할 특정 사건이 발생하면 이를 감지하여 이벤트를 발생시킨다.

> 이벤트가 발생했을 때 호출될 함수를 event handler, 이벤트가 발생했을 때 브라우
> 저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라 한다.

프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 이벤트 드리븐 프로
그래밍(event-driven programming)이라 한다.

### 2. 이벤트 타입

책에서 보기!

### 3. 이벤트 핸들러 등록

!@chapter40/register.html@!

### 4. 이벤트 핸들러 제거

removeEventHandler에 add때와 같은 인수를 전달한다. 따라서 무명 함수를 전달했으면
제거할 수 없다.

### 5. 이벤트 객체

이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달된다.

이벤트 객체는 모두 Object, Event를 상속받는다.

!@chapter40/eventObject.html@!

이벤트 객체의 프로퍼티 관련은 나중에 사전처럼 읽어보기.

!@chapter40/moveBox.html@!

### 6. 이벤트 전파

이벤트 전파(event propagation)

생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃(event target)을 중
심으로 DOM 트리를 통해 전파된다.

- 캡처링 단계: 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계: 이벤트가 이벤트 타깃에 도달
- 버블링 단계: 이벤트가 하위 요소에서 상위 요소 방향으로 전파

!@chapter40/eventPropagation.html@!

### 7. 이벤트 위임

> 이벤트 위임(event delegation)은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를
> 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법을 말한다.

!@chapter40/eventPropagation.html@!

### 8. DOM 요소의 기본 동작 조작

이벤트 객체의 preventDefault 메서드는 요소 별 기본 동작을 중단시킨다.

stopPropagation 메서드는 이벤트 전파를 중지시킨다.

### 9. 이벤트 핸들러 내부의 this

이벤트 핸들로 프로퍼티 방식과 addEventListener 내부에서 this는 currentTarget과같
다.

쓰지 말자,,,

### 10. 이벤트 핸들러에 인수 전달

pass

### 11. 커스텀 이벤트

pass

## 41. 타이머

### 1. 호출 스케줄링

> 함수를 명시적으로 호출하지 않고 일정 시간 이후에 함수 호출을 예약하려면 타이머
> 함수를 사용한다. 이를 호출 스케줄링(scheduling a call)이라 한다.

타이머 함수는 호스트 객체다.

자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖기에 싱글 스레드로 동작한다
. 이에 타이머 함수들은 비동기 처리 방식으로 동작한다.

### 2. 타이머 함수

setTimeout의 delay 매개변수는 그 시간 후 즉시 호출을 보장하지 않는다. 태스크 큐
에 등록하는 시간일 뿐.

!@chapter41/setTimeout.js@!

!@chapter41/setInterval.js@!

### 3. 디바운스와 스로틀

> 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서과
> 도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다.

!@chapter41/debounceThrottle.html@!

디바운스는 resize 이벤트 처리, 입력 필드 자동완성 UI 구현, 버튼 중복 클릭 방지처
리 등에 유용하게 사용된다. 위 예제는 완전하기 않으므로 Underscore나 Lodash의
debounce 함수를 사용한다.

스로틀은 scroll 이벤트 처리나 무한 스크롤 UI 구현에 사용된다. 마찬가리고 실무에
서는 다른걸 사용한다.

## 42. 비동기 프로그래밍

### 1. 동기 처리와 비동기 처리

자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 가지며 싱글 스레드 방식으로동
작한다. 이에 처리에 시간이 걸리는 태스크를 실행하면 블로킹(작업 중단)이 발생한다
.

> 현재 실행 중인 태스크가 종료할 떄까지 다음에 실행될 태스크가 대기하는 방식을동
> 기(synchronous) 처리라고 한다.

> 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방
> 식을 비동기(asynchronous) 처리라고 한다.

비동기 처리를 수행하는 비동기 함수는 전통적으로 콜백 패턴을 사용하지만, 콜백 헬
을 발생시켜 가독성을 나쁘게 하고 비동기 처리 중 발생한 에러의 예외 처리가 곤란하
다.

### 2. 이벤트 루프와 태스크 큐

> JS의 동시성(concurrency)을 지원하는 것이 이벤트 루프다.

비동기 처리에서 소스코드의 평가와 실행을 제외한 처리는 환경인 브라우저나 Node.js
에서 담당한다. 브라우저에서는 이를 위해 태스크 큐와 이벤트 루프를 제공한다.

- 태스크 큐: 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영
  역.
- 이벤트 루프: 콜 스택에 실행중인 컨텍스트가 있는지, 태스크 큐에 대기 중인 함수
  가 있는지 반복해서 확인. 함수가 있고 자리가 비었다면 FIFO로 태스크 큐에 대기중
  인 함수를 콜 스택으로 이동.

setTimeout 등에서 타이머의 설정과 타이머가 만료되면 콜백 함수를 태스크 큐에 퓨시
하는 것은 브라우저의 역할이다.

자바스크립트 엔진은 싱글 스레드지만 브라우저는 멀티 스레드이다.

## 43. Ajax

### 1. Ajax란?

> Ajax(Asynchronous Javascript and XML)란 자바스크립트를 사용하여 브라우저가 서
> 버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페
> 이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.
> [참고](https://www.w3schools.com/xml/ajax_intro.asp)

WebAPI인 XMLHttpRequest 객체를 기반으로 동작한다.

전통적인 방식은 화면 전환마다 HTML를 다시 렌더링하는 방식이여서 깜빡이고 느렸지
만, Ajax를 통해 비동기 방식으로 필요한 데이터만 전송받아 한정적인 렌더링이 가능
해졌다.

### 2. JSON

!@chapter43/json.js@!

> 객체의 문자열화를 직렬화(serializing)라 한다. JSON 포맷의 문자열을 객체화하는
> 것을 역직렬화(deserializing)라 한다.

### 3. XMLHttpRequest

HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)
을 알리는 방법이다. 5가지 요청 메서드를 사용하여
[CRUD](https://ko.wikipedia.org/wiki/CRUD)를 구현한다.

!@chapter43/request.html@!

## 44. REST API

> Rest는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아
> 키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

### 1. REST API의 구성

- 자원(resource, URI로 표현)
- 행위(verb, HTTP 요청 메서드로 표현)
- 표현(representations, 자원에 대한 행위의 구체적 내용, 페이로드로 표현)

자체 표현 구조(self-descriptiveness)로 구성된다.

### 2. REST API 설계 원칙

URI는 리소스를 표현하는데 집중하고, 행위에 대한 정의는 HTTP 요청 메서드를 통해한
다.

- GET: index/retrieve. 모든/특정 리소스 취득. 페이로드 없음
- POST: create. 리소스 생성. 페이로드 있음
- PUT: replace. 리소스의 전체 교체. 페이로드 있음.
  [멱등성](https://ko.wikipedia.org/wiki/%EB%A9%B1%EB%93%B1%EB%B2%95%EC%B9%99)
- PATCH: modify. 리소스의 일부 수정. 페이로드 있음
- Delete: delete. 모든/특정 리소스 삭제. 페이로드 없음

### 3. JSON Server를 이용한 REST API 실습

json-server-exam 폴더 참고.

db.json 파일은 리소스를 제공하는 데이터베이스 역할을 한다.

!@chapter44/json-server-exam/public/get_index.html@!

!@chapter44/json-server-exam/public/get_retrieve.html@!

!@chapter44/json-server-exam/public/post.html@!

!@chapter44/json-server-exam/public/put.html@!

!@chapter44/json-server-exam/public/patch.html@!

!@chapter44/json-server-exam/public/delete.html@!

## 45. 프로미스

### 1. 비동기 처리를 위한 콜백 패턴의 단점

!@chapter45/callback.html@!

비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할
당하면 기대한 대로 동작하지 않는다.

!@chapter45/callback.html@!

비동기 함수의 처리 결과에 대한 후속 처리는 콜백 함수를 전달하여 수행한다.

> 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상을 콜백 헬이라 한다.

에러는 호출자 방향으로 전파되지만 setTimeout 함수의 콜백 함수를 호출한 것은
setTimeout이 아니므로 catch 블록에서 캐치되지 않는다.

### 2. 프로미스의 생성

표준 빌트인 객체다.

생성자는 resolve와 reject를 인수로 전달받는 콜백 함수를 인수로 받는다.

프로미스의 상태 정보 [[PromiseStatus]]는 pending, fulfilled, rejected로 나뉘며뒤
두개를 묶어 settled 상태라 한다. settled 상태에서는 다른 상태로 변화할 수 없다.

> 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.

### 3. 프로미스의 후속 처리 메서드

프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함
수가 선택적으로 호출된다. 모든 후속 처리 메서드는 프로미스를 반환하며 비동기로동
작한다.

!@chapter45/thenCatchFinally.js@!

### 4. 프로미스의 에러 처리

then 메서드의 두번째 콜백 함수는 첫번째 콜백 함수에서의 에러를 채키하지 못하니
catch 메서드를 then 다음에 사용해서 해결하자.

### 5. 프로미스 체이닝

!@chapter45/promiseChaining.html@!

### 6. 프로미스의 정적 메서드

- Promise.resolve/reject는 이미 존재하는 값을 래핑하여 프로미스를 생성한다.
- Promise.all은 여러 비동기 처리를 병렬 처리할 때 사용한다. 전달받은 프로미스 배
  열의 요소들의 상태가 모두 fulfilled가 되면 처리 결과를 배열에 저장해 새로운 프
  로미스를 반환한다. 배열 순서는 유지?된다. 하나라도 reject되면 즉시 종료된다.
- Promise.race는 가장 먼저 fulfilled된 프로미스의 처리 결과를 resolve하는 새로운
  프로미스를 반환한다.
- Promise.allSettled는 프로미스가 모두 settled되면 결과를 빼열로 반환한다.
  fulfilled는 status, value 프로퍼티를, rejected는 status, reason 프로퍼티를 갖
  는다.

!@chapter45/promiseAll.html@!

### 7. 마이크로태스크 큐

!@chapter45/microtaskQueue.js@!

프로미스의 후속 처리 메서드의 콜백 함수는 마이크로태스크 큐에 저장된다. 마이크로
태스크 큐는 태스크 큐보다 우선순위가 높다.

### 8. fetch

fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문
에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다.

Response 객체를 래핑한 프로미스를 반환한다.

!@chapter45/fetch.js@!

## 46. 제너레이터와 async/await

### 1. 제너레이처란?

> ES6에서 도입된 제너레이터는 코드 블록의실행을 일시 중지했다가 필요한 시점에 재
> 개할 수 있는 특수한 함수다.

- 함수의 제어권을 함수 호출자에게 양도(yield)할 수 있다.
- 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
- 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

### 2. 제너레이터 함수의 정의

function 키워드와 함수 이름 사이에 \*를 넣는다.

### 3. 제너레이터 객체

!@chapter46/generatorObj.js@!

### 4. 제너레이터의 일시 중지와 재게

제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지된다
.

제너레이터 함수가 끝까지 실행되면 반환된 객체의 value 프로퍼티에 함수의 반환값이
할당된다.

!@chapter46/yield.js@!

### 5. 제너레이터의 활용

이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현
할 수 있다.

비동기 처리를 동기 처리처럼 구현할 수 있지만 aync/await를 사용하자.

!@chapter46/co.js@!

코드에 대해서는 책 설명 다시 읽어보기.

### 6. async/await

> ES8에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작
> 하도록 구현할 수 있는 async/await가 도입되었다.

!@chapter46/asyncAwait.js@!

## 47. 에러 처리

### 1. 에러 처리의 필요성

발생한 에러에 대해 대처하지 않고 방치하면 프로그램은 강제 종료된다.

### 2. try...catch...finally 문

finally 코드 블록은 에러 발생과 상관없이 반드시 한 번 실행된다.

### 3. Error 객체

Error 생성자 함수에 에러 메시지를 전달할 수 있고, 생성된 객체는 message와 stack
프로퍼티를 가진다.

SyntaxError, ReferenceError, TypeError, RangeError, URIError, EvalError 가 있다.

### 4. throw 문

에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

### 5. 에러의 전파

throw된 에러를 캐치하지 않으면 호출자 방향으로 전파된다. 비동기 함수인
setTimeout이나 프로미스 후속 처리 메서드의 콜백 함수는 호출자가 없음을 주의한다.

## 48. 모듈

### 1. 모듈의 일반적 의미

> 모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말
> 한다.

모듈은 공개가 필요한 자산에 한정하여 export를 통해 선택적 공개가 가능하다. 모듈
사용자는 공개된 자산 중 일부 또는 전체를 import를 통해 자신의 스코프 내로 불러들
여 재사용할 수 있다.

### 2. 자바스크립트와 모듈

자바스크립트는 본래 하나의 전역을 공유해 모듈 구현이 없었으나, CommonJS와
AMD(Asynchronous Module Definition)가 제안되었다.

브라우저 환경에서 모듈을 사용하기 위해서는 이들을 구현한 모듈 로더 라이브러리를
사용해야했다.

Node.js는 사실상 표준(de factor standard)인 CommonJS를 채택했고 독자적인 진화를
거쳤다.

### 3. ES6 모듈

ES6에서 클라이언트 사이드 JS에서도 동작하는 모듈 기능을 추가했다. ES6 Module,
ESM.

script 태그에 type="module"을 추가하면 로드된 JS 파일은 모듈로서 동작한다. ESM의
확장자는 mjs로 명시하는 것이 좋다.

ES6는 독자적인 모듈 스코프를 갖는다. export 키워드와 import 키워드를 사용할 수있
다.

require는 NodeJS에서 사용되고 있는 CommonJS 키워드이고, import는 ES6에서 도입된
키워드이다.

## 49. Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축

### 1. Babel

> Babel은 ES6+/ES.NEXT로 구현된 최신 사양의 소수코드를 구형 브라우저에서도 동작
> 하는 소스코드로 변환(트랜스파일링)할 수 있다.

> @babel/preset-env는 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 Babel
> 프리셋이라고 부른다.

### 2. Webpack

> Webpack은 의존 관계에 있는 JS, CSS, 이미지 등의 리소스들을 하나(또는 여러 개)
> 의 파일로 번들링하는 모듈 번들러다.
