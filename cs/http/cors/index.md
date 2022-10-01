---
title: Cross-Origin Resource Sharing (CORS)
---

> Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that
> allows a server to indicate any origins (domain, scheme, or port) other than
> its own from which a browser should permit loading resources.

For security reasons, browsers restrict cross-origin HTTP requests initiated
from scripts.

서버가 헤더를 통해 브라우저가 어떤 출처(origin)로부터 정보를 얻는 것이 가능한지
명시하도록 한다. 브라우저가 요청을 하기 전에 서버로부터의 허락을 받아야 한다.

CORS 에러의 상세 내용은 보안 때문에 JS 내부에서 알 수 없다. 브라우저 콘솔을 봐야
한다.

> Simple request: CORS preflight를 유발하지 않는다. GET/HEAD/POST...

The request header of note is Origin, which shows that the invocation is coming
from https://foo.example.

Access-Control-Allow-Origin: \* means that the resource can be accessed by any
origin.

> Preflighted request: 브라우저가 OPTIONS 메소드를 사용해 요청을 하여 요청하려는
> 게 안전한지 알아본다.

> OPTIONS is an HTTP/1.1 method that is used to determine further information
> from servers, and is a safe method, meaning that it can't be used to change
> the resource.
