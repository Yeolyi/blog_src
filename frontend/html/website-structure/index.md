---
title: Document and website structure
---

header:
Usually a big strip across the top with a big heading, logo, and perhaps a tagline. This usually stays the same from one webpage to another.

navigation bar:
Links to the site's main sections. Like the header, this content usually remains consistent from one webpage to another. Many web designers consider the navigation bar to be part of the header rather than an individual component, but that's not a requirement.

main content:
A big area in the center that contains most of the unique content of a given webpage, for example. This is the one part of the website that definitely will vary from page to page!

sidebar:
Some peripheral info, links, quotes, ads, etc. Usually, this is contextual to what is contained in the main content.

footer:
A strip across the bottom of the page that generally contains fine print, copyright notices, or contact info. It's a place to put common information (like the header) but usually, that information is not critical or secondary to the website itself. The footer is also sometimes used for SEO purposes, by providing links for quick access to popular content.

header: <header>.
navigation bar: <nav>.
main content: <main>, with various content subsections represented by <article>, <section>, and <div> elements.
sidebar: <aside>; often placed inside <main>.
footer: <footer>

<main>은 페이지당 하나, body 안에 바로 넣기. 
<article>은 페이지의 다른 부분이 없어도 그 자체로 의미있는 내용을 넣기. 
<section>은 <article>과 비슷하지만 페이지의 한 부분을 묶는 느낌. heading으로 시작하기.
<aside>는 main content와 직접적 연관은 없지만 추가 정보를 줄 수 있음(저자 bio, 연관 링크 등)
<header> represents a group of introductory content. If it is a child of <body> it defines the global header of a webpage, but if it's a child of an <article> or <section> it defines a specific header for that section.
<nav>에 secondary link말고 메인 네비게이션 기능만. 

<span>은 inline, <div>는 block level.

div를 남용하지는 말기.

<br>은 line break, <hr>은 thematic(주제의) break. 가로선을 넣는다. 