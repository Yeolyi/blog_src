---
title: 자료구조/알고리즘
---

## MIT - Introduction to Algorithms

### 출처

[MIT OpenCourseWare - Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)

### Course Description

기초적인 자료 구조(동적 배열, 힙, 균형잡힌 이진 탐색 트리, 해시 테이블)과 고전적인 문제 해결을 위한 알고리즘(정렬, 그래프 탐색, 다이나믹 프로그래밍)을 다룬다.

이들 문제에 대한 mathematical modeling을 소개한다.

알고리즘과 프로그래밍간 관계를 강조하며 성능 측정과 분석 기술을 배운다.

### 1. Algorithms and Computation

강의의 목표는 computation problem을 해결하고 해결책이 올바르고 효율적임을 커뮤니케이팅하는 것.

> A **problem** is a binary relation connecting problem inputs to correct outputs.

입력을 종종 문제의 instance라고도 한다.

랜덤 함수는 그럼 알고리즘이 아닌가??

모든 입력에 대한 출력을 명시하면 너무 많으므로 올바른 출력이 만족시켜야 할 verifiable predicate(a property)를 제공한다.

> A (deterministic) **algorithm** is a procedure that maps inputs to single outputs.

알고리즘의 타당성을 증명하기. 작은 입력은 case analysis하면 된다. 커다란 입력을 한정된 크기의 코드로 처리하기 위해서는 **재귀**나 루프를 사용해야하고 따라서 알고리즘의 올바름을 증명하기 위해 귀납법을 사용하게 된다.

알고리즘의 효율성은 하드웨어에 종속적이지 않도록 fixed-time operation의 개수를 세서 측정한다. Asynmtotic performance. 입력의 크기와 무관한 다른 변수가 효율성 측정에 영향을 주지 않도록한다.

> O Notation: Non-negative function g(n) is in O(f(n)) if and only if there exists a positive real number c and positive integer n0 such that g(n) ≤ c · f(n) for all n ≥ n0.

보통 g(n) equel to O(f(n))이라고 말하지만 g(n) ∈ O(f(n))이 더 정확한 표현이다.

> Ω Notation: Non-negative function g(n) is in Ω(f(n)) if and only if there exists a positive real number c and positive integer n0 such that c · f(n) ≤ g(n) for all n ≥ n0.

> Θ Notation: Non-negative g(n) is in Θ(f (n)) if and only if g(n) ∈ O(f (n)) ∩ Ω(f (n)).

Upper bounds (O), lower bounds (Ω), tight bounds (Θ)

Exponential인 경우를 2^(Θ^(n^c))로 쓰네?

보통 입력의 크기가 n이지만, 그래프를 다룰 때에는 Θ(|V| + |E|)이고 행렬을 다룰떄는 Θ(n^2)이다.

알고리즘에 사용되는 자원을 계산하기 위해서는 컴퓨터가 기본 연산을 수행하는데 얼마나 걸리는지 모델링해야한다. 이러한 연산을 모아 model of computation이 만들어진다.

수업에서는 Word-RAM 모델을 사용한다. memory와 processor로 구성된 컴퓨터. Machine word는 w비트의 시퀀스. Word-RAM 프로세서는 사칙연산, 모듈러, 비트 연산등을 두 machine word로 수행할 수 있다.

word는 cpu가 메모리에서 한번에 꺼내올 수 있는 데이터의 양. 요즘 컴퓨터에서는 64비트.

Recitation 5 페이지 주석은 또 읽어보기.

[Model of computation](https://en.wikipedia.org/wiki/Model_of_computation)

[Word RAM](https://en.wikipedia.org/wiki/Word_RAM)

> A data structure is a way to store non-constant data, that supports a set of operations.

> The set of operations supported by a data structure is called an interface

[스털링 근사](https://ko.wikipedia.org/wiki/스털링_근사)

## 알고리즘 문제 해결 전략

[내용 보기](./jongman/)

## 정리 필요한 예전 기록

[탐색](search)

[정렬](sorting)

## 기타

[실무 개발자에게 알고리즘은 덜 중요할까?](https://medium.com/@ghilbut/실무-개발자에게-알고리즘은-덜-중요할까-fcbab7f87074)
