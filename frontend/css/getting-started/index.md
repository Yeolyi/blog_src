---
title: Getting started with CSS
---

```html
<link rel="stylesheet" href="styles.css" />
```

This <link> element tells the browser that we have a stylesheet, using the rel
attribute, and the location of that stylesheet as the value of the href
attribute.

You can target multiple selectors at the same time by separating the selectors
with a **comma**.

Browsers have internal stylesheets containing default styles, which they apply
to all pages by default;

Therefore, it is sometimes best to bypass the element and refer to the class,
unless you know that you want to create some special rules for one element
alone, and perhaps want to make sure they are not applied to other things.

> Selector called the descendant combinator takes the form of a space between
> two other selectors.

> Something else you might like to try is styling a paragraph when it comes
> directly after a heading at the same hierarchy level in the HTML. To do so,
> place a + (an **adjacent sibling combinator**) between the selectors.

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
