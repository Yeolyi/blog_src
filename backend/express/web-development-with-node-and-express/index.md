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

bash, zsh. The main reason I gravitate toward bash is ubiquity.

[The Bash Guide](https://guide.bash.academy/)

nodemon은 소스코드에 변화가 있을 때 자동으로 노드 프로그램을 재시작해주는 유틸리티이다.

PHP/ASP 등의 기존 방식은 URL과 파일 이름 사이 관계가 명확하다. 웹 서버는 파일이 컴퓨터 어디에 위치한지 알고 그것을 브라우저에게 제공한다.

노드는 기존 패러다임과는 달리 작성한느 앱이 즉 웹 서버이다. 노드는 웹 서버를 위한 프레임워크를 제공할 뿐이다.

[About node.js](https://nodejs.org/en/about/)

!@ch02/00-helloworld.js@!

Node의 핵심 철학은 이벤트 기반 프로그래밍이다. 개발자는 어떤 이벤트가 가능하고 그것들에 어떻게 반응할지를 이해해야한다. 위 코드에서는 HTTP request 이벤트가 처리된다.

유저가 앱의 한 페이지에서 다른 페이지로 이동할 때 발생하는 navigation event에 반응하는 것을 routing이라 한다.

> Routing refers to the mechanism for serving the client the content it has asked for.

작은 프로젝트에서는 노드로 static resource를 제공하는 것도 좋지만 큰 프로젝트에서는 NGINX나 CDN같은 프록시 서버를 원할 수도 있다. 챕터 17.

!@ch02/01-helloworld.js@!

!@ch02/02-helloworld.js@!

## 3. Saving Time with Express

> Express has taken a page from Ruby on Rails and provided a utility to generate **scaffolding** to start your Express project.

[express-generator](http://bit.ly/2CyvvLr)

프로젝트 루트 경로를 프로젝트 경로의 하위 디렉터리로 만드는 것을 추천한다. 미팅 노트, 문서,,, 등등을 놓을 곳이 필요하니까.

일반적으로 primary file은 app.js로 명명한다. 다른 것 쓰려면 package.json의 main 프로퍼티 바꾸는 것 잊지 말기.

[redirect-path chrome extension](https://chrome.google.com/webstore/detail/redirect-path/aomidfkchockcldhbkggjokdkkebmdll)

!@meadowlark/site/meadowlark0.js@!

MVC 패러다임에서 view는 유저에게 전달되는 것이다. 여기서는 HTML. Pug와 같은 view engine은 HTML보다 간략한 syntax를 HTML로 변환한다. Handlebars는 pug보다 덜 추상화했다.

> ‘In the years following the original release of this book, React has taken the world by storm…which abstracts HTML away from frontend developers! Viewed through that lens, my prediction that frontend developers didn’t want HTML abstracted away hasn’t stood the test of time. However, JSX (the JavaScript language extension that most React developers use) is (almost) identical to writing HTML, so I wasn’t entirely wrong.

!@meadowlark/site/meadowlark1.js@!

!@meadowlark/site/views/about.handlebars@!

방문마다 같은 html을 받기는 하지만 route가 불릴 때마다 다른 결정을 할 수 있고 그래서 dynamic content로 간주된다.

Express는 정적 파일과 뷰를 다루기 위해 미들웨어를 사용한다.

static 미들웨어는 별다른 처리 없이 유저에게 곧장 전달하면 되는 정적 자원이 있는 디렉터리를 지정할 때 사용된다. 이미지, CSS, client-side JS 파일,,,

public 폴더 -> 폴더 내용물이 묻지도 따지지도 않고 클라이언트에 전달되기 때문에 붙은 이름.

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
