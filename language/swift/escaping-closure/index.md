---
title: 클로저에 대해
---

[docs.swift.org](https://docs.swift.org/swift-book/LanguageGuide/Closures.html)

클로저의 기본 정의는 다음과 같다. 함수도 사실 클로저의 특별한 형태이다.

> Closures are self-contained blocks of functionality that can be passed around and used in your
> code.

Swift에서 함수는 일급 객체이다.

> In computer science, a programming language is said to have first-class functions if it treats
> functions as first-class citizens. This means the language supports passing functions as arguments
> to other functions, returning them as the values from other functions, and assigning them to
> variables or storing them in data structures.[

클로저는 그것이 정의된('실행된'이 아니다! lexical scope라고 하던가...) surrounding context에 있는 변
수와 상수를 capture하여 그 context가 소멸된 후에도사용할 수 있다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

클로저는 참조 타입이다.

```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// returns a value of 50

incrementByTen()
// returns a value of 60
```

클로저가 함수의 인수로 전달되었는데 함수의 종료 이후에도 호출되면 escape한다고한다. 패러미터 타입 이
전에 @escape를 붙여 탈출을 허용할 수 있다.

탈출 클로저에서 self를 capture하면 strong reference cycle이 생기기 쉽다. 따라서 self를 사용하고 싶다
면 self.x와 같이 사이클이 없다는 개발자의 의도를 명시적으로표시해야한다.

> However, an escaping closure can’t capture a mutable reference to self when self is an instance of
> a structure or an enumeration. Structures and enumerations don’t allow shared mutability, as
> discussed in Structures and Enumerations Are Value Types. The call to the
> someFunctionWithEscapingClosure function in the example above is an error because it’s inside a
> mutating method, so self is mutable. That violates the rule that escaping closures can’t capture a
> mutable reference to self for structures.
