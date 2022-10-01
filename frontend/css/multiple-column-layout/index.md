---
title: Multiple-column layout
---

multiple-column layout — often referred to as multicol.

!@multicol.html@!

colum-width. The browser will now give you as many columns as it can of the size
that you specify. 남은 공간은 나눠서 가지므로 표시한 width값과 같지 않은 경우가
많다.

column-rule is a shorthand for column-rule-color, column-rule-style, and
column-rule-width. border랑 비슷.

rule은 그 자체의 width를 가지지 않는다.

multicol container에 의해 내용물이 조각날 수 있다. 이를 막으려면 break-inside를
avoid로 설정한다.
