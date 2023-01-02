---
title: HTML MDN Web Docs
---

## 출처

[Structuring the web with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML) by Mozilla Contributors is licensed under CC-BY-SA 2.5.

## Introduction to HTML

### Getting Started with HTML

> HTML (Hypertext Markup Language) is a markup language that tells web browsers how to structure the web pages you visit.

> The HTML element is the opening tag, followed by content, followed by the closing tag.

**Block-level elements** form a visible block on a page. A block-level element appears on a new line following the content that precedes it. Any content that follows a block-level element also appears on a new line. Block-level elements are usually structural elements on the page. A block-level element wouldn't be nested inside an inline element, but it might be nested inside another block-level element.

**Inline elements** are contained within block-level elements, and surround only small parts of the document's content (not entire paragraphs or groupings of content). An inline element will not cause a new line to appear in the document. It is typically used with text.

The terms block and inline, as used in this article, should not be confused with the types of CSS boxes that have the same names.

The a tag's target attribute specifies the browsing context used to display the link. Title attribute appears as a tooltip when a cursor hovers over the element.

Boolean attributes can only have one value, which is generally the same as the attribute name.

The HTML parser reduces each sequence of whitespace to a single space when rendering the code.

```html
<p>Dogs are silly.</p>

<p>Dogs are silly.</p>
```

### What's in the head? Metadata in HTML

The head's job is to contain metadata about the document.

The <h1> element appears on the page when loaded in the browser — generally this should be used once per page.

Many <meta> elements include name and content attributes:

- name specifies the type of meta element it is; what type of information it contains.
- content specifies the actual meta content.

Specifying a description that includes keywords relating to the content of your page is useful as it has the potential to make your page appear higher in relevant searches performed in search engines.

The description <meta> and <title> element content used in the search result.

