---
title: Grids
---

> CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.

> A grid is a collection of horizontal and vertical lines creating a pattern against which we can line up our design elements.

!@grid.html@!

The fr unit distributes available space, not all space. Therefore, if one of your tracks has something large inside it, there will be less free space to share.

> The minmax() function lets us set a minimum and maximum size for a track

```css
// As many column as will fit
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

!@placement.html@!


