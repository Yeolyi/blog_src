---
title: Language
---

## Soundness

> Soundness is the idea that the compiler can make guarantees about the type a value has at runtime,
> and not just during compilation.

Simplicity, Usability and Soundness에서 타입스크립트는 모든 JS 코드를 수용하기위해 Soundness에서 타
협함.

!@soundness.ts@!

## Structural Typing

TypeScript is a Structural Type System.

> A structural type system means that when comparing types, TypeScript only takes into account the
> members on the type.

> This is in contrast to nominal type systems, where you could create two types but could not assign
> them to each other.

!@structuralTyping.ts@!

## Type Guards

> Type Guarding is the term where you influence the code flow analysis via code.

> A type predicate function is a function where the return type offers information to the code flow
> analysis when the function returns true.

!@typeGuards.ts@!

## Type Widening and Narrowing

> Widening and Narrowing types is about expanding and reducing the possibilities which a type could
> represent.
