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



## Connectionless Transport: UDP

## Principles of Congestion Control

## TCP Congestion Control

## Evolution of Transport Layer Functionality

## Summary
