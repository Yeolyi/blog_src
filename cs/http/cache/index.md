---
title: HTTP caching
---

> The HTTP cache stores a response associated with a request and reuses the
> stored response for subsequent requests.

두 종류의 캐시가 있다.

- private caches: 특정 클라이언트에 묶여 있다. 따라서 개인적인 정보를 저장할 수
  있다. Cache-Control: private를 명시해주어야 한다. 개인화된 컨텐츠는 보통 쿠키
  에 의해 관리된다.
- shared caches: 유저들 사이에서 공유될 수 있는 데이터.
  - Proxy caches: 몇몇 프록시는 트래픽을 줄이기 위해 캐싱의 역할을 한다. 나머지
    는 무슨 내용?
  - Managed caches: 서비스 개발자로부터 explicitly하게 사용됨. Reverse proxies,
    CDNs,,,

Heuristic caching is a workaround that came before Cache-Control support became
widely adopted, and basically all responses should explicitly specify a
Cache-Control header.

저장된 HTTP 응답들은 fresh와 stale한 상태로 나뉜다. Cache-Control의 max-age 값으
로 판단할 수 있다.

사용자 언어가 다른 경우에는 URL이 똑같더라도 다른 응답이 올 수 있는데, Vary:
Accept-Language를 사용해 캐시가 Accept-Language값을 키로 사용하게 할 수 있다.

> HTTP has a mechanism to transform a stale response into a fresh one by asking
> the origin server. This is called validation, or sometimes, revalidation.

> If-Modified-Since request header ask the server if there have been any changes
> made since the specified time. 날짜 파싱의 어려움을 해결하기 위해 ETag가 대안
> 으로 부상.

...
