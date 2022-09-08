---
title: The TypeScript Handbook
---

다음에서 발췌
TypeScript Handbook
TypeScript Team and Open Source Contributors
이 자료는 저작권에 의해 보호됩니다.

## The Basics

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
    console.log("Hello ".concat(person, ", today is ").concat(date, "!"));
}
greet('Brendan');
```

One of TypeScript's core values: much of the time, you will know better than TypeScript.

It's best not to add annotations when the type system would end up inferring the same type anyway.

**Type annotations never change the runtime behavior of your program.**

> This process of moving from a newer or "higher" version of ECMAScript down to an older or "lower" one is sometimes called downleveling. (기본값 ES3)

strict 세팅 관련되어 가장 눈에 띄는? 플래그로 noImplicitAny와 strictNullChecks가 있다. 전자는 implicit하게 any로 추론된 변수에 에러를 뿜고, 후자는 원래는 그냥 대입 가능한 null/undefined의 체크를 확실히 한다. 

## Everyday Types

String, Number, Boolean 대문자는 쓰기 말기. 

The any type is useful when you don't want to write out a long type just to convince TypeScript that a particular line of code is okay.

> Conceptual typing: 함수가 사용되는 맥락이 함수(패러미터)가 가져야 하는 타입을 알려준다. 

When you read from an optional property, you'll have to check for undefined before using it.

> A union type is a type formed from two or more other types, representing values that may be any one of those types.
We refer to each of these types as the union's members.



## Narrowing

## More on Functions

## Object Types

## Creating Types from Types

## Generics 

## Keyof Type Operator

## Typeof Type Operator

## Indexed Access Types

## Conditional Types

## Mapped Types

## Template Literal Types

## Classes

## Modules

