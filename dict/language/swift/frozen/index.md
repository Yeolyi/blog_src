---
title: frozen
---

SwiftUI 문서를 보면 아래와 같이 @frozen이 많이 보인다. 이게 뭘까?

```swift
@frozen struct VStack<Content> where Content : View
```

[The Swift Programming Language](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html)

> Apply this attribute to a structure or enumeration declaration to restrict the kinds of changes you can make to the type. This attribute is allowed only when compiling in library evolution mode. Future versions of the library can’t change the declaration by adding, removing, or reordering an enumeration’s cases or a structure’s stored instance properties. 

하지만 대부분 열거형과 관련되어 쓰이는 것 같다. 

```swift
@frozen enum Optional<Wrapped>
```

- A frozen enum may not gain new cases in the future. (e.g. optionals)
- A nonfrozen enumeration is a special kind of enumeration that may gain new enumeration cases in the future — even after you compile and ship an app.

[참고](https://useyourloaf.com/blog/swift-5-frozen-enums/)

아무래도 버전이 올라가며 코드에 변경이 생길 가능성이 많은데 모든 exhaustive해야하는 switch문이 제일 타격?인가보다. 그래서 nonfrozen인 enum의 경우 exhaustive하더라도 미래에 추가적인 값이 생길 수 있으니 주의하라고 하는 용도인듯. 

그냥 default를 써버리면 조용히 처리해서 enum에 새로운 케이스가 생겼는지 알 수 없음!

구조체에는 어떻게 적용되는지 아직 모르겠지만 비슷한 원리일듯. 