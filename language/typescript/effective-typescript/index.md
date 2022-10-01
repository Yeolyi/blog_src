---
title: Effective Typescript
---

> Effective TypeScript by Dan Vanderkam, published by O'Reilly Media.

> ‘This book is not just about what TypeScript can do—it teaches why each
> language feature is useful, and where to apply patterns to get the greatest
> effect’ Jesse Hallett, Senior Software Enginner, Originate, Inc.

## Preface

TypeScript is more than just a type system. It also brings a whole shite of
language services which are fast and easy to use.

## 1. Getting to Know TypeScript

타입스크립트는 다른 컴파일러나 인터프리터와는 다르게 또다른 고수준 언어로 컴파일
한다.

### 1. TS와 JS의 관계 이해하기

문법적인 측면에서 TS는 JS의 상위 집합이다.

TS가 static 타입 시스템이라는 것은 코드를 실행하지 않고도 런타임에 예외를 던질코
드를 찾아낼 수 있다는 것이다. 이것이 TS 타입 시스템의 목표이다.

Type annotation은 TS에게 개발자의 의도를 전달한다.

타입 시스템은 JS의 런타임 행동을 모델링한다. [] + 12 같은 경우는 goes beyond
simply modeling the runtime behavior.

정적 타입의 안정성을 보장할 수 있는 타입 시스템을 sound하다고 한다. TS는 sound하
지는 않다.

### 2. 사용하고 있는 TS 옵션 알기

Configuration 파일을 선호하라.

noImplicitAny와 strictNullCheck가 가장 중요하다.

TS는 strict 옵션을 통해 거의 모든 에러를 잡아낼 수 있다.

### 3. 코드 생성이 타입과 무관함을 이해하기

타입스크립트는 크게 transpiling과 type error 체크 두가지 일을 한다. 각각은 서로
전혀 간섭하지 않는다. 코드의 타입은 생성되는 JS 파일에 영향을 끼치지 않는다.

따라서 컴파일이 안됐다는 표현보다 doesn't type check(타입이 옳지 않다?)라는 표현
을 사용해야 한다.

> You should aim for zero erros when you commit code, lest you fall into trap of
> having to remember what is an expected or unexpected error.

**런타임에 TS 타입 체크는 할 수 없다**

!@chapter1/runtimeTypeCheck.ts@!

값은 내가 선언한 타입 이외에 다른 타입도 가질 수 있다.

### 4. Structural Typing에 익숙해지기

JS는 기본적으로 duck typed. 오리처럼 걷고 말하면 오리임.

structural type system / nominative system. TS는 전자.

!@chapter1/structuralType.ts

클래스도 structural typing rule을 따르기에 아래와 같은 경우가 생길 수도 있다.

```ts
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}
const d: C = { foo: "object literal" }; // 가능
// Object.prototype에서 온 constructor가 존재한다.
```

### 5. any 타입의 사용 제한하기

any는 TS의 많은 장점을 없앤다.

## 2. TypeScript's Type System

nuts and bolds of TS's type system.

### 6. 타입 시스템의 탐색과 interrogate를 위해 에디터 사용하기

TypeScript에는 두가지 executables가 있다. tsc는 컴파일러, tsserver는 TS
standalone server. 서버 또한 language service를 제공하기에 매우 중요하며 에디터
를 통해 해당 서비스를 사용하게 된다. 'Go to Definition'도 이 서비스가 제공해줌.

### 7. 타입을 값들의 집합으로 보기

> 가장 작은 집합은 어떤 값도 없는 공집합이다. 이는 never 타입에 대입된다. Domain
> 이 비어있기 때문에 어떤 값도 이 타입을 가지는 변수에 대입할 수 없다.

TS에서 assignable하다는 것은 value가 type의 요소거나, type이 type의 부분집합임을
의미한다.

타입 연산은 값들의 집합에 적용되지, 인터페이스의 프로퍼티에 적용되는 것이 아니다
. 따라서 아래가 성립한다.

!@chapter2/typeAsSet.ts@!

```ts
keyof (A&B) = (keyof A) | (keyof B)
keyof (A|B) = (keyof A) & (keyof B)
```

> extends는 assignable to 와 마찬가지로 부분집합 개념으로 해석할 수 있다.

> Think of “extends,” “assignable to,” and “subtype of” as synonyms for “subset
> of.

### 8. 심벌이 타입 공간에 있는지 값 공간에 있는지 알기

Type space / Value space

이름은 같아도 속한 공간에 따라 다른 것을 지칭할 수도 있다.

```ts
interface Cylinder {
  radius: number;
  height: number;
}
const Cylinder = (radius: number, height: number) => ({ radius, height });

if (shape instanceof Cylinder) {
  shape.radius;
  // Property 'radius' does not exist on type '{}'
}
```

You can go between the constructor type and the instance type using the
InstanceType generic??

```ts
type C = InstanceType<typeof Cylinder>;
```

위 예제에서 Cylinder는 class로 선언되었어야 한다. 클래스와 열거형은 타입과 값 모
두를 가진다. The TypeScript type introduced by a class is based on its shape
(its properties and methods) while **the value is the constructor**.

