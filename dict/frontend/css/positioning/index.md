---
title: Positioning
---

!@position.html@!

이미지에 alt빼면 inline 요소처럼 같은줄에 있는데 이미지 파일이 없어서 그런건가?

You can use top, bottom, left, and right to resize elements if you need to.

Margin은 positioned element에 여전히 영향을 주지만 margin collapsing은 그렇지 않다. 

The initial containing block has the dimensions of the viewport and is also the block that contains the <html> element. 

따라서 absolute 요소는 기본적으로는 html 요소 밖에 위치하게된다. 

Positioning context를 바꾸기 위해서는 absolute 요소의 상위 요소 중 하나의 position을 relative로 바꾼다. 

z-index values affect where positioned elements sit on that axis; positive values move them higher up the stack, negative values move them lower down the stack. 

Fixed, Sticky 생략

Sticky elements are "sticky" relative to the nearest ancestor with a "scrolling mechanism", which is determined by its ancestors' position property??
