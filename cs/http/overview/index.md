---
title: An overview of HTTP
---

> HTTP란 HTML 문서와 같은 자원들을 가져오기(fetch) 위한 프로토콜이다. 

request <-> response.

client-server protocol. 단일한 entity에서 요청을 한다. 클라이언트와 서버 사이에는 무수한 엔티티(프록시)들이 존재한다. 이들은 게이트웨이, 캐시 등등의 작업을 한다. 

> user-agent는 사용자의 이익을 위한 모든 도구들을 칭한다. 보통은 웹 브라우저. 

**요청을 시작하는 엔티티는 언제나 브라우저다. 서버가 아님!**  

> Application layer에서 동작하는 컴퓨터와 릴레이들을 프록시라고 한다. 이들은 캐싱, 필터링, 로드 밸런싱, 인증, 로깅 등등의 작업을 한다. 

reliable해야하기에 UDP는 못쓰고 TCP를 사용한다. 

Stateless protocol. But while the core of HTTP itself is stateless, HTTP cookies allow the use of stateful sessions.

HTTP/1.0에서는 기본적으로 각각의 request/response 쌍마다 TCP 연결을 다시 해주어야한다. In order to mitigate this flaw, HTTP/1.1 introduced pipelining and persistent connections: the underlying TCP connection can be partially controlled using the Connection header. HTTP/2 went a step further by multiplexing messages over a single connection, helping keep the connection warm and more efficient.

[swift-quic](https://github.com/kennethlaskoski/swift-quic)

HTTP pipelining has been superseded in HTTP/2 with more robust multiplexing requests within a frame.

Request는 method, path, HTTP version, headers, body로 구성된다. 

response는 HTTP version, status code, status message, headers로 구성된다. 

HTTP is an extensible protocol that is easy to use. The client-server structure, combined with the ability to add headers, allows HTTP to advance along with the extended capabilities of the Web.
