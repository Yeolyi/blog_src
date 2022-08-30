---
title: Cascade and Inheritance
---

### Speciticity

An element selector is less specific; it will select all elements of that type that appear on a page, so it has less weight.
A class selector is more specific; it will select only the elements on a page that have a specific class attribute value, so it has more weight.

### Controlling inheritance

inherit/initial/revert/revert-layer/unset

> The **initial value** of a CSS property is its default value, as listed in its definition table in the specification. The usage of the initial value depends on whether a property is inherited or not.

> The CSS shorthand property **all** can be used to apply one of these inheritance values to (almost) all properties at once.

!@inherit.html@!

[all](https://developer.mozilla.org/en-US/docs/Web/CSS/all)

### Understanding the cascade

There are three factors to consider, listed here in increasing order of importance. Later ones overrule earlier ones:

1. Source order
2. Specificity
3. Importance

It is useful to know that the !important flag exists so that you know what it is when you come across it in other people's code. However, we strongly recommend that you never use it unless you absolutely have to.

나머지는 일단 스킵