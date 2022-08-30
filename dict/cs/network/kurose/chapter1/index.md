---
title: Chapter 1. Computer Networks and the Internet
---

## What is the Internet?

nuts and bolts 관점 / services 관점 

전자는 연결된 컴퓨터 기기 / 패킷 스위칭 / 커뮤니케이션 링크 / 네트워크로 구성. A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.

후자는 인터넷에서 노는거 등등.

hosts = end systems

> 인터넷이란 네트워크들의 네트워크이다. 

> 프로토콜은 네트워크 엔티티간 주고 받는 메시지의 형식과 메시지 전송과 수신의 방법을 규정한다. 

## The Network Edge

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

## The Network Core

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

## Performance: Delay, Loss, and Throughput in Computer Networks



## Protocol layers and Their Service Models

## Networks under attack

## History of Computer Networking; Chapter 1 Summary

## Chapter: Supplemental topics
