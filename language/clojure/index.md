---
title: Clojure
---

## Living Clojure

Living Clojure by Carin Meier. Copyright © 2015 Carin Meier. All rights reserved. Published by O’Reilly Media, Inc., 1005 Gravenstein Highway North, Sebastopol, CA 95472.

[GitHub](https://github.com/gigasquid/wonderland-clojure-katas)

## Preface

> We will be concentrating on the major aspects of the language, not the minutaie, with the goal being to learn how to _think_ closure.

Clojure runs on the Java virtual machine(JVM).

!@playground/first.clj@!

## 1. A Guided Tour of Clojure

It is designed to get you up and running with a rounded undertstanding of the language, project setup, and useful libraries.

### 1. The Structure of Clojure

클로저 코드는 표현식으로 구성되어있으며 평가 후 결과를 반환한다. 가장 간단한 표현식은 그 자신으로 평가되며 simple values/literal로 불린다.

!@playground/values.clj@!

클로저에서, 함수나 연산자가 패러미터보다 먼저 등장한다.
