---
title: Primitives
---

## Any

> Any is the TypeScript escape clause. Any declares to TypeScript to trust your code as being safe because you know more about it.

JSON 파싱등에서 사용될 수 있다. never를 제외한 모든 타입을 교체 가능. 

!@swap.ts@!

Unknown is a sibling type to any, if any is about saying "I know what's best", then unknown is a way to say "I'm not sure what is best, so you need to tell TS the type"

## Literals

> A literal is a more concrete subtype of a collective type.

What this means is that "Hello World" is a string, but a string is not "Hello World" inside the type system??

!@literals.ts@!

## Union and Intersection Types

!@intersection.ts@!

## Unknown and Never

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

!@never.ts@!
