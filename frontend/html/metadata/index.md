---
title: What's in the head? Metadata in HTML
---

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
