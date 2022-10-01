---
title: Sizing items in CSS
---

### The natural or intrinsic size of things

HTML Elements have a natural size, set before they are affected by any CSS. Image, Text,,,

### Setting a specific size

Due to this problem of overflow, fixing the height of elements with lengths or percentages is
something we need to do very carefully on the web.

```html
.box { border: 5px solid darkblue; width: 300px; margin: 10%; padding: 10%;

<div class="box">I have margin and padding set to 10% on all sides.</div>
}
```

When you use **margin and padding** set in percentages, the value is calculated from the inline size
of the containing block — therefore the width when working in a horizontal language.

### min- and max- sizes

A common use of max-width is to cause images to scale down if there is not enough space to display
them at their intrinsic width while making sure they don't become larger than that width.

### Viewport units

> The viewport — which is the visible area of your page in the browser you are using to view a site
> — also has a size. In CSS we have units which relate to the size of the viewport — the vw unit for
> viewport width, and vh for viewport height.
