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

SMTP(Simple Mail Transfer Protocol)은 전자 메일 전송을 위해 사용되는 인터넷 표준 통신 프로토콜이다. 메일 서버 및 다른 메시지 전송 에이전트는 SMTP를 사용해 서로 메일 메시지를 주고받는다. 
보통 일반 텍스트는 25번 포트를 통해, 암호화된 통신은 587번 포트를 통해 TCP를 사용한다. 

### 2022-09-04

**CDN**

```css
<link rel="preconnect" href="https://fonts.googleapis.com"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet">
```

CDN(Content Delivery Network)이란 협력하여 인터넷 콘텐츠를 고속 전송하는 지리적으로 분산된 서버 집단이다. 

CDN을 통해 HTML 페이지, javascript 파일, 스타일시트, 이미지, 동영상등 인터넷 콘텐츠를 로드하는 데 필요한 자산을 신속하게 전송할 수 있다.

https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/
https://en.wikipedia.org/wiki/Content_delivery_network/
