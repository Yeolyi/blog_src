---
title: CSS first steps
---

## What is CSS?

-

## Getting started with CSS

```html
<link rel="stylesheet" href="styles.css">
```

This <link> element tells the browser that we have a stylesheet, using the rel attribute, and the location of that stylesheet as the value of the href attribute.

You can target multiple selectors at the same time by separating the selectors with a **comma**. 

Browsers have internal stylesheets containing default styles, which they apply to all pages by default;

Therefore, it is sometimes best to bypass the element and refer to the class, unless you know that you want to create some special rules for one element alone, and perhaps want to make sure they are not applied to other things.

> Selector called the descendant combinator takes the form of a space between two other selectors.

> Something else you might like to try is styling a paragraph when it comes directly after a heading at the same hierarchy level in the HTML. To do so, place a + (an **adjacent sibling combinator**) between the selectors.

### Styling things based on state

```css
a:link {
  color: pink;
}

a:visited {
  color: green;
}

/* This will style any element with a class of special, which is inside a <p>, which comes just after an <h1>, which is inside a <body>. Phew! */
body h1 + p .special {
  color: yellow;
  background-color: black;
  padding: 5px;
}
```

## How CSS is structured

Avoid using CSS in inline style way, when possible. It is the opposite of a best practice.

The CSS language has rules to control which selector is stronger in the event of a conflict. These rules are called cascade and specificity. Cascade는 css 파일에서 늦게 등장하는 것이 우선한다는 것, specificity는 구체적인 것이 우선함을 의미한다. 

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

> CSS @rules (pronounced "at-rules") provide instruction for what CSS should perform or how it should behave.

> Some properties like font, background, padding, border, and margin are called **shorthand properties**. This is because shorthand properties set several values in a single line.

```css
padding: 10px 15px 15px 5px;

padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

CSS comments begin with /* and end with */.

Though white space separates values in CSS declarations, property names never have white space.

## How CSS works

-
