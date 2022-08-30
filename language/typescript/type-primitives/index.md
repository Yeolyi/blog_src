---
title: Type Primitives
---

## Tuples

> TypeScript has special analysis around arrays which contain multiple types, and where the order in which they are indexed is important. These are called tuples.

A tuple can feel like a good pattern for short bits of connected data or for fixtures.

!@tuple.ts@!

## Built-in Utility Types

!@utilityTypes.ts@!

[omit vs exclude](https://stackoverflow.com/questions/56916532/difference-b-w-only-exclude-and-omit-pick-exclude-typescript)

## Nullable Types

Undefined is when something cannot be found or set.

Null is meant to be used when there is a conscious lack of a value.

2.0버전 이전까지는 null과 undefined가 타입 시스템에서 무시되었다. Version 2.0 added a compiler flag called "strictNullChecks" and this flag required people to treat undefined and null as types which needs to be handled via code-flow analysis.

!@nullable.ts@!

