---
title: Web Development with Node and Express
---

다음에서 발췌 Web Development with Node and Express, 2nd Edition Ethan Brown

## 1. Introducing Express

All-javascript 기술 스택을 통해 context switching을 그만둘 수 있다. Mental gear의 조절이 불필요.

> Express 웹사이트의 설명 minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

Server-side application에서는 어플리케이션의 페이지가 서버에서 렌더링된다.

Client-side application에서는 대부분의 UI를 한번만 보내지는 초기 어플리케이션 번들을 통해 그려진다. 브라우저가 HTML을 받으면 JS를 사용해 DOM을 동적으로 변환시킨다. 새로운 페이지를 보이기 위해 서버에 의존할 필요가 없다.

1999년 전에는 SSA가 표준이었다. 이후 2012년에 스마트폰이 보급되면서 네트워크로 적은 정보를 보내야했고 CSA가 성행했다.

SSA는 종종 SSR(server-side rendered), CSA는 SPAs(single-page applitaions)로 불린다.

경계가 명확한 것은 아닌데, client-side application이 2-3개의 HTML 파일을 보낼 수 있고 SSR과 합쳐져 first-page-load 성능과 SEO를 개선할 수 있기 때문이다.

### Node: A New Kind of Web Server

IIS나 아파치와는 다르게 노드는 셋업과 설정이 쉽다. Configuration option이 간단하고 직관적이다.

노드가 사용하는 JS 엔진(V8)은 JS를 네이티브 코드로 컴파일하지만 유저에게 transparent하게 진행해서 마치 인터프리터 언어처럼 작동하게 한다. JIT.

노드는 싱글 쓰레드이다. **여기 관련은 나중에 또 읽어보기.** Isn't multithreading through server parallelism(as opposed to app parallelism) simply moving the complexity around, not eliminating it?

플랫폼에 무관하다.

### The Node Ecosystem

Javascript stack -> Node / Express / Database server / Rendering engine...

이 책에서는 Node, Express, MongoDB

## 2. Getting Started with Node

## 3. Saving Time with Express

## 4. Tidying Up

## 5. Quality Assurance

## 6. The Request and Response Objects

## 7. Templating with Handlebars

## 8. Form Handling

## 9. Cookies and Sessions

## 10. Middleware

## 11. Sending Email

## 12. Production Concerns

## 13. Persistence

## 14. Routing

## 15. REST APIs and JSON

## 16. Single-Page Applications

## 17. Static Content

## 18. Security

## 19. Integrating with Third-Party APIs

## 20. Debugging

## 21. Going Live

## 22. Maintenance

## 23. Additional Resources
