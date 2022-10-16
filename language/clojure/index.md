---
title: Clojure
---

## Living Clojure

Living Clojure by Carin Meier. Copyright © 2015 Carin Meier. All rights reserved. Published by O’Reilly Media, Inc., 1005 Gravenstein Highway North, Sebastopol, CA 95472.

[GitHub](https://github.com/gigasquid/wonderland-clojure-katas)

## Preface

> We will be concentrating on the major aspects of the language, not the minutaie, with the goal being to learn how to _think_ closure.

Clojure runs on the Java virtual machine(JVM).

!@chapter1/first.clj@!

## 1. A Guided Tour of Clojure

It is designed to get you up and running with a rounded undertstanding of the language, project setup, and useful libraries.

### 1. The Structure of Clojure

클로저 코드는 표현식으로 구성되어있으며 평가 후 결과를 반환한다. 가장 간단한 표현식은 그 자신으로 평가되며 simple values/literal로 불린다.

!@chapter1/values.clj@!

클로저에서는 함수나 연산자가 패러미터보다 먼저 등장한다.

Clojure collection에는 list, vector, map, set이 있다.

!@chapter1/collection.clj@!

모든 collection은 immutable하고 persistent하다. 전자는 불변성이고, 후자는 각 collection이 structural sharing을 사용해 새로운 버전의 스스로를 smart creation한다는 것이다.

Lists are actually at the heart of Clojure.

Clojure의 기본 구조는 LISP(LISt Processing)에서 왔고, LISP에서 표현식의 첫 요소는 연산자 혹은 함수로 간주된다. 따라서 Clojure에서 리스트는 `(어쩌구)로 표현된다.
