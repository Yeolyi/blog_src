---
title: CSS selectors
---

### Type of selectors

Type, class, and ID selectors

```css
/* Attribute selector */
a[href="https://example.com"]
{
}
```

Pseudo-classes selector style certain states of an element. Pseudo-elements
selector select a certain part of an element rather than the element itself.
Combinators combine other selectors in order to target elements within our
documents.

The universal selector

```css
/* Bad */
article :first-child {
  font-weight: bold;
}
/* Good */
article *:first-child {
  font-weight: bold;
}
```

!@targetingClass.html@!

In most cases, it is preferable to add a class to an element instead of an ID.

Pseudo-classes enable you to target an element when it's in a particular state,
as if you had added a class for that state to the DOM. Pseudo-elements act as if
you had added a whole new element to the DOM, and enable you to style that.

```css
/* Combining pseudo-classes and pseudo-elements */
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

### Combinators

The child combinator (>) is placed between two CSS selectors. It matches only
those elements matched by the second selector that are the direct children of
elements matched by the first. Descendant elements further down the hierarchy
don't match.

The adjacent sibling selector (+) is placed between two CSS selectors. It
matches only those elements matched by the second selector that are the next
sibling element of the first selector.

If you want to select siblings of an element even if they are not directly
adjacent, then you can use the general sibling combinator (~).
