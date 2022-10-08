---
title: Effective Typescript
---

> Effective TypeScript by Dan Vanderkam, published by O'Reilly Media.

> ‘This book is not just about what TypeScript can do—it teaches why each language feature is useful, and where to apply patterns to get the greatest effect’ Jesse Hallett, Senior Software Enginner, Originate, Inc.

[https://effectivetypescript.com](https://effectivetypescript.com)

## Preface

TypeScript is more than just a type system. It also brings a whole shite of language services which are fast and easy to use.

## 1. Getting to Know TypeScript

타입스크립트는 다른 컴파일러나 인터프리터와는 다르게 또다른 고수준 언어로 컴파일한다.

### 1. TS와 JS의 관계 이해하기

문법적인 측면에서 TS는 JS의 상위 집합이다.

TS가 static 타입 시스템이라는 것은 코드를 실행하지 않고도 런타임에 예외를 던질코드를 찾아낼 수 있다는 것이다. 이것이 TS 타입 시스템의 목표이다.

Type annotation은 TS에게 개발자의 의도를 전달한다.

타입 시스템은 JS의 런타임 행동을 모델링한다. [] + 12 같은 경우는 goes beyond simply modeling the runtime behavior.

정적 타입의 안정성을 보장할 수 있는 타입 시스템을 sound하다고 한다. TS는 sound하지는 않다.

### 2. 사용하고 있는 TS 옵션 알기

Configuration 파일을 선호하라.

noImplicitAny와 strictNullCheck가 가장 중요하다.

TS는 strict 옵션을 통해 거의 모든 에러를 잡아낼 수 있다.

### 3. 코드 생성이 타입과 무관함을 이해하기

타입스크립트는 크게 transpiling과 type error 체크 두가지 일을 한다. 각각은 서로전혀 간섭하지 않는다. 코드의 타입은 생성되는 JS 파일에 영향을 끼치지 않는다.

따라서 컴파일이 안됐다는 표현보다 doesn't type check(타입이 옳지 않다?)라는 표현을 사용해야 한다.

> You should aim for zero erros when you commit code, lest you fall into trap of having to remember what is an expected or unexpected error.

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
const d: C = { foo: 'object literal' }; // 가능
// Object.prototype에서 온 constructor가 존재한다.
```

### 5. any 타입의 사용 제한하기

any는 TS의 많은 장점을 없앤다.

## 2. TypeScript's Type System

nuts and bolds of TS's type system.

### 6. 타입 시스템의 탐색과 interrogate를 위해 에디터 사용하기

TypeScript에는 두가지 executables가 있다. tsc는 컴파일러, tsserver는 TS standalone server. 서버 또한 language service를 제공하기에 매우 중요하며 에디터를 통해 해당 서비스를 사용하게 된다. 'Go to Definition'도 이 서비스가 제공해줌.

### 7. 타입을 값들의 집합으로 보기

> 가장 작은 집합은 어떤 값도 없는 공집합이다. 이는 never 타입에 대입된다. Domain 이 비어있기 때문에어떤 값도 이 타입을 가지는 변수에 대입할 수 없다.

TS에서 assignable하다는 것은 value가 type의 요소거나, type이 type의 부분집합임을의미한다.

타입 연산은 값들의 집합에 적용되지, 인터페이스의 프로퍼티에 적용되는 것이 아니다 . 따라서 아래가 성립한다.

!@chapter2/typeAsSet.ts@!

```ts
keyof (A&B) = (keyof A) | (keyof B)
keyof (A|B) = (keyof A) & (keyof B)
```

> extends는 assignable to 와 마찬가지로 부분집합 개념으로 해석할 수 있다.

> Think of “extends,” “assignable to,” and “subtype of” as synonyms for “subset of.

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

You can go between the constructor type and the instance type using the InstanceType generic??

```ts
type C = InstanceType<typeof Cylinder>;
```

위 예제에서 Cylinder는 class로 선언되었어야 한다. 클래스와 열거형은 타입과 값 모두를 가진다. The TypeScript type introduced by a class is based on its shape (its properties and methods) while **the value is the constructor**.

InstanceType이 constructor의 타입을 사용해서 그냥 Cylinder는 안되고 typeof Cylinder를 사용해서 값 타입의 Cylinder 즉 constructor의 타입을 사용해야되는건가.

**typeof는 항상 값에서 작동한다**

"foo"는 문자열 리터럴일 수도, 문자열 리터럴 타입일 수도 있다.

### 9. 타입 assertion보다 타입 선언을 선호하기

```ts
const people = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));
// 물론 people에 달 수도 있지만 체인이 있으면 이 방법을 사용해야함.
```

Type assertions make the most sense when you truly do know more about a type than TypeScript does, typically from context that isn’t available to the type checker.

Type assertion은 두 타입간에 교집합이 있어야 가능하다. unknown은 모든 타입의 subtype이므로 as unknown as A로 하는 escape hatch가 있다.

### 10. Wrapper Type 기피하기(String, Number...)

래퍼 타입을 직접 인스턴스화할 이유는 없다. new 없이 BigInt와 Symbol을 사용하는것은 어차피 primitive 를 뱉으므로 괜찮다.

### 11. Excess Property Checking의 한계 알기

Object literal을 사용할 때는 알려지지 않은 프로퍼티를 제한한다.

Recognizing excess property checking as a distinct process will help you build a clearer mental model of TypeScript’s type system.

!@chapter2/excessPropertyChecking.ts@!

순수한 structural type checker는 위와 같은 실수를 찾아내지 못한다.

다만 다른 변수에 담고 전달하거나 type assertion을 사용했으면 동작하지 못한다.

프로퍼티가 다 weak(? 붙은건가)한 객체는 거기서 적어도 하나는 가지고 있는지를 확인하는 단계가 추가된다.

객체 리터럴에만 적용된다는 점 주의.

### 12. 가능한 경우 함수 표현식 전체에 타입을 적용하기

Consider applying type annotations to entire function expressions, rather than to their parameters and return type.

```ts
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => {};
```

반복을 줄일 수 있다. 타입 표시와 로직을 분리할 수 있다.

```ts
const checkedFetch: typeof fetch = async (input, init) => {
  const reponse = await fetch(input, init);
  if (!reponse.ok) {
    throw new Error('Request failed: ' + response.status);
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

다만, 인터페이스는 augmented될 수 있다. delcaration merging. 누구도 내 타입을 augment할 수 없게 하려면 type을 쓰면 된다.

복잡한 타입에는 선택지 없이 type을 사용하고, 이외의 경우 기존 코드와 통일성있게작성하고 혹시 다른 유저에 의해 확장이되어야하면 interface를 사용한다.

### 14. 반복을 막기 위해 타입 연산과 제너릭을 사용하기

DRY principle: don’t repeat yourself. It’s the closest thing to universal advice that you’ll find in software development.

타입에서의 반복도 막아야한다.

!@chapter2/stateExtend.ts@!

!@chapter2/taggedUnionTyping.ts@!

'typeof 값'을 써도 좋지만 보통은 타입을 먼저 선언하고 이에 맞게 값을 할당하는 것이 좋다.

> Note that ReturnType operates on typeof getUserInfo, the function’s type, rather than getUserInfo, the function’s value. As with typeof, use this technique judiciously. Don’t get mixed up about your source of truth.

로직의 DRY를 위해 함수를 사용하고, 타입의 DRY를 위해 제너릭을 사용한다. 제너릭은타입의 DRY를 위한 핵심이다. 값을 한정하기 위해 타입을 사용하고, 타입을 한정하기위해 extends를 사용한다.

### 15. 동적인 데이터에 index signature 사용하기

```ts
type Rocket = { [property: string]: string };
```

키의 이름, 키의 타입, 값의 타입으로 구성된다. 키의 이름은 문서화 목적 외에는 타입 체커에게 사용되지않는다.

Index signature는 부정확하고, 보통 더 나은 대안이 있다.

Truly dynamic data에 보통 사용된다. 런타임까지는 정확한 값을 알 수 없는 경우. 더안전하게 하려면 undefined를 사용하자. 반환값이 string | undefined인 느낌.

Record나 Mapped type을 사용하는 대안도 있다.

```ts
type Vec3D = Record<'x' | 'y' | 'z', number>;
type ABC = { [k in 'a' | 'b' | 'c']: k extends 'b' ? string : number };
```

### 16. Index Signature보다 배열, 튜플 선호하기

배열도 객체이고 number 타입의 키값으로 접근하지만 실제로는 문자열로 변환되어 사용된다.

TS에서는 숫자키와 문자키를 구분하지만 실제로는 그렇지 않음을 유념하자.

for...in보다 for...of나 forEach, for(;;)를 선호하자. for-in이 훨씬 느리다고 함.

숫자로 인덱싱되는 자료구조가 필요하면 배열이나 튜플을 사용하자.

### 17. mutation관련 에러를 막기 위해 readonly 사용하기

함수에 건네준 패러미터가 바뀌지 않는다는 확신을 위해 readonly를 사용할 수 있다.

number[]는 readonly number[]의 서브타입이다.

readonly는 전염성있다.

```ts
// 변수가 가리키는 배열은 바뀔 수 있으나 배열 자체는 바뀔 수 없다.
let currPara: readonly string[] = [];
```

readonly is shallow.

### 18. 값들을 sync하기 위해 Mapped Type 사용하기

fail closed / fail open

!@chapter2/mappedType.ts@!

## 3. Type Inference

> An experienced TypeScript developer will use relatively few annotations (but use them to great effect), while a beginner may drown their code in redundant type annotations.

### 19. 추론 가능한 타입으로 코드 어지럽히지 않기

이상적인 TS 코드는 함수/메소드 signiture의 타입은 명시하고, 함수 몸체의 지역 변수에는 생략하여 노이즈를 최소화하고 읽는 사람이 구현 로직에 집중할 수 있게 한다.

객체 리터럴로 초기화 하는 경우에는 명시해도 좋다. excess property checking.

**함수 구현 이전에 함수의 signiture을 명확히 알고 있어야 한다.** TDD와도 유사.

객체 리터럴과 함수 반환값에 대해서는 추론 가능해도 타입을 명시하는 것을 고려해보기.

### 20. 다른 타입이면 다른 변수 사용하기.

union 타입은 미래에 문제를 일으킬 수 있다(create more issues down the road). 타입 체크가 필요하므로다루기 어렵다.

union타입에서 서로 다른 두 변수로 나누면,

- 엮인 두 개념을 분리하고,
- 더 자세한 변수 이름을 쓸 수 있으며,
- 타입 명시가 필요 없고 타입 추론을 개선한다.
- 더 간단한 타입을 사용하게 되며
- const로 변수를 선언할 수 있어진다.

type-chainging 변수를 기피하라.

### 21. 타입 확장 이해하기

let으로 변수를 선언하면 TS는 여러 선택지들 중 적당한 타입을 선택한다. const로 선언하면 더 좁은 타입이 된다.

TypeScript is trying to strike a balance between specificity and flexibility.

값 뒤에 as const를 쓰면 타입스크립트는 가능한 좁은 타입으로 추론한다.

### 22. 타입 축소 이해하기

!@chapter3/typeGuard.ts@!

### 23. 객체 한번에 생성하기

spread operator를 활용

!@chapter3/objectAtOnce.ts@!

### 24. alias 일관적으로 사용하기

```ts
const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
const loc = borough.location;
```

변수에 새로운 이름을 부여해는 것을 alias라고 한다. control flow 분석을 어렵게 하기 때문에 alias는 컴파일러 개발자에게 재앙이다.

같은 값을 담은 변수가 여러개 있으면 TS의 타입 체킹에서도 실수가 발생할 수 있다. If you introduce an alias, use it consistently.

const bbox = polygon.box; 보다는 const {box} = polygon;을 선호하자.

!@chapter3/functionPremise.ts@!

### 25. 콜백보다 async 함수 사용하기

콜백 방식에서 실행 순서는 코드 순서의 정반대이다.

!@chapter3/race.ts@!

함수는 sync하게 동작하거나 async하게 동작하거나 둘 중 하나만 해야한다. Promise.resolve가 이를 도움.

!@chapter3/asyncMixed.ts@!

Promise나 callback에서는 위와 같은 짓을 하기 쉽지만 async/await에서는 어렵다.

### 26. 타입 추론에 맥락이 어떻게 활용되는지 알기

타입스크립트는 변수가 처음 도입(introduce)?될 때 그 타입을 결정한다.

원하는 타입이 아니라면 타입 선언을 하거나 const context를 통해 shallow constant가 아닌 deep constant 임을 알리면 된다.

const contexts can neatly solve issues around losing context in inference, but they do have an unfortunate downside: if you make a mistake in the definition (say you add a third element to the tuple) then the error will be flagged at the call site, not at the definition. This may be confusing, especially if the error occurs in a deeply nested object??

### 27. 타입의 흐름을 돕지 위해 Functional Construct나 라이브러리 사용하기

hand-rolled loop는 타입을 직접 다루어야한다.

!@chapter3/typeLibrary.ts@!

type flow를 개선하고, 가독성을 개선하고, 타입 명시의 필요성을 낮출 수 있다.

## 4. Type Design

> Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won’t usually need your flowcharts; they’ll be obvious. Fred Brooks, The Mythical Man Month

데이터나 데이터 타입을 모르면 코드를 이해하기 어렵다. 타입을 잘 짜면 flowchart가 명확해진다.

타입을 어떻게 디자인할지 이 챕터에서 살펴보자.

### 28. 항상 유효한 상태를 나타내는 타입을 선호하기

효과적인 타입 디자인의 열쇠는 유효한 상태만 표현할 수 있도록 타입을 설계하는 것이다.

표현하기 길고 어려울 수록 결국에는 시간과 고통을 절약해준다.

### 29. 넓게 수용하고 엄격하게 생산하기

함수가 넓은 범위의 값을 입력으로 받는 것은 좋지만, 일반적으로 받은 것보다 상세한 것을 반환해야한다.

반환값에 optional 프로퍼티와 union type이 많은 함수는 사용하기 어렵다.

### 30. 문서에 타입 정보 반복하지 않기

코드와 주석이 일치하지 않으면 둘 다 틀렸다~!

강제하지 않으면 그 어떤 것도 sync되지 않는다.

단위가 중요하고 타입만으로 충분하지 않다면 변수명에 포함시키자(temperatorC, timeMs...).

### 31. null값을 타입 주변에 씌우기

undefined가 많은 객체는 클라이언트가 사용하기 힘들다.

```ts
// 혼란스럽고 null 체크 범벅이 된다.
class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;

  constructor() {
    this.user = null;
    this.posts = null;
  }

  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }

  getUserName() {
    // ...?
  }
}

// nullable 프로퍼티를 프로미스로 바꾸지는 말자. 모든 메서드가 비동기임이 강제됨.
// 프로미스는 데이터를 로드하는 코드는 명확하게 하지만 데이터를 사용하는 코드에는 정반대의 영향을 끼침
class UserPosts {
  user: UserInfo;
  posts: Post[];

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([fetchUser(userId), fetchPostsForUser(userId)]);
    return new UserPosts(user, posts);
  }

  getUserName() {
    return this.user.name;
  }
}
```

특정 값의 null 여부가 암묵적으로 다른 값의 상태에 달려있는 디자인을 피하자.

모든 값이 사용 가능해지면 non-null 클래스를 만드는 것을 고려해보자.

### 32. Union들의 인터페이스보다 인터페이스의 union을 선호하기

TS의 타입 체커와 잘 어울려서 tagged union은 널리 사용된다.

union 타입인 프로퍼티를 여러개 가지는 인터페이스는 각각 프로퍼티간의 관계를 흐릿하게 하기에 보통은잘못 디자인된 것이다.

### 33. string 타입보다 상세한 대안 찾기

!@chapter4/pluck.ts@!

### 34. 부정확한 타입보다 미완성된 타입 선호하기

Avoid the uncanny valley of type safety: incorrect types are often worse than no types.

새로운 타입 선언이 더 자세하지만 자동완성을 break한다면 TS 개발 경험을 저해시킬 것이다.

### 35. 데이터가 아닌 API나 스펙을 통해 타입 만들기

There is no risk that your types and reality diverge since they are both coming from a single source of truth

### 36. 도메인에 맞는 타입 이름 사용하기

Synonym의 사용이 작문에서는 유용해도 코드에서는 그렇지 않음을 알자. 같은 뜻이면 같은 이름을 사용하자 .

구현이 아닌 사용을 중심으로 이름을 지으면 추상화 정도를 높일 수 있고 inadvertent collision?의 위험성을 줄일 수 있다.

data, info, thing, item, object와 같은 애매하고 무의미한 변수의 사용을 피하자.

### 37. Nominal type에서 brand의 사용 고려해보기

> This is purely a game with the type system.

!@chapter4/brand.ts@!

## 5. Working with any

기존에는 fully static type system / fully dynamic type system으로 나뉘었지만, TS의 타입 시스템은 optional/gradual하다.

### 38. 좁은 스코프에서 any 사용하기

함수에서 any 반환값은 전염성이 있다.

에러를 silence하고 싶으면 **@ts-ignore** 활용하기.

```ts
const bad: Config = {
  a: 1,
  b: 2,
} as any;

const good: Config = {
  a: 1,
  b: 2 as any,
};
```

### 39. 그냥 any보다는 자세한 variant 쓰기

배열이면 any[], 값을 모르는 객체면 {[key: string]: any}.

object는 원시형이 아닌 모든 타입. 키 순회는 되지만 이걸로 값 접근은 못함.

```ts
const numArgsBad = (...args: any) => args.length; // Returns any
const numArgsGood = (...args: any[]) => args.length; // Returns number
```

### 40. 잘 타입된 함수 안에 위험한 type assertion 숨기기

!@chapter5/cacheLast.ts@!

### 41. Understand Evolving any

일반적으로 TS에서 타입은 선언될 때 결정되고, 이후에는 refined될 수 있지만 expand될 수는 없다.

> This is only enabled if noImplicitAny is set.

!@chapter5/evolvingAny.ts@!

왜 안되나 했네,, tsconfig.json 추가하니 잘 됨

그래도 이거 쓰지 말고 타입을 명시해주자.

### 42. 알려지지 않은 타입에는 any 대신 unknown을 사용하자

YAML can represent the same set of values as JSON but allows a superset of JSON’s syntax

모든 타입이 any에 대입 가능하고, any 또한 모든 타입에 대입 가능하다. 하지만 특정 집합이 다른 모든 집합의 subset인 동시에 superset일 수는 없으므로 any는 타입 시스템에 fit하지 못하다.

unknown은 모든 타입이 unknown에 대입 가능하다는 첫번째 속성만 지닌다.

never는 다른 모든 타입에 대입될 수 있다는 두번째 속성만 지닌다.

unknown은 값이 있다는건 알지만 그 값이 무엇인지 모를 때 유용하다.

```ts
// type assertion과 다를 것이 없다.
// unknown을 반환하는 것이 낫다.
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
```

```ts
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
// 리팩터링으로 쪼개졌을 때 후자가 더 안전하다.
```

{} 타입은 null과 undefined를 제외한 모든 값이 가능하다. unknown 생기기 전에 많이 씀.

object 타입은 원시형이 아닌 모든 값이 가능하다.

### 43. Monkey patching보다 타입 안전한 방법 사용하기

jQuery 등에서 자주 사용되는 monkey patching은 프로그램의 먼 부분끼리의 의존성을 부주의하게 더할 수 있고, 함수를 부를 때마다 side effect에 대해 생각해보아야되게 한다.

어쩔 수 없이 써야 한다면 augmentation을 활용한다.

```ts
interface Document {
  monkey: string;
}
```

module context에서는 declare global을 활용한다,,,?

**여기 챕터는 나중에 다시 읽어보기**

- Prefer structured code to storing data in globals or on the DOM.

- If you must store data on built-in types, use one of the type-safe approaches (augmentation or asserting a custom interface).

- Understand the scoping issues of augmentations.

## 6. Types Declarations and @types

## 7. Writing and Running Your Code

## 8. Migrating to TypeScript