InstanceType이 constructor의 타입을 사용해서 그냥 Cylinder는 안되고 typeof
Cylinder를 사용해서 값 타입의 Cylinder 즉 constructor의 타입을 사용해야되는건가.

**typeof는 항상 값에서 작동한다**

"foo"는 문자열 리터럴일 수도, 문자열 리터럴 타입일 수도 있다.

### 9. 타입 assertion보다 타입 선언을 선호하기

```ts
const people = ["alice", "bob", "jan"].map((name): Person => ({ name }));
// 물론 people에 달 수도 있지만 체인이 있으면 이 방법을 사용해야함.
```

Type assertions make the most sense when you truly do know more about a type
than TypeScript does, typically from context that isn’t available to the type
checker.

Type assertion은 두 타입간에 교집합이 있어야 가능하다. unknown은 모든 타입의
subtype이므로 as unknown as A로 하는 escape hatch가 있다.

### 10. Wrapper Type 기피하기(String, Number...)

래퍼 타입을 직접 인스턴스화할 이유는 없다. new 없이 BigInt와 Symbol을 사용하는것
은 어차피 primitive를 뱉으므로 괜찮다.

### 11. Excess Property Checking의 한계 알기

Object literal을 사용할 때는 알려지지 않은 프로퍼티를 제한한다.

Recognizing excess property checking as a distinct process will help you build a
clearer mental model of TypeScript’s type system.

!@chapter2/excessPropertyChecking.ts@!

순수한 structural type checker는 위와 같은 실수를 찾아내지 못한다.

다만 다른 변수에 담고 전달하거나 type assertion을 사용했으면 동작하지 못한다.

프로퍼티가 다 weak(? 붙은건가)한 객체는 거기서 적어도 하나는 가지고 있는지를 확
인하는 단계가 추가된다.

객체 리터럴에만 적용된다는 점 주의.

### 12. 가능한 경우 함수 표현식 전체에 타입을 적용하기

Consider applying type annotations to entire function expressions, rather than
to their parameters and return type.

```ts
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => {};
```

반복을 줄일 수 있다. 타입 표시와 로직을 분리할 수 있다.

```ts
const checkedFetch: typeof fetch = async (input, init) => {
  const reponse = await fetch(input, init);
  if (!reponse.ok) {
    throw new Error("Request failed: " + response.status);
  }
  return reponse;
};
```

### 13. 타입과 인터페이스의 차이 알기

```ts
// interface로 함수를 정의할 수 있다.
// 좀 이상해보여도 함수도 객체인걸 생각하면 괜찮다.
interface IFn {
  (x: number): string;
}
```

인터페이스는 union 타입같은 complex type은 extend할 수 없다.

union interface는 없다.

type이 더 gerenral하고 capable하다. 튜플 타입을 만들기에도 쉽다.

```ts
type Pair = [number, number];
interface Tuple {
  0: number;
  1: number;
  length: 2;
  // 하지만 concat같은 tuple method가 전부 사라진다.
  // type 쓰는게 나음
}
```

다만, 인터페이스는 augmented될 수 있다. delcaration merging. 누구도 내 타입을
augment할 수 없게 하려면 type을 쓰면 된다.

복잡한 타입에는 선택지 없이 type을 사용하고, 이외의 경우 기존 코드와 통일성있게
작성하고 혹시 다른 유저에 의해 확장이되어야하면 interface를 사용한다.

### 14. 반복을 막기 위해 타입 연산과 제너릭을 사용하기

DRY principle: don’t repeat yourself. It’s the closest thing to universal advice
that you’ll find in software development.

타입에서의 반복도 막아야한다.

!@chapter2/stateExtend.ts@!

!@chapter2/taggedUnionTyping.ts@!

'typeof 값'을 써도 좋지만 보통은 타입을 먼저 선언하고 이에 맞게 값을 할당하는 것
이 좋다.

> Note that ReturnType operates on typeof getUserInfo, the function’s type,
> rather than getUserInfo, the function’s value. As with typeof, use this
> technique judiciously. Don’t get mixed up about your source of truth.

로직의 DRY를 위해 함수를 사용하고, 타입의 DRY를 위해 제너릭을 사용한다. 제너릭은
타입의 DRY를 위한 핵심이다. 값을 한정하기 위해 타입을 사용하고, 타입을 한정하기
위해 extends를 사용한다.

### 15. 동적인 데이터에 index signature 사용하기

```ts
type Rocket = { [property: string]: string };
```

키의 이름, 키의 타입, 값의 타입으로 구성된다. 키의 이름은 문서화 목적 외에는 타
입 체커에게 사용되지 않는다.

Index signature는 부정확하고, 보통 더 나은 대안이 있다.

Truly dynamic data에 보통 사용된다. 런타임까지는 정확한 값을 알 수 없는 경우. 더
안전하게 하려면 undefined를 사용하자. 반환값이 string | undefined인 느낌.

Record나 Mapped type을 사용하는 대안도 있다.

```ts
type Vec3D = Record<"x" | "y" | "z", number>;
type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number };
```

## 3. Type Inference

## 4. Type Design

## 5. Working with any

## 6. Types Declarations and @types

## 7. Writing and Running Your Code

## 8. Migrating to TypeScript
