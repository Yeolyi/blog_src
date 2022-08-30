---
title: Advanced text formatting
---

> The purpose of **description lists** is to mark up a set of items and their associated descriptions, such as terms and definitions, or questions and answers. 

```html
<dl>
  <dt>soliloquy</dt>
  <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
  <dt>monologue</dt>
  <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
  <dt>aside</dt>
  <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought, or piece of additional background information.</dd>
</dl>
```

block level content -> <blockquote>
inline -> <q>

There is no way to get the browser to display the contents of cite, without writing your own solution using JavaScript or CSS.

There is a <cite> element meant to contain the title of the resource being quoted.

```html
<p>According to the <a href="/en-US/docs/Web/HTML/Element/blockquote">
<cite>MDN blockquote page</cite></a>:
</p>

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>

<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q></p>
```

Another fairly common element you'll meet when looking around the Web is <abbr> — this is used to wrap around an abbreviation or acronym.

컨텐츠의 발음/표시에 대한 힌트를 준다. 

```html
<p>I think <abbr title="Reverend">Rev.</abbr> Green did it in the kitchen with the chainsaw.</p>
```

HTML has an element for marking up contact details — <address>.

```html
<address>
  Page written by <a href="../authors/chris-mills/">Chris Mills</a>.
</address>
```

The <address> element should only be used to provide contact information for the document contained with the nearest <article> or <body> element. It would be correct to use it in the footer of a site to include the contact information of the entire site, or inside an article for the contact details of the author, but not to mark up a list of addresses unrelated to the content of that page.

You will occasionally need to use superscript and subscript.

There are a number of elements available for marking up computer code using HTML. code, pre, var, kbd, samp...

HTML also provides the <time> element for marking up times and dates in a machine-readable format. For example:

```html
<time datetime="2016-01-20">20 January 2016</time>
```