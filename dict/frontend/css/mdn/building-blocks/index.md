---
title: CSS building blocks
---

## Cascase and inheritance

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

## CSS selectors

### Type of selectors

Type, class, and ID selectors
```css
/* Attribute selector */
a[href="https://example.com"] { }
```
Pseudo-classes selector style certain states of an element.
Pseudo-elements selector select a certain part of an element rather than the element itself.
Combinators combine other selectors in order to target elements within our documents. 

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

Pseudo-classes enable you to target an element when it's in a particular state, as if you had added a class for that state to the DOM. Pseudo-elements act as if you had added a whole new element to the DOM, and enable you to style that.

```css
/* Combining pseudo-classes and pseudo-elements */
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

### Combinators 

The child combinator (>) is placed between two CSS selectors. It matches only those elements matched by the second selector that are the direct children of elements matched by the first. Descendant elements further down the hierarchy don't match.

The adjacent sibling selector (+) is placed between two CSS selectors. It matches only those elements matched by the second selector that are the next sibling element of the first selector. 

If you want to select siblings of an element even if they are not directly adjacent, then you can use the general sibling combinator (~).

## The box model

Changing the value of the display property can change whether the outer display type of a box is block or inline. This changes the way it displays alongside other elements in the layout.

Making up a block box in CSS we have the:

- Content box: The area where your content is displayed; size it using properties like inline-size and block-size or width and height.
- Padding box: The padding sits around the content as white space; size it using padding and related properties.
- Border box: The border box wraps the content and any padding; size it using border and related properties.
- Margin box: The margin is the outermost layer, wrapping the content, padding, and border as whitespace between this box and other elements; size it using margin and related properties.

Note: The margin is not counted towards the actual size of the box — sure, it affects the total space that the box will take up on the page, but only the space outside the box. The box's area stops at the border — it does not extend into the margin.

### Margins, padding, and borders

Depending on whether two elements whose margins touch have positive or negative margins, the results will be different:

- Two positive margins will combine to become one margin. Its size will be equal to the largest individual margin.
- Two negative margins will collapse and the smallest (furthest from zero) value will be used.
- If one margin is negative, its value will be subtracted from the total.

Unlike margins, you cannot have a negative padding.

In inline boxes, width and height are ignored. The vertical margin, padding, and border are respected but don't change the relationship of other content to our inline box.

!@inline-block.html@!

display: inline-block is a special value of display, which provides a middle ground between inline and block. Use it if you do not want an item to break onto a new line, but do want it to respect width and height and avoid the overlapping seen above.

## Backgrounds and borders

### Styling backgrouds in CSS

- cover: the browser will make the image just large enough so that it completely covers the box area while still retaining its aspect ratio. 
- contain: the browser will make the image the right size to fit inside the box. 

## Handling different text directions

-

## Overflowing content

### CSS tries to avoid 'data loss'

Wherever possible, CSS does not hide content. This would cause data loss. 

overflow: visible | hidden | scroll 
overflow-y: scroll

예시와는 다르게 overflow: scroll도 수평 스크롤바가 뜨지는 않음,,

You can specify x and y scrolling using the overflow property, passing two values.

### Overflow establishes a Block Formatting Context

## CSS values and units

### What is a CSS value?

> A value type in CSS is a way to define a collection of allowable values.

### Numbers, lengths, and percentages

> **Absolute length units** are not relative to anything else, and are generally considered to always be the same size.

> **Relative length units** are relative to something else, perhaps the size of the parent element's font, or the size of the viewport. 

em and rem are the two relative lengths you are likely to encounter most frequently when sizing anything from boxes to text. 

If you set an element's font-size as a percentage, it will be a percentage of the font-size of the element's parent.

[Shoule I use pt or px?](https://stackoverflow.com/questions/3557260/should-i-use-pt-or-px)
[EM, PX, PT, CM, IN...](https://www.w3.org/Style/Examples/007/units.en.html)

## Sizing items in CSS

### The natural or intrinsic size of things

HTML Elements have a natural size, set before they are affected by any CSS. Image, Text,,,

### Setting a specific size

Due to this problem of overflow, fixing the height of elements with lengths or percentages is something we need to do very carefully on the web.

```html
.box {
  border: 5px solid darkblue;
  width: 300px;
  margin: 10%;
  padding: 10%;

  <div class="box">
  I have margin and padding set to 10% on all sides.
  </div>
}
```

When you use **margin and padding** set in percentages, the value is calculated from the inline size of the containing block — therefore the width when working in a horizontal language.



### min- and max- sizes

A common use of max-width is to cause images to scale down if there is not enough space to display them at their intrinsic width while making sure they don't become larger than that width.

### Viewport units

> The viewport — which is the visible area of your page in the browser you are using to view a site — also has a size. In CSS we have units which relate to the size of the viewport — the vw unit for viewport width, and vh for viewport height. 

## Images, media, and form elements

### Replaced elements

> Images and video are described as **replaced elements**. This means that CSS cannot affect the internal layout of these elements — only their position on the page amongst other elements. 

### Sizing images

> When using object-fit the replaced element can be sized to fit a box in a variety of ways.

### Replaced elements in layout

Replaced elements, when they become part of a grid or flex layout, have different default behaviors, essentially to avoid them being stretched strangely by the layout.

### Form elements

[Normalize.css](https://necolas.github.io/normalize.css/)

## Styling tables

-

## Debugging CSS

-

## Organizing your CSS

-
