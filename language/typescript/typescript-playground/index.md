---
title: TypeScript Playground
---

## 출처

[https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)

## Primitives

### Any

> Any is the TypeScript escape clause. Any declares to TypeScript to trust your code as being safe because you know more about it.

JSON 파싱등에서 사용될 수 있다. never를 제외한 모든 타입을 교체 가능.

!@primitives/swap.ts@!

Unknown is a sibling type to any, if any is about saying "I know what's best", then unknown is a way to say "I'm not sure what is best, so you need to tell TS the type"

### Literals

> A literal is a more concrete subtype of a collective type.

What this means is that "Hello World" is a string, but a string is not "Hello World" inside the type system??

!@primitives/literals.ts@!

### Union and Intersection Types

!@primitives/intersection.ts@!

### Unknown and Never

**Unknown**

Where any allows for ambiguity - unknown requires specifics.

```ts
// 리턴값이 unknown이므로 타입을 명시하기 전까지는 반환값을 사용할 수 없다.
const jsonParserUnknown = (jsonString: string): unknown => JSON.parse(jsonString);
type User = { name: string };
const myUserAccount = jsonParserUnknown(`{ "name": "Samuel" }`) as User;
myUserAccount.name;
```

API 사용자가 타입을 신경쓰도록 강제할 수 있다.

**Never**

Because TypeScript supports code flow analysis, the language needs to be able to represent when code logically cannot happen.

A very popular use for never, is to ensure that a switch is exhaustive. E.g., that every path is covered.

!@primitives/never.ts@!

## Type Primitives

### Tuples

> TypeScript has special analysis around arrays which contain multiple types, and where the order in which they are indexed is important. These are called tuples.

A tuple can feel like a good pattern for short bits of connected data or for fixtures.

!@type-primitives/tuple.ts@!

### Built-in Utility Types

!@type-primitives/utilityTypes.ts@!

[omit vs exclude](https://stackoverflow.com/questions/56916532/difference-b-w-only-exclude-and-omit-pick-exclude-typescript)

### Nullable Types

Undefined is when something cannot be found or set.

Null is meant to be used when there is a conscious lack of a value.

2.0버전 이전까지는 null과 undefined가 타입 시스템에서 무시되었다. Version 2.0 added a compiler flag called "strictNullChecks" and this flag required people to treat undefined and null as types which needs to be handled via code-flow analysis.

!@type-primitives/nullable.ts@!

## Meta Types

### Conditional Types

Conditional Types provide a way to do simple logic in the TypeScript type system.

normal day to day code에서 사용할 일 없다고 하니 일단 생략.

### Discriminate Types

> A discriminated type union is where you use code flow analysis to reduce a set of potential objects down to one specific object.

!@meta-types/discriminateTypes.ts@!

### Indexed Types

!@meta-types/indexedTypes.ts@!

### Mapped Types

> Mapped types are a way to create new types based on another type. Effectively a transformational type.

!@meta-types/mappedTypes.ts@!

## Language

### Soundness

> Soundness is the idea that the compiler can make guarantees about the type a value has at runtime, and not just during compilation.

Simplicity, Usability and Soundness에서 타입스크립트는 모든 JS 코드를 수용하기위해 Soundness에서 타협함.

!@language/soundness.ts@!

### Structural Typing

TypeScript is a Structural Type System.

> A structural type system means that when comparing types, TypeScript only takes into account the members on the type.

> This is in contrast to nominal type systems, where you could create two types but could not assign them to each other.

!@language/structuralTyping.ts@!

### Type Guards

> Type Guarding is the term where you influence the code flow analysis via code.

> A type predicate function is a function where the return type offers information to the code flow analysis when the function returns true.

!@language/typeGuards.ts@!

### Type Widening and Narrowing

> Widening and Narrowing types is about expanding and reducing the possibilities which a type could represent.

## Language Extensions

### Enums

!@language-extensions/enums.ts@!

### Nominal Typing

Structural Typing은 단점이 있다. For example there are cases where a string or number can have special context and you don't want to ever make the values transferrable. For example:

- User Input Strings (unsafe)
- Translation Strings
- User Identification Numbers
- Access Tokens

!@language-extensions/nominalTyping.ts@!

### Types vs Interfaces

That said, we recommend you use interfaces over type aliases. Specifically, because you will get better error messages.

One major difference between type aliases vs interfaces are that interfaces are open and type aliases are closed. This means you can extend an interface by declaring it a second time.

[Interfaces vs Types](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220)
