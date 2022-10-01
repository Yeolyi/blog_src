---
title: How CSS is structured
---

Avoid using CSS in inline style way, when possible. It is the opposite of a best
practice.

The CSS language has rules to control which selector is stronger in the event of
a conflict. These rules are called cascade and specificity. Cascade는 css 파일에
서 늦게 등장하는 것이 우선한다는 것, specificity는 구체적인 것이 우선함을 의미한
다.

property & value -> CSS declaration -> CSS Declatation Block -> CSS ruleset

함수 형식의 값을 가지는 것도 있다.

```css
.box {
  padding: 10px;
  width: calc(90% - 30px);
  background-color: rebeccapurple;
  color: white;
}
```

> CSS @rules (pronounced "at-rules") provide instruction for what CSS should
> perform or how it should behave.

> Some properties like font, background, padding, border, and margin are called
> **shorthand properties**. This is because shorthand properties set several
> values in a single line.

```css
padding: 10px 15px 15px 5px;

padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

CSS comments begin with /_ and end with _/.

Though white space separates values in CSS declarations, property names never
have white space.
