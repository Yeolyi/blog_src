---
title: Swift for-in과 forEach 차이
subtitle: Stackoverflow 번역글
date: 2021-09-14
---

collection을 순회할 때 사용하는 for-in문과 forEach 메소드가 모두 하는 일이 비슷
한데 왜 굳이~~ 둘 다 있는걸까 궁금해 검색을 해봤습니다.

for문에서는 우리에게 너무너무 익숙한 break와 continue 키워드를 사용해 control
flow를 유연하게 조작할 수 있습니다.

forEach 메소드에서는 클로저를 넘겨주기에 이와 같은 키워드를 사용할 수는 없습니다
. return을 사용하면 클로저가 종료되어 다음 element로 넘어갈 뿐입니다.

굳이 control flow의 미세한 조작이 필요하지 않다면 forEach를 사용하여 코드를 간결
하게 만들 수 있습니다.

> To sum up: Using a for loop gives us a much greater degree of control over an
> iteration, while using forEach enables us to take advantage of the power of
> closures and first class functions, even though we won’t be able to stop an
> iteration once it was started (apart from throwing an error, that is).

[Picking between a for loop and forEach](https://www.swiftbysundell.com/tips/picking-between-for-and-for-each/)

> Using the forEach method is distinct from a for-in loop in two important ways:
>
> 1. You cannot use a break or continue statement to exit the current call of
>    the body closure or skip subsequent calls.
> 2. Using the return statement in the body closure will exit only from the
>    current call to body, not from any outer scope, and won’t skip subsequent
>    calls.

[How to loop in Swift](https://sarunw.com/posts/how-to-loop-in-swift/)
