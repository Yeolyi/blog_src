---
title: Floats
---

[drop-caps](https://css-tricks.com/snippets/css/drop-caps/)

> The float property was introduced to allow web developers to implement simple layouts involving an image floating inside a column of text, with the text wrapping around the left or right of it.

!@float.html@!

A floated element is taken out of normal flow and the boxes of the following items actually run behind the float.

[line boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model#line_boxes)

If we want to stop the following element from moving up, we need to clear it; this is achieved with the clear property.

아래 경우에는 clear가 작동하지 않음. 

!@clear.html@!

가장 최신의 해결 방법은 display: flow-root를 사용하는 것이다. 확인해보니 다 됨. 걍 써도 될 듯?
