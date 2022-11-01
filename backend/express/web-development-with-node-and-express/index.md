---
title: Web Development with Node and Express
---

다음에서 발췌 Web Development with Node and Express, 2nd Edition Ethan Brown

[GitHub](https://github.com/EthanRBrown/web-development-with-node-and-express-2e)

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

보통 소스코드를 src와 같은 디렉터리 아래 몰아넣는 것이 깔끔하다.

> I had a fencing coach who would always remind us that practice doesn’t make perfect; practice makes permanent. That is, if you do something over and over again, eventually it will become automatic, rote. That is true, but it says nothing about the quality of the thing you are practicing.

[Version Control with Git](https://www.oreilly.com/library/view/version-control-with/9780596158187/)

Git은 staging area가 있어 git add를 하면 변경점들이 이곳으로 이동한다.

package.json의 두 목적은 프로젝트를 설명하고 의존성들을 나열하는 것이다.

npm의 버전 번호는 semver(semantic versioning)에 의해 파싱된다.

**Node modules**는 모듈화와 캡슐화의 매커니즘을 제공하고, **npm package**는 프로젝트의 저장, 버전 매기기, 참조를 위핸 표준화된 스킴을 제공한다.

```js
// ./이 없으면 node_modules를 찾아버리게 된다.
const fortune = require('./lib/fortune)
```

Node modules는 CommonJS(CJS) 모듈로도 불린다. JS가 도입하고 있는 공식적인 패키징 매커니즘은 ECMAScript Module(ECM)이라 불린다. 리액트와 같은 progressive한 프론트 언어에서는 ESM이 익숙할 것이다.

## 5. Quality Assurance

> QA is a very different discipline than development, and it attracts dirrefent personalities and talents.

QA 계획의 목표는 제품이 의도된대로 동작하는지를 확신하기 위해 밟아야 할 단계들을 기록하는 것이다. 아래 것들에 따라 업데이트된다.

- 새로운 기능
- 기존 기능의 변화
- 사라진 기능
- 테스트 기술이나 테크닉의 변화
- QA 계획에서 놓친 결함

웹 개발에서 퀄리티란 네 차원으로 나뉠 수 있다.

- Reach: market penetration of your product. SEO
- Functionality: Site that works as advertised
- Usability: human-computer interaction(HCI)
- Aesthetics

Functionality와 SEO는 자동화 가능하니 이들을 집중적으로 다뤄보자.

웹사이트에는 logic / presentation 두가지 영역이 있다. Logic 영역에 있는 것들은 명확하고 간단해야한다. Presentation 영역의 것들은 usability와 aesthetic의 잣대에 놓인다. 최대한 이 둘의 경계를 명확하게 하려고 해야한다.

> Unit testing is very fine-grained, testing single components to make sure they function properly, whereas integration testing tests the interactino between multiple components or even the whole system.

유닛 테스트는 로직 테스팅, integration 테스트는 두 영역 모두에 유용하다.

### Unit Testing

Express를 mock할 필요가 있다.

테스트 파일을 만드는 방법에는 \_\_tests\_\_ 서브디렉터리에 넣거나 .test.js 접미사를 붙이는 것이 있는데 둘 다 사용해보자.

!@meadowlark/site/lib/handlers.js@!

!@meadowlark/site/meadowlark2.js@!

(책에서는 파일명을 \_\_test\_\_라고 했으나 prettier가 언더스코어를 별로 바꿔서 test로 폴더 만듦)

!@meadowlark/site/tests/handlers.test.js@!

jest.fn()으로 generic mock function을 만들어 어떻게 호출되는지 추적할 수 있다.

watch 모드를 통해 코드에 변화가 있을 때 자동으로 테스트를 돌릴 수 있다.

```
// -- 은 npm이 jest에게 --watch 인자를 넘기게 하기위해 필요하다.
test -- --watch
```

테스트를 어떻게 얼마나 진행할지에 대해서는 정답이 없지만, code coverage는 중요하다할 수 있다.

> Code coverage offers a quantitative answer to how much of your code is tested.

```
npm test -- --coverage
```

- Stmt: JS 문. 한 줄에 여러 문이 있을 수 있어서 Lines의 결과와는 다를 수 있다.
- Branch: if-else와 같은 제어 흐름에서 얼마나 실행됐는지

Entropic functionality(랜덤)를 테스트하는 것은 어렵다.

### Integration Testing

Home에서 About 페이지로 이동할 수 있는 기능을 추가해보자. 두개의 Express route henalder를 사용하며 HTML과 DOM 상호작용(링크 클릭+페이지네비게이션)을 포함하니 integration test라 할 수 있겠다.

!@meadowlark/site/views/homeWithLink.handlebars@!

[Node's module documentation](https://nodejs.org/docs/latest-v14.x/api/modules.html)

[Difference between module.exports and exports in Node.js](https://www.geeksforgeeks.org/difference-between-module-exports-and-exports-in-node-js/)

> Puppeteer is essentially a controllable, headless version of Chrome. (Headless simply means that the browser is capable of running wothout actually rendering a UI on-screen.)

!@meadowlark/site/integration-tests/basic-navigation.test.js@!

### Linting

ESLint에서 한 프로젝트 내의 다른 부분에서 다른 규칙을 사용할 수도 있다.

ESLint는 미확인된 global 변수를 싫어한다. Jest의 경우 .eslintrc.js의 env에 "jest": true를 추가함으로써 해결할 수 있다.

```js
// 아래 코드는 eslint에 의해 next를 사용하지 않는다는 경고가 표시된다.
// 하지만 next를 제거하면 argument 개수의 변화때문에 error handler 여부가 바뀌게 된다.
exports.serverError = (err, req, res, next) => res.render('500');
```

### Continuous Integration

레포에 기여할 때마다 테스트를 실행한다. 테스트 실패시 알림이 가게 할 수 있다.

노드 프로젝트에서는 Travis CI가 많이 사용된다. 깃허브에서도 잘 지원하고 CircleCI라는 것도 있다.

## 6. The Request and Response Objects

Express로 웹 서버를 만드는 과정은 request 객체로 시작해서 response 객체로 끝난다.

### URL의 구성요소

- 프로토콜: 요청이 어떻게 전송될 것인지
- 호스트: 서버를 식별. 인터넷에서 호스트는 TLD(Top Level Domain)으로 끝나고 www와 같은 subdomain이 접두어로 붙을 수도 있다.
- 포트: 1023보다 큰 것을 사용해야 한다.
- Path
- 쿼리스트링: 키/값 조합들의 집합. URL 인코딩되어야한다. JS에는 encodeURIComponent가 있다.
- Fragment: 브라우저에 의해 사용된다.

### HTTP Request methods

or HTTP verbs

브라우저에서 페이지를 열면 GET 요청을 한다.

POST 요청은 흔히 대응되는 GET 요청과 같은 HTML를 반환한다.

### Request Headers

user agent(브라우저, 운영체제, 하드웨어 등)에 대한 정보를 보낸다.

!@ch06/00-echo-headers.js@!

### Response Headers

메타데이터와 서버 정보가 담겨있다.

URL의 path는 추상적이고 브라우저는 궁극적으로 Content-Type을 참고해 렌더링한다.

!@ch06/01-disable-x-powered-by.js@!

### Internet Media Types

content type / internet media type / MIME(Multipurpose Internet Mail Extensions)

MIME는 precursor지만 대부분 같다.

### Request Body

POST는 보통 application/x-www-form-urlencoded(쿼리스트링과 유사). 파일 업로드가 필요하면 multipart/form-data.

### The Request/Response Object

각각 노드의 http.IncomingMessage, http.ServerResponse에 기능을 붙인 것.

훑어보고 지나감.

## Boiling It Down

렌더링 관련 여러 사용례들. These examples are intended to be a quick reference you can revisit in the future.

chaining을 사용할 수 있는지 고려해보기.

레이아웃은 views/ 커스텀 한 것들은 views/layouts인듯?

```js
// 위에서도 언급되었지만 next를 안쓰더라도 있어야 error handler임이 인식된다.
app.use((err, req, res, next) => {
  console.error('** SERVER ERROR: ' + err.message);
  res.status(500).render('08-error', { message: "you shouldn't have clicked that!" });
});
```

> The term **endpoint** is often used to describe a single function in an API.

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
