---
title: Resources and URIs
---

브라우저는 인터넷의 자료에 접근하기 위해 both the identity and the location of the resources가 필요하다. identity는 뭐지??

## Identifying resources on the Web

> Resource란 HTTP 요청의 target이다.

### URLs and URNs

> A URI (Uniform Resource Identifier) is a string that refers to a resource. URL은 위치를 통해 식별하고 URN은 이름을 통해 식별한다(ISBN 등). 

> Uniform Resource Locator (URL) is a text string that specifies where a resource (such as a web page, image, or video) can be found on the Internet.

```txt
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```

> A Uniform Resource Name (URN) is a URI that identifies a resource by name in a particular namespace.

```txt
urn:isbn:9780141036144
urn:ietf:rfc:7230
```

### Syntax of Uniform Resource Identifiers

- Scheme or protocol: 브라우저는 http 외에도 mailto:, ftp: 등도 다룬다. 
- Authority: www.example.com is the domain name or authority that governs the namespace. 
- Port: https://www.naver.com:80하면 ERR_SSL_PROTOCOL_ERROR. HTTPS는 443.
- Path: Nowadays, it is mostly an abstraction handled by Web servers without any physical reality.
- Query
- Fragment: It is worth noting that the part after the #, also known as the fragment identifier, is never sent to the server with the request.

Increasingly, browsers are removing support for using FTP to load subresources, for security reasons.

## Data URLs

> Data URLs, URLs prefixed with the data: scheme, allow content creators to embed small files inline in documents.

Data URLs are treated as unique opaque origins by modern browsers, rather than inheriting the origin of the settings object responsible for the navigation?

```txt
data:[<mediatype>][;base64],<data>
data:,Hello%2C%20World%21
data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==
data:text/html,%3Ch1%3EHello%2C%20World%21%3C%2Fh1%3E
data:text/html,<script>alert('hi');</script>
```

> Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation.

ASCII로만 구성되어 url-safe하다. 

```txt
echo -n hello|base64
# aGVsbG8=
# -n이 있을때랑 없을때랑 다름
# https://stackoverflow.com/questions/30761986/what-is-the-difference-between-echo-and-echo-n
```

[What are Data URLs](https://flaviocopes.com/data-urls/)

보안적인 이슈로 제약이 있다. 

## Choosing between www and non-www URLs

> In an HTTP URL, the first substring that follows the initial http:// or https:// is called the domain name. 

This domain name is hosted on a server where the document resides.

> This official domain is called the canonical name. 

301 리다이렉트와 <link rel="canonical">을 활용할 수 있다. 

## MIME Types

### Structure of a MIME type

> A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) indicates the nature and format of a document, file, or assortment of bytes.

브라우저는 URL의 처리 방법을 확장자가 아닌 MIME 타입으로 결정하기 떄문에 서버에서는 Content-Type 헤더에 이를 정확하게 보내주어야 한다.

```txt
type/subtype;parameter=value
```

- Discrete types are types which represent a single file or medium, such as a single text or music file, or a single video. 
- A multipart type is one which represents a document that's comprised of multiple component parts, each of which may have its own individual MIME type; or, a multipart type may encapsulate multiple files being sent together in one transaction.

application: 다른 범주에 들어가기 애매한 것들. 
audio, example, font, image, model, text,,,

message, multipart.

### Important MIME types for Web developers

application/octet-stream: 이진 파일의 기본 설정값. 'Save As' dialog를 보임?
text/plain: textual 파일의 기본 설정값.
text/css
text/html
text/javascript

vercel로 호스팅한거는 application/javascript를 사용하는데 mdn docs에 따르면 이는 legacy. [참고](https://stackoverflow.com/questions/21098865/text-javascript-vs-application-javascript)

image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp

multipart 부분 생략

### Importance of setting the correct MIME type

잘 설정하지 않으면 <video> <audio> 태그 등을 사용할 수 없고 디스크에 저장해야 다른 액션을 할 수 있다. 

application/vnd.mspowerpoint 등으로 명시

### MIME sniffling

> In the absence of a MIME type, or in certain cases where browsers believe they are incorrect, browsers may perform MIME sniffing — guessing the correct MIME type by looking at the bytes of the resource.

## Common MIME types

-
