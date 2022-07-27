---
title: 왜 xcode에서는 그룹을 쓸까?
---

SwiftUI 튜토리얼을 보는데, 다음과 같은 말이 있었다. 

> Add a new Swift file named DailyScrum to the Models group.

Xcode는 내부에서도 New Folder가 아닌 New Group이라고 하는데, 왜 하필 그룹일까 찾아보았다. 

[Difference between folder and group in Xcode?](https://stackoverflow.com/questions/34207664/difference-between-folder-and-group-in-xcode)

Xcode에는 group과 folder reference 두가지 타입의 폴더가 있다. 

group은 실제 파일 시스템에서의 구조를 건드리지 않고 프로젝트에서 파일들을 정돈하는데 사용된다. xcode가 가짜 폴더를 만드는 것이라고 볼 수 있다. 이는 코드에 유용하지만 리소스 파일에는 그렇지 않다. 

복잡한 프로젝트에서는 많은 수의 에셋 파일을 다루게 되는데 이들은 우리 개발자가 아닌 디자이너들에 의해서 자주 수정되게 된다. 따라서 이 모든 리소스 파일들을 하나의 플랫한 폴더에 넣는 것은 재앙일 것이다. 이럴 때 folder reference가 사용된다. 파일 시스템의 폴더와 같은 구조를 xcode에서 보게된다. 

So you should use folder references only, if some kind of assets should be **dynamically** inserted into the project. For normal project files like classes it is good practice to use groups.

--

Xcode 9 이후로는 기본 설정이 달라진 것 같다. 

> However, since Xcode 9 it seems like, Apple enforces filesystem project structure to correspond to Xcode project structure. It means, that you explicitly has to choose "New Group without Folder"

[참고](https://thomashanning.com/xcode-groups-folder-references/)

위 링크 답변은 Xcode12 기준. 

Create group이면 나중에 finder로 파일을 추가해도 보이지 않고, Create folder reference면 보인다. Reference면 파란색 폴더 아이콘으로 표시된다. Create group으로 무언가를 추가할 때는 프로젝트 경로에 추가한 것과 같은 구조의 파일들이 생성된다. 