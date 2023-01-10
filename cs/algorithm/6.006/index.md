---
title: 6.006 Introduction to Algorithms
---

## 출처

[MIT OpenCourseWare - Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)

교재: [Introduction to Algorithms](https://ko.wikipedia.org/wiki/Introduction_to_Algorithms). CLRS라고도 한다.

## Course Description

기초적인 자료 구조(동적 배열, 힙, 균형잡힌 이진 탐색 트리, 해시 테이블)과 고전적인 문제 해결을 위한 알고리즘(정렬, 그래프 탐색, 다이나믹 프로그래밍)을 다룬다.

이들 문제에 대한 mathematical modeling을 소개한다.

알고리즘과 프로그래밍간 관계를 강조하며 성능 측정과 분석 기술을 배운다.

## 1. Algorithms and Computation

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

[스털링 근사](https://ko.wikipedia.org/wiki/스털링_근사). 나중에 practice problems에도 나오니 기억해두기.

## 2. Data Structures and Dynamic Arrays

자료 구조는 데이터를 저장하는 방법 및 해당 데이터를 처리하는 알고리즘(support operations on the data)을 의미한다.

가능한 처리 방법을 인터페이스(혹은 API, ADT)라 한다. 인터페이스는 명세, what, 자료 구조는 표현, how.

> Sequences maintain a collection of items in an **extrinsic** order, where each item stored has a **rank** in the sequence.

여기서 extrinsic하다는 것은 요소가 그런 속성을 가지는게 아니라 external party가 그 순서로 요소를 배치했다는 뜻이다.

시퀀스는 스택과 큐의 일반화이다. 이 둘은 시퀀스 작업의 부분 집합을 제공한다.

build(X), len, iter_seq, get_at, set_at, insert_at, delete_at, insert_first, delete_first, insert_last, delete_last.

> Sets maintain a collection of items based on an **intrinsic** property involving what the items are, usually based on a unique **key**.

Set은 딕셔너리나 다른 쿼리 데이터베이스의 일반화이다. 딕셔너리는 order operation이 없는 set이다.

시퀀스 인터페이스는 배열, 연결 리스트, 동적 배열 자료구조로 구현할 수 있다.

build, len, find, insert, delete, iter_ord, find_min, find_max, find_next, find_prev.

운영체제는 각 프로세스에게 고정된 메모리 청크들을 할당한다.

!@src/lecture1/Array_Seq.py@!

Linked list에서는 요소를 저장하기 위해 연속된 청크를 할당받는 것이 아니라 item과 next로 이루어진 node에 요소를 저장한다. 이러한 자료구조는 pointer-based, linked라고도 불린다.

!@src/lecture1/Linked_List.py@!

O(i)인 작업과 O(n)인 작업이 있음 기억하기.

**Dynamic array sequence**. 파이썬 리스트 append는 worst-case O(1)의 시간 복잡도가 아니다. 평균적으로 O(1)이며 이러한 asymptotic running time을 **amortized constant time**이라 한다. 재할당에 O(n)이지만 O(n)개의 operation에서 한번씩하니 평균적으로 O(1). 비용을 여러 operation에 분산시킨다.

Fill ratio, r이란 용량을 차지한 요소의 비중.

두 배씩 한다면 n = 1, 2, 4, 8, 16...에서 resize한다. resize cost는 Θ(1 + 2 + 4 + ...) = Θ(i=1~lgn 2^i)

이를 위해 추가적인 공간을 할당할 때 저장된 요소의 개수에 비례하는 만큼 할당한다. 두 배인 경우 table doubling이라 한다.

!@src/lecture1/Dynamic_Array_Seq.py@!

Excercise 해설 다시 읽어보기.

## Problem Session 1

[Little-O notation](https://en.wikipedia.org/wiki/Big_O_notation#Little-o_notation)

Big-O-notation 관련해서는 교재에 나와있는듯. 수학에서의 쓰임새와 컴퓨터에서의 쓰임새가 다른 것 같다.

Double-Ended Sequence의 구현법에는 양쪽에 빈 공간을 두는 방법과 앞부분용 배열과 뒷부분용 배열을 두는 방법이 있다. 후자의 경우 한 배열이 비게 되면 다시 build한다.

!@src/ps0-template/count_long_subarray.py@!

## 3. Sets and Sorting

Lecture note은 insertion, selection, merge sort를 재귀적으로 구현하고 각각에 대해 귀납적으로 정당성 증명을 하고 substitution과 recurrence tree를 통한 시간복잡도 증명을 보인다. 좀 지루함,,, 재귀 구현은 좀 장황하고 recitation에 있는 루프를 이용한 구현이 더 깔끔하다.

### 외부 사이트 참조

출처: [How to analyse Complexity of Recurrence Relation](https://www.geeksforgeeks.org/how-to-analyse-complexity-of-recurrence-relation/)

Substitution Method: We make a guess for the solution and then we use mathematical induction to prove the guess is correct or incorrect.

Recurrence Tree Method: In this method, we draw a recurrence tree and calculate the time taken by every level of the tree. Finally, we sum the work done at all levels.

Master Method: Master Method is a direct way to get the solution. The master method works only for the following type of recurrences or for recurrences that can be transformed into the following type.

> T(n) = aT(n/b) + f(n) where a >= 1 and b > 1

[Wikipedia - Mathmatical induction](https://en.wikipedia.org/wiki/Mathematical_induction#Description)

### Set interface

- Container: build
- Static: find
- Dynamic: insert, delete
- Order: find_max, find_min, find_prev(k), find_next(k)

정렬된 배열을 통해 그냥 배열로 구현한 것보다 비교적 효과적인 set을 구현할 수 있다. 정렬을 공부해보자.

원래 배열을 덮어쓰면 **destructive**, O(1)만큼의 추가 공간을 사용하면 **in place**한 정렬 알고리즘이다. destructive는 in place를 포함한다.

(Sorted_Array_Set 구현이 맞나? binary search에서 없는 경우에 대한 처리가 없는 것 같은데)

### Sorting

!@src/lecture2/permutation_sort.py@!

### Solving Recurrences

!@src/lecture2/selection_sort.py@!

Insertion sort, Merge sort에서 재귀를 통한 정당성 증명과 substitution, recurrence tree를 통한 시간 복잡도 계산 생략

선택 정렬은 가장 큰 i개의 요소들을 찾으며 쌓아가고, 삽입 정렬은 처음 i개의 요소들을 정렬되게 유지하며 쌓아간다. 둘 다 정렬된 subset들을 키우기에 incremental하다고 한다.

선택 정렬: omega(n^2) comparison, O(n) swaps, 삽입 정렬: omega(n^2) comparison, omega(n^2) swaps.

삽입 정렬은 stable하다.

logn은 n보다 '지수적'으로 느리게 성장한다. 지수적으로 느리게라는 말 어감이 신기.

in-place merge sort도 있다.

### Master Theorem

재귀 호출에서 한 단계 내려갈 때 a배 늘어나고 작업량은 1/b배 감소한다고 하자. f(n)과 n^(logba)를 비교하게 된다. Polynomial하면 간단해진다.

[Master Theorem](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>)

[Akra-Bazzi method](https://en.wikipedia.org/wiki/Akra–Bazzi_method)

## 4. Hashing

### Comparison Model

알고리즘이 요소들을 비교 연산을 통해서만 구분할 수 있다고 가정한다. 비교 연산의 반환값은 True나 False 두가지이다.

알고리즘 수행 시간의 하한은 비교의 횟수에 따라 정해진다.

### Decision Tree

모든 알고리즘은 수행된 작업들의 decision tree로 볼 수 있다.

Comparison model의 경우 내부 노드는 비교 연산을 의미하고 leaf는 알고리즘의 종료, 결과값을 의미한다.

비교 연산의 결과는 binary하므로 가지는 두 개로 갈라진다.

root-to-leaf path는 특정 입력에 대한 알고리즘 실행 추이?를 보여준다.

탐색 알고리즘의 경우 결과값이 없는 경우도 있으니 잎 노드가 최소 n+1개이어야 한다.

**트리의 높이가 알고리즘의 수행 시간을 의미한다.** 따라서 탐색 알고리즘의 경우 logn이 가능한 가장 짧은 트리의 높이이다.

> The relationship between Big Omega (Ω) and Little Omega (ω) is similar to that of Big-Ο and Little o except that now we are looking at the lower bounds. [geeksforgeeks](https://www.geeksforgeeks.org/analysis-of-algorithems-little-o-and-little-omega-notations/)

[Branching factor](https://en.wikipedia.org/wiki/Branching_factor)

To get faster, need an operation that allows super-constant ω(1) branching factor?? 상수 시간을 뛰어넘는 branching factor가 필요하다는 뜻인가.

Most operations within a computer only allow for constant logical branching, like if statements in your code. However, one operation on your computer allows for non-constant branching factor: specifically the ability to randomly access any memory address in constant time.

아무튼 Word-RAM의 O(1) random access를 활용하면 linear branching factor를 얻어낼 수 있다.

레지스터 크기는 보통 w(word)의 크기와 같다.

k = {0, ..., u-1}의 키를 사용하여 요소를 k번째 인덱스에 넣는다.

### Hashing

공간을 너무 많이 차지하므로 해시 함수를 통해 더 작은 direct access array를 사용할 수 있도록 한다.

> Hash function: h(k) : {0, . . . , u − 1} → {0, . . . , m − 1} (also hash map)

Direct access array는 hash table이라 부르고, h(k)는 k라는 키 값의 해시 값이라 한다.

비둘기집 원리에 의해 충돌이 일어날 수밖에 없는데, 다른 곳에 저장하는 open addressing과 dynamic set interface를 제공하는 또다른 자료 구조에 저장하는 chaining이 있다. 전자는 분석이 어렵지만 실용적이고 흔히 사용된다.

Chain size가 theta(n)이면 좋지 않다. 이를 위해 좋은 해시 함수가 필요하다.

### Hashing Functions

> h(k) = (k mod m)

2와 10의 거듭제곱과 거리가 먼 큰 소수가 주로 사용된다.

하지만 입력이 커지면 결국에는 O(n) 크기의 체인을 만들게 된다. If u > nm, every hash function from u to m maps some n keys to the same hash, by the pigeonhole principle.

> For a large enough key domain u, every hash function will be bad for some set of n inputs2. However, we can achieve good **expected** bounds on hash table performance by choosing our hash function **randomly** from a large family of hash functions. Here the expecta- tion is over our choice of hash function, which is independent of the input. **This is not expectation over the domain of possible input keys.**

Deterministic하지 않게 랜덤으로 해시 함수를 고를 수 있게 해보자.

> Universal hash function: h_ab(k) = (((ak + b) mod p) mod m)
>
> Hash Family H(p, m) = {h_ab | a, b ∈ {0, . . . , p − 1} and a != 0}

p는 u보다 큰 고정된 상수값. H는 universal family이다.

Universal family에서 임의로 선택한 해시 함수를 통해 해시한 임의의 두 키의 해시 값이 충돌할 확률은 1/m보다 작거나 같다.

어렵다,,,

위의 h_ab가 universal함은 이 강의에서 다루지 않음. 다만 이를 전제로 평균 체인의 길이가 어떨지는 구할 수 있음. 

[Universal hashing](https://en.wikipedia.org/wiki/Universal_hashing)에 정리가 잘 되어 있음.

[Perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function)

체이닝으로 충돌을 처리하는 해시 테이블을 universal family에서 임의로 선택한 해시 함수를 통해 구현하면 입력 키들과 무관하게 set 연산들을 **expected constant time**에 처리할 수 있다.

!@src/lecture4/Hash_Table_Set.py@!

시간 복잡도에 a(amortized)말고 e(expected?)도 추가됨. 