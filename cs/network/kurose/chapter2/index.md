---
title: The Application Layer
date: 2022-09-02
---

## Principles of Network Applications

## The Web and HTTP

### Overview

웹페이지는 서로 다른 서버에 저장되어있을 수도 있는 object(HTML, JPEG...)로 구성되어있다. 웹페이지는 url로 찾아갈 수 있는 여러 참조된 object를 포함하는 base HTML-file로 구성된다. 

### HTTP connections

HTTP: hypertext transfer protocol. client/server model. 

클라이언트가 포트 80에서 서버와의 TCP 연결을 시작. 서버가 승낙. TCP connection socket을 통해 HTTP message(Application layer protocol message)가 교환되고 TCP 연결 종료. 

HTTP는 stateless하다. State가 있으면 복잡해짐. 만약에 실패하면 cleanup이 필요. 

Non-persistent HTTP / Persistent HTTP. 전자는 object 하나 보내면 끊김. 매번 RTT가 걸림. 

> RTT: time for a small packet to travel from client to server and back. 

Non-persistent 총 소요 시간: RTT(연결 시작 위함) + RTT(파일 요청) + time to transmit file. 

Persistent(HTTP 1.1): 연결을 끊지 않음. 1RTT.

### HTTP messages

HTTP message. request / response로 구분. request line / header lines/ body로 구성. 

### Cookies

요청간 state를 저장하기 위해 쿠키를 사용할 수 있다. 

서버가 response 메시지의 cookie header line에 쿠키를 담아 보내면 클라가 request message의 cookie header line에 이를 담아서 보냄. 쿠키는 브라우저에서 저장되어 관리됨. 쿠키를 통해 서버는 누가 누군지 구분한다. 

third party persistent cookies (tracking cookies) allow common identity (cookie value) to be tracked across multiple web sites. EU's general data protectino regulation(GDPR)

### Web caches

목표: 서버 필요 없이 클라이언트 요청에 응답. 

브라우저가 web cache 시설을 향하도록 유저가 설정??함. 

Web cache(a.k.a proxy server)는 클라이언트에게는 서버지만 서버 입장에서는 클라이언트. 서버는 캐시에게 특정 object의 캐싱 가능 여부를 response 헤더에 표시. Cache-Control. 

캐시를 통해 서버도 여유로워진다. Access link utilization이 1에 가까워지면 잘 활용하고 있다는 뜻보다는 large queueing delay의 위험이 있다는 뜻으로 해석하면 될 듯. 

### Conditional HTTP GET

캐시가 최신 자료?면 서버에서 object 자체를 보내지 않음. Object 보내는 딜레이가 없어진다. 

if-modified-since: <date>를 보내고 변경 없으면 304 Not Modified. 있으면 200이랑 data. 

### HTTP/2 HTTP/3

HTTP/2의 주 목표는 multi-object 요청의 딜레이를 줄이는 것. 서버에서 클라이언트에 object를 보낼 때의 유연성을 늘렸다. 

mitigating HOL blocking: 큰 object가 앞에 있어도 frame으로 다같이 쪼갠 후 뒤에 있는 object와 잘 엮어서(interleave) 보냄. 

HTTP/3은 보안을 더하고, UDP를 기반으로 object별 에러 및 congestion(more pipelining) 관리를 더함. 

## Email



## The Domain Name Service: DNS

## Peer-to-Peer File Distribution

(영상 없음)

## Video Streaming and Content Distribution Networks

## Socket Programming: Creating Network Applications

## Chapter 2: Supplemental topics