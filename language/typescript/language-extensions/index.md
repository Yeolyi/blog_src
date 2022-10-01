---
title: Language Extensions
---

## Enums

!@enums.ts@!

## Nominal Typing

Structural Typing은 단점이 있다. For example there are cases where a string or
number can have special context and you don't want to ever make the values
transferrable. For example:

- User Input Strings (unsafe)
- Translation Strings
- User Identification Numbers
- Access Tokens

!@nominalTyping.ts@!

## Types vs Interfaces

That said, we recommend you use interfaces over type aliases. Specifically,
because you will get better error messages.

One major difference between type aliases vs interfaces are that interfaces are
open and type aliases are closed. This means you can extend an interface by
declaring it a second time.

[Interfaces vs Types](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220)
