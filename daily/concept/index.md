---
title: 컴퓨터 개념 정리
---

### 2022-09-03

**SMTP**

```txt
S: 220 smtp.example.com ESMTP Postfix
C: HELO relay.example.org
S: 250 Hello relay.example.org, I am glad to meet you
C: MAIL FROM:<bob@example.org>
S: 250 Ok
C: RCPT TO:<alice@example.com>
S: 250 Ok
C: RCPT TO:<theboss@example.com>
S: 250 Ok
C: DATA
```

SMTP(Simple Mail Transfer Protocol)은 전자 메일 전송을 위해 사용되는 인터넷 표준통신 프로토콜이다.
메일 서버 및 다른 메시지 전송 에이전트는 SMTP를 사용해 서로메일 메시지를 주고받는다. 보통 일반 텍스
트는 25번 포트를 통해, 암호화된 통신은 587 번 포트를 통해 TCP를 사용한다.

### 2022-09-04

**CDN**

```css
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet">
```

CDN(Content Delivery Network)이란 협력하여 인터넷 콘텐츠를 고속 전송하는 지리적으로 분산된 서버 집단
이다.

CDN을 통해 HTML 페이지, javascript 파일, 스타일시트, 이미지, 동영상등 인터넷 콘텐츠를 로드하는 데 필
요한 자산을 신속하게 전송할 수 있다.

https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/
https://en.wikipedia.org/wiki/Content_delivery_network/

### 2022-09-05

**소켓**

A network socket is a software structure within a network node of a computer network that serves as
an endpoint for sending and receiving data across the network. The structure and properties of a
socket are defined by an application programming interface (API) for the networking architecture.
Sockets are created only during the lifetime of a process of an application running in the node.

네트워크 소켓은 네트워크 노드 내에 있는 소프트웨어 구조로, 네트워크를 통해 데이터를 송수신하는 엔드
포인트 역할을 한다. 오늘날 컴퓨터 간 통신의 대부분은 인터넷프로토콜을 기반으로 하고 있으므로, 대부분
의 네트워크 소켓은 인터넷 소켓이다

UDP를 사용하는 datagram 소켓은 비연결성(conectionless) 소켓이며, TCP를 사용하는 stream 소켓은 연결성
소켓이다.

```python
import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 5005
MESSAGE = b"Hello, World!"

sock = socket.socket(
    socket.AF_INET, # Internet
    socket.SOCK_DGRAM # UDP
)
sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
```

### 2022-09-06

**마크다운**

Markdown is a lightweight markup language for creating formatted text using a plain-text editor.
John Gruber and Aaron Swartz created Markdown in 2004 as a markup language that is appealing to
human readers in its source code form.[9] Markdown is widely used in blogging, instant messaging,
online forums, collaborative software, documentation pages, and readme files.

The initial description of Markdown[10] contained ambiguities and raised unanswered questions,
causing implementations to both intentionally and accidentally diverge from the original version.
This was addressed in 2014, when long-standing Markdown contributors released CommonMark, an
unambiguous specification and test suite for Markdown.[11]

마크다운(Markdown)은 일반 텍스트 편집기를 사용해 서식 있는 텍스트를 만들기 위한경량 마크업 언어이다.
마크다운은 블로그, 협업 소프트웨어, 문서 페이지 및 readme 파일등에 널리 사용된다.

마크다운의 초기 명세는 모호했지만 이는 2014년에 마크다운의 명확한 사양이 명시된 CommonMark가 출시되
면서 해결되었다.

```md
# Heading

## Sub-heading

Paragraphs are separated by a blank line.

Two spaces at the end of a line  
produce a line break.
```

_Wikipedia - Markdown_

### 2022-09-08

**멱등성**

동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일
하게 남을 때, 해당 HTTP 메서드가 멱등성을 가졌다고 말한다. 멱등성 메서드에는 통계 기록 등을 제외하면
어떠한 부수 효과(side effect)도 존재해서는 안된다.

멱등성을 따질 땐 실제 서버의 백엔드 상태만 보면 되며, 각 요청에서 반환하는 응답코드는 다를 수 있다.

```http
// 멱등성을 가지는 예시. 클라이언트가 받는 응답이 동일하다.
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1

// 멱등성을 갖지 않는 예시.
POST /add_row HTTP/1.1
POST /add_row HTTP/1.1   -> Adds a 2nd row
POST /add_row HTTP/1.1   -> Adds a 3rd row
```

_출처: MDN Web Docs_