구글에서 밑에 줄줄이 같이 뜨는걸 sitelink라고 한다. [Google webmaster tool](https://search.google.com/search-console/about?hl=en)에서 설정도 가능하다.

> Open Graph Data is a metadata protocol that Facebook invented to provide richer metadata for websites.

The script element should also go into the head, and should include a src attribute containing the path to the JavaScript you want to load, and defer, which basically instructs the browser to load the JavaScript after the page has finished parsing the HTML. defer를 써서 하라는게 신기!

Finally, it's worth mentioning that you can (and really should) set the language of your page.

### HTML text fundamentals

- Preferably, you should use a single <h1> per page—this is the top level heading, and all others sit below this in the hierarchy.
- Make sure you use the headings in the correct order in the hierarchy. Don't use <h3> elements to represent subheadings, followed by <h2> elements to represent sub-subheadings—that doesn't make sense and will lead to weird results.
- Of the six heading levels available, you should aim to use **no more than three per page**, unless you feel it is necessary. Documents with many levels (for example, a deep heading hierarchy) become unwieldy and difficult to navigate. On such occasions, it is advisable to spread the content over multiple pages if possible.

[How Long Do Users Stay on Web Pages?](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)

Search engines indexing your page consider the contents of headings as important keywords for influencing the page's search rankings.

This is a <span> element. It has no semantics. You use it to wrap content when you want to apply CSS to it (or do something to it with JavaScript) without giving it any extra meaning.

You shouldn't use <em> purely to get italic styling. To do that, you'd use a <span> element and some CSS, or perhaps an <i> element.

It's only appropriate to use <b>, <i>, or <u> to convey a meaning traditionally conveyed with bold, italics, or underline when there isn't a more suitable element; and there usually is??

People strongly associate underlining with hyperlinks. Therefore, on the web, it's best to only underline links.

### Creating hyperlinks

> href attribute, also known as a Hypertext Reference, or target

Almost any content can be made into a link, even block-level elements.

```html
<a href="https://www.mozilla.org/en-US/">
  <img
    src="mozilla-image.png"
    alt="Mozilla homepage"
  />
</a>
```

In a real website, index.html would be our home page or landing page (a web page that serves as the entry point for a website or a particular section of a website.).

It's possible to link to a specific part of an HTML document, known as a document fragment, rather than just to the top of the document. To do this you first have to assign an id attribute to the element you want to link to.

```html
<h2 id="Mailing_address">Mailing address</h2>

<p>
  Want to write us a letter? Use our
  <a href="contacts.html#Mailing_address">mailing address</a>.
</p>
```

Search engines use link text to index target files, so it is a good idea to include keywords in your link text to effectively describe what is being linked to.

```html
<!-- Good -->
<p><a href="https://www.mozilla.org/firefox/"> Download Firefox </a></p>
<!-- Bad -->
<p><a href="https://www.mozilla.org/firefox/"> Click here </a> to download Firefox</p>
```

Linking to non-HTML resources — leave clear signposts

- Play the car game (requires Flash)

Use the download attribute when linking to a download

### Advanced text formatting

> The purpose of **description lists** is to mark up a set of items and their associated descriptions, such as terms and definitions, or questions and answers.

```html
<dl>
  <dt>soliloquy</dt>
  <dd>
    In drama, where a character speaks to themselves, representing their inner thoughts or feelings
    and in the process relaying them to the audience (but not to other characters.)
  </dd>
  <dt>monologue</dt>
  <dd>
    In drama, where a character speaks their thoughts out loud to share them with the audience and
    any other characters present.
  </dd>
  <dt>aside</dt>
  <dd>
    In drama, where a character shares a comment only with the audience for humorous or dramatic
    effect. This is usually a feeling, thought, or piece of additional background information.
  </dd>
</dl>
```

block level content -> <blockquote> inline -> <q>

There is no way to get the browser to display the contents of cite, without writing your own solution using JavaScript or CSS.

There is a <cite> element meant to contain the title of the resource being quoted.

```html
<p>
  According to the
  <a href="/en-US/docs/Web/HTML/Element/blockquote"> <cite>MDN blockquote page</cite></a
  >:
</p>

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is an extended
    quotation.
  </p>
</blockquote>

<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
</p>
```

Another fairly common element you'll meet when looking around the Web is <abbr> — this is used to wrap around an abbreviation or acronym.

컨텐츠의 발음/표시에 대한 힌트를 준다.

```html
<p>I think <abbr title="Reverend">Rev.</abbr> Green did it in the kitchen with the chainsaw.</p>
```

HTML has an element for marking up contact details — <address>.

```html
<address>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</address>
```

The <address> element should only be used to provide contact information for the document contained with the nearest <article> or <body> element. It would be correct to use it in the footer of a site to include the contact information of the entire site, or inside an article for the contact details of the author, but not to mark up a list of addresses unrelated to the content of that page.

You will occasionally need to use superscript and subscript.

There are a number of elements available for marking up computer code using HTML. code, pre, var, kbd, samp...

HTML also provides the <time> element for marking up times and dates in a machine-readable format. For example:

```html
<time datetime="2016-01-20">20 January 2016</time>
```

### Document and website structure

header: Usually a big strip across the top with a big heading, logo, and perhaps a tagline. This usually stays the same from one webpage to another.

navigation bar: Links to the site's main sections. Like the header, this content usually remains consistent from one webpage to another. Many web designers consider the navigation bar to be part of the header rather than an individual component, but that's not a requirement.

main content: A big area in the center that contains most of the unique content of a given webpage, for example. This is the one part of the website that definitely will vary from page to page!

sidebar: Some peripheral info, links, quotes, ads, etc. Usually, this is contextual to what is contained in the main content.

footer: A strip across the bottom of the page that generally contains fine print, copyright notices, or contact info. It's a place to put common information (like the header) but usually, that information is not critical or secondary to the website itself. The footer is also sometimes used for SEO purposes, by providing links for quick access to popular content.

header: <header>. navigation bar: <nav>. main content: <main>, with various content subsections represented by <article>, <section>, and <div> elements. sidebar: <aside>; often placed inside

<main>. footer: <footer>

<main>은 페이지당 하나, body 안에 바로 넣기. 
<article>은 페이지의 다른 부분이 없어도 그 자체로 의미있는 내용을 넣기. 
<section>은 <article>과 비슷하지만 페이지의 한 부분을 묶는 느낌. heading으로 시작하기.
<aside>는 main content와 직접적 연관은 없지만 추가 정보를 줄 수 있음(저자 bio, 연관 링크 등)
<header> represents a group of introductory content. If it is a child of <body> it defines the global header of a webpage, but if it's a child of an <article> or <section> it defines a specific header for that section.
<nav>에 secondary link말고 메인 네비게이션 기능만.

<span>은 inline, <div>는 block level.

div를 남용하지는 말기.

<br>은 line break, <hr>은 thematic(주제의) break. 가로선을 넣는다.

### Debugging

[Markup Validation Service](https://validator.w3.org/)
