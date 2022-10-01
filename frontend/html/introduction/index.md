---
title: Introduction to HTML
---

> HTML (Hypertext Markup Language) is a markup language that tells web browsers how to structure the
> web pages you visit.

> The HTML element is the opening tag, followed by content, followed by the closing tag.

**Block-level elements** form a visible block on a page. A block-level element appears on a new line
following the content that precedes it. Any content that follows a block-level element also appears
on a new line. Block-level elements are usually structural elements on the page. A block-level
element wouldn't be nested inside an inline element, but it might be nested inside another
block-level element.

**Inline elements** are contained within block-level elements, and surround only small parts of the
document's content (not entire paragraphs or groupings of content). An inline element will not cause
a new line to appear in the document. It is typically used with text.

The terms block and inline, as used in this article, should not be confused with the types of CSS
boxes that have the same names.

The a tag's target attribute specifies the browsing context used to display the link. Title
attribute appears as a tooltip when a cursor hovers over the element.

Boolean attributes can only have one value, which is generally the same as the attribute name.

The HTML parser reduces each sequence of whitespace to a single space when rendering the code.

```html
<p>Dogs are silly.</p>

<p>Dogs are silly.</p>
```
