---
title: Flexbox
---

> Flexbox is a one-dimensional layout method for arranging items in rows or columns.

> The main axis is the axis running in the direction the flex items are laid out in.

> The cross axis is the axis running perpendicular to the direction the flex items are laid out in.

!@flexbox0.html@!

article의 flex 설정 없이 wrap만 주니까 flex-direction: column과 같아져버림?

The flex: 200px declaration set on the articles means that each will be at least 200px wide.

```css
flex-direction: row;
flex-wrap: wrap;

flex-flow: row wrap;
```

article에 flex:1을 주면 모든 article이 같은 같이므로 폭을 균등하게 나눠서 같는다 . flex:40000을 줘도같은 결과.

```css
// Each flex item will first be given 200px of the available space. After that, the rest of the available space will be shared according to the proportion units.
article:nth-of-type(3) {
  flex: 2 200px;
}
```

flex: unitless-proportion flex-shrink flex-basis. We'd advise against using the longhand flex properties unless you really have to.

!@flex-align0.html@!

> align-items controls where the flex items sit on the cross axis.

> justify-content controls where the flex items sit on the main axis.
