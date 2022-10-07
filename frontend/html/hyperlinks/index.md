---
title: Creating hyperlinks
---

> href attribute, also known as a Hypertext Reference, or target

Almost any content can be made into a link, even block-level elements.

```html
<a href="https://www.mozilla.org/en-US/">
  <img src="mozilla-image.png" alt="Mozilla homepage" />
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
