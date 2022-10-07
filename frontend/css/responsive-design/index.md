---
title: Responsive design
---

> The concept of responsive web design (RWD) appeared, a set of practices that allows web pages to alter their layout and appearance to suit different screen widths, resolutions, etc.

It is important to understand that responsive web design isn't a separate technology — it is a term used to describe an approach to web design or a set of best practices, used to create a layout that can respond to the device being used to view the content.

A common approach when using Media Queries is to create a simple single-column layout for narrow-screen devices (e.g. mobile phones), then check for larger screens and implement a multiple-column layout when you know that you have enough screen width to handle it. This is often described as mobile first design.

You should never set text using viewport units alone.

```css
<meta name="viewport" content="width=device-width,initial-scale=1">
```

This meta tag tells mobile browsers that they should set the width of the viewport to the device width, and scale the document to 100% of its intended size, which shows the document at the mobile-optimized size that you intended.

Why is this needed? Because mobile browsers tend to lie about their viewport width. So you should always include the above line of HTML in the head of your documents.
