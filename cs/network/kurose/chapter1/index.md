---
title: Chapter 1. Computer Networks and the Internet
---

## 1. What is the Internet?

nuts and bolts 관점 / services 관점 

전자는 연결된 컴퓨터 기기 / 패킷 스위칭 / 커뮤니케이션 링크 / 네트워크로 구성. A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.

후자는 인터넷에서 노는거 등등.

hosts = end systems

> 인터넷이란 네트워크들의 네트워크이다. 

> 프로토콜은 네트워크 엔티티간 주고 받는 메시지의 형식과 메시지 전송과 수신의 방법을 규정한다. 

## 2. The Network Edge

access networks: edge device를 first hop router, 더 넓은 네트워크로 연결해줌. 

physical media: 구리선, 전파 등등..

Access network에는 주거용, 시설(institution)용, 모바일용이 있다. 속도와 수용 인원?을 눈여겨볼 수 있다. 

**주거용** 

Cable-based access는 frequency division multiplexing(FDM)에 의존한다. Asymmetric해서 집 방향이 더 빠르다. 소비가 중요하니까. 

Digitab subscriber line(DSL)은 집에서 central office로 곧장 간다. 얘도 asymmetric. 속도가 집에서 office까지 거리에 크게 좌우된다. 

보통 모뎀, 라우터, 와이파이가 하나에 뭉쳐있다. 

**Wireless access networks**

local과 wide로 나눌 수 있다. 와이파이와 5G. Access point라 불리는 base station을 경유함. 

**Enterprise networks**

가정과는 달리 스위치와 라우터가 많아 여러 기기들을 감당할 수 있다. 

데이터베이스 네트워크도 여기에 속함

> Packet이란 데이터를 작은 청크로 나눈 것. 각각의 패킷에는 프로토콜에 정의된 헤더가 있다. 

패킷 길이 L, transmission rate R의 access 네트워크가 있으면 packet transmission delay = L/R. 

Link transmission rate == link capacity == link bandwidth.

**Physical media**

Physical media는 이 강의에서는 가볍게만 살펴볼 것. 

guided media / unguided media

## 3. The Network Core

packet switching / circuit switching / structure of today's internet

Network core는 라우터의 망으로 이루어져 있다. 

### Packet Switching

> Packet switching: hosts break application-layer messages into packets, network forwards packet from one router to the next, across links on path from source to destination.

Forwarding은 local한 동작. 도착한 패킷을 적당한 출구로 내보냄. Forwarding table. 

테이블은 routing algorithm으로 만드는데, 라우팅이란 global한 동작으로 source-destination 경로를 결정한다. 

packet transmission delay = L/R. store and forward: 패킷을 다음으로 전달하려면 패킷 전체가 도착해야한다. 

보낼 수 있는 것보다 많이 들어오면 queueing. 메모리보다 많이 들어오면 패킷은 dropped. 

### Ciruit Switching

> End-end resources allocated to, reserved for "call" between source and destination. 

FDM: Frequency Division Multiplexing

TDM: Time Division Multiplexing

Packet switching은 bursty data에 좋다. 짧은 시간에 확 보내야 하는 것. Exessive congestion이 가능하다는 문제가 있다. 패킷 지연과 손실이 발생할 수 있다. 

수많은 access network를 이을 방법이 뭘까? ISP들 사이를 IXP로 잇는다. 

구글 같은 기업은 content provider network를 만들어 end user 가까이서 네트워크를 제공?할 수도 있다. 

## 4. Performance: Delay, Loss, and Throughput in Computer Networks

Components of network delay / traceroute / packet loss / throughput

d_proc: nodal processing. 비트 에러 체크 등등..
d_queue: queueing delay. 정체 상태에 따라 결정
d_trans: transmission delay. L/R
d_prop: propagation delay. 물리적 링크 길이 / 전파 속도. d/s

마지막 두 개는 자주 헷갈림. Caravan analogy. 

> traceroute program: provides delay measurement from source to router along end-end Internet path towards destination. 

> Throughput: rate (bit/time unit) at which bits are being sent from sender to receiver. 

throuput은 가장 느린 곳에 의해 결정. bottleneck link: link on end-end path that constrains end-end throughput

보통은 network edge가 가장 느려 여기가 bottleneck link가 됨. 

## 5. Protocol layers and Their Service Models

네트워크는 복잡하고 많은 요소들로 구성되어 있다. 

Architectural layering / Internet layers / encapsulation

Layers: each layer implements a service. via its own internal-layer actions, relying on services provided by layer below. 

레이어로 구성함으로서 reference model??을 통해 소통할 수 있다. 모듈화가 용이하다. 캡슐화. 

[Reference Model](https://en.wikipedia.org/wiki/Reference_model)

Application: 네트워크 어플리케이션을 지원. HTTP, IMAP, SMTP, DNS
Transport: 프로세스간 데이터 전송. TCP, UDP
Network: Datagram을 source-destination 라우팅. 호스트간. IP, routing protocols. 
Link: 이웃한 네트워크 요소간 데이터 전송. Eternet, 802.11(WiFi), PPP
Physical: 선으로 전송

**What's a packet really called?**

Application - Messages
Transport - Message를 캡슐화(encapsulate)해 segment. 
Network - Datagram
Link - Frame
Physical - ?

강의 자료에서 스위치는 link까지만 구현, 라우터는 network까지만 구현되어있음. 

## 6. Networks under attack

What can bad actors do? / What defenses designed, deployed?

인터넷은 본래 보안을 크게 신경쓰지 않고 디자인되었다. 

[Secure by Design](https://en.wikipedia.org/wiki/Secure_by_design)

**Packet sniffing**

브로드캐스트 매체에서 패킷 전체을 훔칠 수 있다.

**IP spoofing**

가짜 source 주소로 패킷 주입. 

**Denial of Service(D0S)**

많은 양의 가짜 트래픽으로 서버의 자원을 사용할 수 없게 함. 

> A distributed denial-of-service (DDoS) attack occurs when multiple systems flood the bandwidth or resources of a targeted system, usually one or more web servers

[How AWS Shield mitigates events](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-event-mitigation.html)

Authentication(심카드는 하드웨어로서의 예시)

Confidentiality(via encryption)

Integrity checks(digital signitures prevent/detect tempering)

Access restrictions(password-protected VPNs)

Firewalls: Specialized middleboxes in access and core networks.

챕터 8에서 계속.

## 7. History of Computer Networking; Chapter 1 Summary



## 8. Chapter: Supplemental topics
