---
title: HTTP Messages
---

## 개요

> HTTP messages are how data is exchanged between a server and a client. Request와 response로 나뉜다. 

여러줄에 걸친 ASCII로 인코딩된 텍스트 정보로 구성되어있다. Human-readable한 메시지였지만 HTTP/2에서는 HTTP frame으로 나뉘어 최적화가 이루어진다. 

Request/Response 모두 start-line, header, blank line, body로 구성된다.

- start-line: 항상 한 줄
- header: optional. 요청을 구체화하거나 body를 설명
- blank line: 모든 메타 정보가 보내졌음을 의미
- body: 요청과 연관된 데이터를 포함. body의 유무와 크기는 header에 명시. 

start-line + header = head of the reqeust
payload = body

## HTTP Requests

### Start line

HTTP method, request target, HTTP version으로 구성

request target의 구분
- origin form: absolute path. '?'와 쿼리 스트링이 따라옴. 가장 일반적인 사용. 
- absolute form: complete URL. 프록시에 연결되었을 때 GET에서 사용?
- authority form: 도메인 이름과 포트. HTTP tunnel을 구성할 때 CONNECT와 함께 사용. 
- asterisk form. OPTIONS와 함께 사용. 

### HEADERS

- General headers. 메시지 전체에 적용됨
- Request headers: 요청을 더욱 구체화함. 
- Representation headers: body가 있는 경우에 그 포맷을 명시

### Body

Single-resource body/Multiple-resource body

## HTTP Responses

### Statue line

protocol version + status code + status text

### Headers

General headers, **Response** headers, Representation headers

### Body

status code가 충분한 경우에는 body가 없어도 됨. 

Single-resource bodies, consisting of a single file of known length, defined by the two headers: Content-Type and Content-Length.
Single-resource bodies, consisting of a single file of unknown length, encoded by chunks with Transfer-Encoding set to chunked.
Multiple-resource bodies, consisting of a multipart body, each containing a different section of information. These are relatively rare.

??

## HTTP/2 Frames

HTTP/1.x의 메시지는 헤더가 압축되어있지 않고, 헤더의 내용이 반복적이며, multiplexing이 불가능해 여러번 서버 연결을 열어야한다는 단점이 있다. 

HTTP/2에서는 HTTP/1.x의 메시지를 stream에 임베디드된? 프레임으로 나눈다. Data와 header가 분리되어 header 압축이 가능하다. 여러 stream이 합쳐져 multiplexing이 가능하다. 

The HTTP/2 framing mechanism adds a new intermediate layer between the HTTP/1.x syntax and the underlying transport protocol, without fundamentally modifying it: building upon proven mechanisms.
