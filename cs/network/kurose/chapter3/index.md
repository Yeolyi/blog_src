---
title: The Transport Layer
date: 2022-09-05
---

## Introduction and Transport-layer Services

Household analogy: A의 집에 12명이 B의 집에 12명에게 편지를 보낸다. 집이 호스트, 사람이 프로세스, 편지 내용이 앱 메시지. Transport protocol이 사람간 multiplexing을 해주고 Network protocol이 우편 서비스이다. 

TCP: reliable, in-order delivery. congestion control. flow control. connection setup

A byte stream abstraction, that does not preserve boundaries between message data sent in different socket send calls at the sender.

[Difference between message-oriented protocols and stream-oriented protocols ](https://stackoverflow.com/questions/3017633/difference-between-message-oriented-protocols-and-stream-oriented-protocols)

UDP: unreliable, unordered delivery. no-frills extension of 'best-effort' IP.

A message abstraction, that preserves boundaries between message data sent in different socket send calls at the sender.

둘 다 delay guarantee와 bandwidth guarantee는 없다. 

## Multiplexing and Demultiplexing

multiplexing at sender: handle data from multiple sockets, add transport header(later used for demultiplexing)

demultiplexing at receiver: use header info to deliver received segments to correct socket. 

UDP에서 호스트는 IP 주소 및 datagram 헤더에 있는 destination 포트 번호를 통해 datagram을 올바른 소켓에 전달한다. 따라서 여러 datagram이 한 소켓에 전달될 수 있다. 

TCP는 connection oriented이며 수신/송신 각각의 IP/port을 모두 사용하여 소켓을 판별한다. 따라서 서버는 서로 다른 클라이언트를 담당하는 동시다발적인 TCP 소켓들을 지원할 수 있다. 

근데 dest IP까지 필요한건가?? 도착한 애들끼리는 IP가 같이 않음?

## Connectionless Transport: UDP

## Principles of Congestion Control

## TCP Congestion Control

## Evolution of Transport Layer Functionality

## Summary
