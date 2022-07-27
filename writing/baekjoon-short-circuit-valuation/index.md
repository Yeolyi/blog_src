---
title: 단축 평가
subtitle: 백준 풀다가 억울해서 쓰는 글
date: 2021-10-21
---

[단축 평가(short-circuit evaluation)](https://en.wikipedia.org/wiki/Short-circuit_evaluation)에 대해 대충 알고만 있어서 백준 풀다가 고생하고 쓰는 글입니다😭

## 단축평가란?

> ...semantics of some Boolean operators in some programming languages in which the second argument is executed or evaluated only if the first argument does not suffice to determine the value of the expression

단축 평가란 표현식을 다 평가하기도 전에 평가 결과가 확정되면 나머지 과정을 생략하는 것입니다. 

## 자바스크립트에서의 단축 평가 활용

단축 평가를 잘 활용할 수 있는 자바스크립트로 예시를 보여드릴게요. [출처](http://www.yes24.com/Product/Goods/92742567) 

``` {class="language-javascript"}
console.log("CAT" && "DOG") // DOG
console.log("CAT" || "DOG") // CAT
```
*자바스크립트에서의 단축 평가*

두 표현식이 왜 다른 값으로 평가되는지 감이 오시나요? **자바스크립트에서 논리 연산의 결과는 논리 연산의 결과를 결정하는 피연산자의 값이라고 생각할 수 있습니다.** 위 식은 "DOG"까지 확인해야 AND값이 확실해지니 "DOG"로 평가되고, 아래 식은 "CAT"만 봐도 OR값이 확실해지니 "CAT"으로 평가되었다고 생각할 수 있습니다. 

덕분에 자바스크립트에서는 단축 평가로 if문을 대체할 수 있습니다. 

``` {class="language-javascript"}
let printFinished = true;
let message = printFinished && "프린트가 끝났습니다."
```
*단축 평가로 if문 대체하기*

## 내가 고생한 이유

[사회망 서비스](https://www.acmicpc.net/problem/2533)를 swift로 푸는 과정에서 그래프를 순회할 일이 생겼습니다. 모든 자식 노드를 search 함수로 평가하고 반환받은 부울 값들을 모아 AND 연산을 했습니다. 

``` {class="language-swift"}
childInstalled = childInstalled && search(next)
```
*어떤 문제가 생길까요?*

그런데 함수 호출하고 연산하고 하는 것이 귀찮았던 저는 위 코드로 코딩해버렸고,,, childInstalled가 true가 되는 순간 함수 호출 안되고 모든 순회가 멈춰버려서 행복한 디버깅 시간을 보냈답니다😄

단축 평가를 알지만 왜 중요한지는 몰랐고, 함수가 아닌 변수로 쓸 때는 별 문제가 없었어서 별 생각 없이 코딩하다가 생긴 헤프닝이었습니다. 


