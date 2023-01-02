---
title: The TypeScript Handbook
---

## 출처 

다음에서 발췌 TypeScript Handbook TypeScript Team and Open Source Contributors 이 자료는 저작권에 의해 보호됩니다.

> Handbook is not a complete language specification, but it is intended to be a comprehensive guide to all of the language’s features and behaviors.

## The Basics

> Step one in learning TypeScript: The basic types

JavaScript only truly provides dynamic typing - running the code to see what happens.

Static types systems describe the shapes and behaviors of what our values will be when we run our programs.

> tsc: Typescript compiler

The compiler tries to emit clean readable code that looks like something a person would write.

```js
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}
greet('Brendan');
// tsx hello.js
// 에러가 나지만 js 파일이 생기기는 함
// --noEmitOnError면 에러 있으면 파일을 만들지 않음.
function greet(person, date) {
  // --target es2015 옵션을 주면 concat을 사용 안함
  console.log('Hello '.concat(person, ', today is ').concat(date, '!'));
}
greet('Brendan');
```

One of TypeScript's core values: much of the time, you will know better than TypeScript.

It's best not to add annotations when the type system would end up inferring the same type anyway.

**Type annotations never change the runtime behavior of your program.**

> This process of moving from a newer or "higher" version of ECMAScript down to an older or "lower" one is sometimes called downleveling. (기본값 ES3)

strict 세팅 관련되어 가장 눈에 띄는? 플래그로 noImplicitAny와 strictNullChecks가있다. 전자는 implicit하게 any로 추론된 변수에 에러를 뿜고, 후자는 원래는 그냥 대입 가능한 null/undefined의 체크를확실히 한다.

[billion dollar mistake](https://www.youtube.com/watch?v=ybrQvs4x0Ps)

## Everyday Types

> The language primitives.

String, Number, Boolean 대문자는 쓰기 말기.

The any type is useful when you don't want to write out a long type just to convince TypeScript that a particular line of code is okay.

> Conceptual typing: 함수가 사용되는 맥락이 함수(패러미터)가 가져야 하는 타입을알려준다.

When you read from an optional property, you'll have to check for undefined before using it.

> A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union's members.

> A type alias is exactly that - a name for any type.

```ts
type Point = {
  x: number;
  y: number;
};
```

Note that aliases are only aliases - you cannot use type aliases to create different/distinct "versions" of the same type.

Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

By combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values.

```
const req = { url: "https://example.com", method: "GET" };handleRequest(req.url, req.method); // 'string'을 "GET" | "POST"에 대입할 수 없음.

// "GET" as "GET"으로 type assertion을 사용하거나,
// as const를 붙여 객체 전체를 type literal로 변환할 수 있다.

```

[DeepReadonly](https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript)

## Narrowing

> Understanding how TypeScript uses JavaScript knowledge to reduce the amount of type syntax in your projects.

> It looks at these special checks (called type guards) and assignments, and the process of refining types to more specific types than declared is called narrowing.

```ts
Boolean('hello'); // type: boolean
!!'Hello'; // type: true
```

To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:

!@typePredicate.ts@!

!@dest/typePredicate.js@!

> When every type in a union contains a common property with literal types, TypeScript considers that to be a **discriminated union**, and can narrow out the members of the union.

!@discriminatedUnion.ts@!

!@dest/discriminatedUnion.js@!

They’re good for representing any sort of messaging scheme in JavaScript, like when sending messages over the network (client/server communication), or encoding mutations in a state management framework.

When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have nothing left. In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.

The never type is assignable to every type; however, no type is assignable to never (except never itself). This means you can use narrowing and rely on never turning up to do exhaustive checking in a switch statement.

!@neverSwitch.ts@!

## More on Functions

> Learn about how Functions work in TypeScript.

```ts
// Call signiture
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
// Construct signiture
type SomeConstructor = {
  new (s: string): SomeObject;
};
// Generics are used when we want to describe a correspondence between two values.
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // 형식은 같지만 입력으로 받은 obj와 같은 종류인지를 보장할 수 없다.
    // The problem is that the function promises to return the same kind of object as was passed in, not just some object matching the constraint.
    return { length: minimum };
}
```

Rule: When possible, use the type parameter itself rather than constraining it Rule: Always use as few type parameters as possible Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument. 어차피 패러미터 적은 함수가 많은 함수 자리에 무조건갈 수 있으니 그냥 정의하면? 된다.

```ts
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed()); // Object is possibly 'undefined'.
});
```

!@functionOverload.ts@!

Always prefer parameters with union types instead of overloads when possible

void is not the same as undefined.

object is not Object. Always use object!

The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value.

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

This is an untyped function call and is generally best avoided because of the unsafe any return type.

If you need to accept an arbitrary function but don’t intend to call it, the type () => void is generally safer.

## Object Types

> How TypeScript describes the shapes of Javascript objects.

readonly인 프로퍼티는 바꿀 수 없지만 객체같은건 totally immutable하지는 않다.

TypeScript doesn’t factor in whether properties on two types are readonly when checking whether those types are compatible, so readonly properties can also change via aliasing.

```ts
// Index Signatures
interface StringArray {
  [index: number]: string;
}
// 문자열과 숫자 둘 다 가능하지만, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
```

The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want.

TypeScript provides another construct called intersection types that is mainly used to combine existing object types.

[interface extend vs type intersection?](https://stackoverflow.com/questions/52681316/difference-between-extending-and-intersecting-interfaces-in-typescript)

Since type aliases, unlike interfaces, can describe more than just object types, we can also use them to write other kinds of generic helper types.

```ts
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
```

The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.

When we see a function that consumes ReadonlyArrays, it tells us that we can pass any array into that function without worrying that it will change its contents.

```ts
let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;
// The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
```

> A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

Tuple types are useful in heavily convention-based APIs, where each element’s meaning is “obvious”. However, since not every user holds the same view of what’s obvious, it may be worth reconsidering whether using objects with descriptive property names may be better for your API.

Tuples can have optional properties

## Type Manipulation

### Creating Types from Types

> An overview of the ways in which you can create more types from existing types.

### Generics

> Types which take paremeters.

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

Understanding when to put the type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic.

When working with classes, static members can not use the class’s type parameter.

You can declare a type parameter that is constrained by another type parameter.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a');
```

아래는 제너릭에서 클래스 타입을 사용하는 방법. mixin 디자인 패턴에서 사용된다.

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

### Keyof Type Operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys.

### Typeof Type Operator

여러 predefined type이 있다.

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
```

### Indexed Access Types

We can use an indexed access type to look up a specific property on another type.

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person['age'];
```

### Conditional Types

> Types which act like if statements in the type system

The power of conditional types comes from using them with generics.

```ts
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw 'unimplemented';
}
```

```ts
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented';
}
```

### Mapped Types

> Creating types by mapping each property in an existing type

### Template Literal Types

> Mapped types which change properties via template literal strings

## Classes

## Modules
