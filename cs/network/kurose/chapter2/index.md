---
title: The Application Layer
date: 2022-09-02
---

## Principles of Network Applications

[An Interview with Vint Cerf](https://www.youtube.com/watch?v=E9NHy7MCGm0). 추상화와 안정적인 API의중요성.

Client-Server model(오래되고 많이 씀) / Peer-to-Peer model

전자에서 클라이언트는 자기들끼리 소통하지 않고 IP 주소가 고정적이지 않음.

후자는 서버가 없고 peer가 있음. 다이렉트로 소통. Peer의 주소가 유동적이기 때문에관리가 훨씬 어렵다.

프로세스끼리의 통신이다. 같은 컴퓨터면 IPC, 다른 컴퓨터면 메시지. 후자에 관심가질 것.

Transport layer에서는 Socket이라는 추상화 레이어?를 가짐. Source, destination 두개의 소켓이 기본적으로 필요.

Addressing processes. 메시지를 받기 위해서는 identifier가 필요. 호스트 기기는 유일한 32비트 IP 주소를 가진다. 다만 같은 기기에 여러 프로세스가 있을 수도 있으니포트 넘버도 사용한다.

Application-layer 프로토콜은 주고 받는 메시지의 종류, 메시지의 syntax와 sementics, 프로세스가 메시지를 처리하는 규칙들이 규정되어있다.

open protocols(RFCs) / proprietary protocols(Skype, Zoom)

**Transport layer가 제공하는 서비스**

data integrity / timing / throughput / security

TCP: reliable transport, flow control, congestion control, connection-oriented

UDP: unreliable data transfer... 되는거 없음. 하지만 UDP위에서 application layer 가 기능을 구현할 수있음.

바닐라 TCP/UDP보안 없음. TLS(Transport Layer Security)는 TCP위에서 구현되어 보안 , Data integrity, end-point authentication 제공.

## The Web and HTTP

### Overview

웹페이지는 서로 다른 서버에 저장되어있을 수도 있는 object(HTML, JPEG...)로 구성되어있다. 웹페이지는 url로 찾아갈 수 있는 여러 참조된 object를 포함하는 base HTML-file로 구성된다.

### HTTP connections

HTTP: hypertext transfer protocol. client/server model.

클라이언트가 포트 80에서 서버와의 TCP 연결을 시작. 서버가 승낙. TCP connection socket을 통해 HTTP message(Application layer protocol message)가 교환되고 TCP 연결 종료.

HTTP는 stateless하다. State가 있으면 복잡해짐. 만약에 실패하면 cleanup이 필요.

Non-persistent HTTP / Persistent HTTP. 전자는 object 하나 보내면 끊김. 매번 RTT 가 걸림.

> RTT: time for a small packet to travel from client to server and back.

Non-persistent 총 소요 시간: RTT(연결 시작 위함) + RTT(파일 요청) + time to transmit file.

Persistent(HTTP 1.1): 연결을 끊지 않음. 1RTT.

### HTTP messages

HTTP message. request / response로 구분. request line / header lines/ body로 구성.

### Cookies

요청간 state를 저장하기 위해 쿠키를 사용할 수 있다.

서버가 response 메시지의 cookie header line에 쿠키를 담아 보내면 클라가 request message의 cookie header line에 이를 담아서 보냄. 쿠키는 브라우저에서 저장되어 관리됨. 쿠키를 통해 서버는 누가 누군지구분한다.

third party persistent cookies (tracking cookies) allow common identity (cookie value) to be tracked across multiple web sites. EU's general data protectino regulation(GDPR)

### Web caches

목표: 서버 필요 없이 클라이언트 요청에 응답.

브라우저가 web cache 시설을 향하도록 유저가 설정??함.

Web cache(a.k.a proxy server)는 클라이언트에게는 서버지만 서버 입장에서는 클라이언트. 서버는 캐시에게 특정 object의 캐싱 가능 여부를 response 헤더에 표시. Cache-Control.

캐시를 통해 서버도 여유로워진다. Access link utilization이 1에 가까워지면 잘 활용하고 있다는 뜻보다는 large queueing delay의 위험이 있다는 뜻으로 해석하면 될듯 .

### Conditional HTTP GET

캐시가 최신 자료?면 서버에서 object 자체를 보내지 않음. Object 보내는 딜레이가없어진다.

if-modified-since: <date>를 보내고 변경 없으면 304 Not Modified. 있으면 200이랑 data.

### HTTP/2 HTTP/3

HTTP/2의 주 목표는 multi-object 요청의 딜레이를 줄이는 것. 서버에서 클라이언트에 object를 보낼 때의유연성을 늘렸다.

mitigating HOL blocking: 큰 object가 앞에 있어도 frame으로 다같이 쪼갠 후 뒤에있는 object와 잘 엮어서(interleave) 보냄.

HTTP/3은 보안을 더하고, UDP를 기반으로 object별 에러 및 congestion(more pipelining) 관리를 더함.

## Email

### Infrastructure

user agents: mail reader. 메일 메시지를 읽고 수정함. 나가고 들어오는 메시지는 서버에 저장됨.

mail servers: 유저에게 온 메시지를 저장하는 mailbox. 보내질 메시지들의 message queue.

### SMTP

simple mail transfer protocol

메일 서버간에 메일을 주고받기 위해 존재.

SMTP RFC(5321)가 메일 서버간 TCP 연결 프로토콜을 규정한다. 포트 25.

SMTP handshaking -> SMTP transfer of messages -> SMTP closure.

Command(ASCII text) / response(status code , phrase interaction.

HTTP는 client pull, SMTP는 client push. SMTP에서 client는 유저말고 클라이언트 서버도 됨. HTTP는 각 object가 각자의 reponse message에 쌓여있지만 SMTP에서는 복수의 object가 multipart message로 보내짐?

RFC 2822가 e-mail 메시지 자체의 syntax를 규정한다.

SMTP를 통해 타겟 서버로 잘 가면, mail access protocol을 사용해 클라이언트가 서버로부터 메일을 가져온다. IMAP 등등... Gmail, Hotmail 등등은 SMTP와 IMAP(or POP)을기반으로 web-based(HTTP) interface를 제공하기도 한다.

## The Domain Name Service: DNS

> Domain Name System(DNS): distibuted database implemented in hierarchy of many name servers.

DNS는 core internet function이지만 application layer service로서 구현됨. Network Core 부분을 최대한단순하게 유지하려는 네트워크 디자인 철학에 따름.

[DNS 서버의 이해](https://webdir.tistory.com/161)

[Google Public DNS](https://dns.google)

### DNS Structure, function

hostname-to-IP-address translation / host aliasing(canonical, alias names) / mail server aliasing / load distribution

유지보수와 위험 분산, 확장성 등등을 위해 분산된 형태.

생각보다 성능이 중요하고 구현하기 까다롭다.

Root -> Top Level Domain -> Authoritative 순으로 위계 구성.

**Root name servers**

이름 못찾는 경우를 위한 last resort. 인터넷이 기능하기 위해 아주 중요함. ICANN이관리한다. [루트 네임 서버](http://www.ktword.co.kr/test/view/view.php?m_temp1=2642). 원본? 개수는 얼마 안되지만 레플리카가 전세계에 여러개 있는 듯.

[Distributed denial-of-service attacks on root nameservers](https://en.wikipedia.org/wiki/Distributed_denial-of-service_attacks_on_root_nameservers#November_30,_2015)

**Top-Level Domain(TLD) servers**

.com, .net 등등을 책임짐. 국가코드최상위도메인, 일반최상위도메인.

**Authoritative DNS servers**

Authoritatve 관련 책임. 기관이나 서비스 제공자들에 의해 유지보수될 수 있음.

**Local DNS server**

호스트가 DNS query를 날리면 이곳으로 보내짐. 로컬 캐시를 쓰거나 root dns server 로 요청을 포워딩. 각 ISP(internet service provider)는 로컬 DNS 서버를 가지며 scutil --dns 명령어로 찾아볼 수 있다.

### resolving DNS queries

Iterated query: 요청을 보낸 서버가 다음 요청을 보낼(다음 질문을 할?) 서버의 주소를 알려줌.

Recursive query: name resolution의 부담을 요청을 보낸 서버가 담당함. 계층 상단에있는 서버가 부담을가짐. 그래서 실전에서는 잘 안 씀.

**Caching DNS Information**

네임 서버가 매핑이 어떻게되는지 알면 이를 캐싱해서 다음 요청때는 즉각 응답함.

TLD servers typically cached in local name servers. 루트는 아닌가?

다만 캐시가 out-of-date일 수 있다. Best-effort name-to-address translation.

[Time to live](https://ko.wikipedia.org/wiki/타임_투_리브)

### DNS record format

DNS: distributed database storing resource records(RR)

RR format: (name, value, type, ttl)

type=A: name은 호스트 이름, value는 아이피 주소

type=NS: name은 도메인, value는 도메인의 authoritative name server의 호스트 이름 .

type=CNAME: name은 alias name for some canonical name. (www.ibm.com이 실제로는 serverease.backup2.ibm.com임. 이런식.) value는 canonical name.

type=MX: value는 name에 연관된 SMTP 메일 서버 이름.

### DNS protocol messages

DNS는 query response protocol. query와 reply가 같은 형식을 가진다. 둘 다 같은 identification을 가져서 요청과 응답을 연결할 수 있게 해준다.

## Peer-to-Peer File Distribution

(영상 없음)

## Video Streaming and Content Distribution Networks

### video characteristics

> [비트레이트](http://medlib.yu.ac.kr/mov/mt/term.htm)(BitRate): 비트(bit) + 레이트(rate,비율)의 합성어로, 정보의 비율을 뜻하는 것으로 1초에 얼마나 많은 데이터들이 흘러가는가를 나타낸다. 데이터량이많을수록 즉 숫자가 커질수록 소리는 원음에 가깝지만 용량이 커지게 된다. 비트레이트는 고정(CBR)과 가변(VBR)으로 나눌수 있다.

비디오의 용량을 줄이기 위해 spatial(한 이미지 내), temporal(인접한 이미지들 사이 ) coding이 가능하다 . CBR(constant bit rate)은 비디오 인코딩 rate(=bitrate?)가 일정하고 VBR(variable ...)은 다르다. MPEG 1(CD-ROM)은 1.5Mbps로 고정, MPEG2(DVD)는 3-6Mbps, MPEG4(가끔 인터넷에서 사용?)은 64kbps-12Mbps.

### streaming stored video

서버에서 클라이언트까지 bandwidth가 지속적으로 변하고, 패킷이 유실되거나 늦게 올수 있는게 challenge.

> [Streaming](https://www.cloudflare.com/ko-kr/learning/video/what-is-streaming/) is a method of viewing video or listening to audio content without actually downloading the media files.

Streaming이라 불리는 이유는 서버가 영상 뒷쪽을 보내는 동안 클라이언트는 앞쪽을플레이하고 있기 때문.

Continuous playout constraint: 네트워크 딜레이가 가변적이기 때문에(jitter) 원래영상 프레임?대로 플레이하려면 버퍼링이 필요하다. 클라이언트에서는 영상을 재생하기 전에 버퍼에 담는다. 버퍼링.

client-side buffering and playout delay: compensate for network-added delay, delay jitter.

### DASH: dynamic client-driven streaming

Bandwidth가 영상 본래 속도로 재생할 수 없을 정도로 작을 경우. Buffer starvation.

Dynamic, Adaptive, Streaming over Http.

비디오 파일을 여러 청크로 나누고 각 청크를 서로 다른 정도로 인코딩하여 저장한다. 파일들은 여러 CDN 노드들에 복제되어있고 manifest file이 청크들의 URL을 제공한다. 클라이언트는 주기적으로 bandwidth를체크하고 이에 맞는 coding rate의 파일을 manifest를 참고해 가져온다. 클라이언트가 할 일이 많아짐!

### CDNs, example

challenge: how to stream content to hundreds of thousands of simultaneous users?

Content Distributino Networks: 비디오의 여러 복제본을 여러 지리학적 장소에서 저장하고 제공함. enter deep / bring home 으로 나뉨.

Service provider가 manifest를 반환함. 이를 통해 가까운 곳 중 막히지 않는 곳에서적당히 비디오를 받아옴.

넷플릭슨는 isp는 아니고 이를 이용한 컨텐츠 제공자임. 따라서 over-the-top, OTT라고도 함. 어플리케이션레벨 서비스. 챕터 1에서 서비스로서의 인터넷의 예시.

## Socket Programming: Creating Network Applications

Socket abstraction / UDP socket / TCP socket

소켓이 Application layer와 Transport layer 사이 유일한 소통 방법.

Transport 까지는 OS에 의해 구현되어 있다.

UDP에서는 데이터 전송 전 handshaking이 없고, 모든 패킷에 송신자의 IP 주소와 포트번호가 있다. 보내진정보는 유실될 수 있고 순서가 바뀐 채 도착할 수 있다.

소켓이 만들어질 때는 IP? 말고도 더 있어서 인터넷 프로토콜을 쓸거라고 명시해주어야 한다.

서버측에서는 받고 보내는걸 같은 소켓에서 하네?

```py
from socket import *
serverName = 'hostname'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_DGRAM)
message = raw_input('Input lowercase sentence:')
# 서버 이름과 IP간 변환은 sendto 메서드가 해줌
clientSocket.sendto(message.encode(), (serverName, serverPort))
modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
print modifiedMessage.decode()
clientSocket.close()
```

```py
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind((serverName, serverPort))
print("The server is ready to receive")
while True:
    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
```

TCP는 connection based라서 데이터를 주고받기 전에 연결을 성립시켜야한다.

클라이언트가 서버에 contact해야하고, **이후 서버 TCP는 해당 클라이언트를 위한 새로운 소켓을 만든다 !** 이를 통해 서버가 여러 클라이언트와 통신할 수 있다. 소스 포트 번호가 클라이언트를 구분하기 위해사용됨.

welcoming socket과 이후 생기는 new socket을 구분하자. 신기하게도 둘 다 포트 넘버가 같음. 이건 챕터 3 에서 더 살펴보자.

TCP provides reliable, in-order byte-stream transfer("pipe") between client and server process.

```py
from socket import *
serverName = 'serverName'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))
sentence = raw_input('Input lowercase sentence.')
clientSocket.send(sentence.encode())
modifiedSentence = clientSocket.recv(1024)
print('From Server', modifiedSentence.decode())
clientSocket.close()
```

```py
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print 'The Server is ready to receive'
while True:
    connectionSocket, addr = serverSocket.accept()
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = sentence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    connectionSocket.close()
```

Server Reply(UDP): The application code at the server determines client IP address and port # from the initial segment sent by client, and must explicitly specify these values when sending into a socket back to that client.

## Chapter 2: Supplemental topics

Web tracking, 3rd party cookies, GDPR

> First party cookie: from website you chose to visit(provides base html file).

> Third party cookie: from website you did not choose to visit

Tracking may be invisible to user.

써드파티 쿠키는 Firefox, Safari에서 기본적으로 비활성화되어있고, 크롬에서는 2023 년에 비활성화될 예정이다.

GDPR덕에 쿠키 물어봄.

## Interactive Problems

DNS has always been designed to use both UDP and TCP port 53 from the start 1 , with UDP being the default, and fall back to using TCP when it is unable to communicate on UDP, typically when the packet size is too large to push through in a single UDP packet.

https://www.infoblox.com/dns-security-resource-center/dns-security-faq/is-dns-tcp-or-udp-port-53/

assuming the root DNS server doesn't have the IP we want, where does the response link? -> DNS TLD

HTTP 통신은 TCP라서 RTT 두배인거 기억하기!!

DNS and HTTP delays 다시 풀어보기.

etag 알아보기.
