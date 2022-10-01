---
title: 가상 메모리
---

## 가상 메모리

프로그램 전체가 메모리에 있지 않아도 실행할 수 있게 해주는 기술. 프로그램의 크기
가 물리 메모리의 크기보다 커질 수 있다. 메인 메모리는 거대한 크기의 연속적인 배
열로 추상화되어 논리 메모리와 물리 메모리가 분리된다. 파일 및 라이브러리의 공유
와 프로세스의 생성에 대한 효과적인 매커니즘을 제공한다.

**가상 메모리 공간** 프로세스가 메모리에 어떻게 저장되는지에 대한 논리적, 혹은가
상적 관점. 일반적으로 0과 같은 특정 논리적 주소에서 시작되어 연속적인 메모리에존
재한다.

페이지의 공유를 통해 파일과 메모리를 여러 프로세스간 공유할 수 있다.

## 디맨드 페이징

프로그램이 어떻게 실행되는지를 생각해보자. 우선 이차 저장매체에서 메모리로 로딩
한다. 하드디스크에 있을 땐 프로그램이고 메모리로 로딩되면 프로세스이다. 여기서
demang paging이란 필요할 때(demand)가 오면 로딩하는 것이며 가상 메모리 시스템에
서 보통 사용한다.

## Page Fault의 처리

프로세스가 실행중이면 어떤건 메모리에, 어떤건 이차 저장매체에 있다. 이 두가지 상
황을 valid-invalid bit로 구분해야함.

![](handling_page_fault.png)

1. Internal table을 참고해 valid한지 체크
1. valid하면 평화롭게 읽으면 되니 프로세스 종료, valid인데 page fault이면 Page
   in 진행.
1. 읽어온 것 집어넣을 Free frame 탐색.
1. 이차 저장매체에서 필요한 페이지를 읽어오게 이차 저장매체 스케줄링?을 하고 읽
   어옴.
1. Internal table과 page table을 수정해 이제 메모리에 페이지가 있음을 표시.
1. Trap에 의해 인터럽트된 부분부터 명령어를 재실행.

## Pure Demand Paging

요청하지 않으면 절대로 페이지를 가져오지 않는다. 메모리에 페이지가 없는 상태로프
로세스 실행을 시작할 수 있다. Intruction pointer가 가르키는 첫번째 명령어가 page
fault를 일으키면, 그때부터 하나씩 page in해온다.

## Locality of Reference

참조의 지역성. 데이터가 여러 페이지에 나뉘어 분포해있으면 명령어 하나에 여러
page fault가 발생할 수 있지만, 보통은 참조의 지역성(국부성)이 있다. 덕분에 디맨
드 페이징은 쓸만한 성능을 보여준다.

지역성이 있는 코드 ./good.out 0.19s user 0.11s system 60% cpu 0.503 total

!@with_locality.c@!

지역성이 없는 코드 ./bad.out 0.67s user 0.13s system 87% cpu 0.910 total

!@ignore_locality.c@!

예시 해봤는데, 최적화 옵션 끄고 해야되는 듯. 숫자 커지면 최적화 옵션 상관 없는지
도? 그리고 할 때마다 속도가 빨라지는건 기분탓인가? main함수 내부에 선언하면 스택
터져서 segmentation fault나는것도 신기.

[링크](https://stackoverflow.com/questions/7902228/segmentation-fault-large-arrays)
[What can cause a program to run much faster the second time?](https://stackoverflow.com/questions/7561362/what-can-cause-a-program-to-run-much-faster-the-second-time)

아무튼 지역성을 잘 지키는 자료구조와 프로그래밍 구조를 잘 선택하자~~

## 디맨드 페이징을 위한 하드웨어 지원.

- **page table**: valid와 invalid를 구분할 수 있는 기능이 있어야 한다.
- **Secondary memory**(swap space): 운영체제가 swap space를 할당할 때 이차 저장
  매체를 쓸 수 있게. SSD를 쓰면 swap 속도가 빠르다.

## Instruction Restart

디맨드 페이징의 주요 조건. 어떤 명령어든지 page fault후에 재시작할 수 있는 기능.
Fault가 발생하면 인터럽트될 당시의 state(page table 포함!)를 저장하고 이후 정확
히 같은 위치에서 같은 상태로 명령어를 재시작해야한다.

최악의 경우 앞에 것들도 다시 해야된다. 예를 들어 ADD A, B, C에서 A와 B를 가져오
는 과정에서 fault가 발생하면 명령어를 fetch하는 부분부터 다시 해야한다.

## Free Frame List

Page fault가 발생했을 때 이차 저장매체에서 가져온 것들을 보관할 비어있는 프레임
들을 알아내기 위해 OS는 free frame list를 사용한다. 프로세스의 스택이나 힙 세그
먼트가 확장될 때도 사용한다.

## Copy-on-Write

공유 페이지의 복사를 프로세스가 공유 프로세스에 쓰기 작업을 할 때만 한다. 이전에
배운 fork()를 통한 프로세스 생성을 생각해보자.

## 페이지 교체 알고리즘

**Page Replacement**: 남은 프레임이 없을 때 하나를 비워 그곳에 넣는 것. 프레임의
내용물을 swap space에 써서 프레임을 비운다.

1. 이차 저장매체에서 필요한 페이지의 위치를 찾아낸다.
1. 비어있는 프레임을 찾는다. 있으면 그 공간을 사용하고 없으면 page-replacement
   algorithm을 사용해 victim frame을 찾아낸다. Victim frame을 이차 저장공간에 쓰
   고 페이지/프레임 테이블을 이에 맞게 바꾼다.

## 디맨드 페이징 구현의 두 가지 문제점

이차 저장매체에 대한 접근이 매우매우 비싸기 때문에 디맨드 페이징 방법의 작은 개
선도 시스템 성능을 크게 향상시킬 수 있다.

**Frame-allocation algorithm**: 각 프로세스에 몇 개의 프레임을 할당할까?
**Page-replacement algorithm**: 어떤 프레임을 없앨까?

## Page Replacement Algorithm

페이지 교체 알고리즘의 성능은 메모리 참조의 순서를 나타내는 **reference
string**을 적용하여 page fault의 개수를 세서 측정할 수 있다. 보통 프레임 수가 많
을수록 page fault가 적게 일어난다.

**FIFO Page Replacement**. 가장 심플하지만 **Belady's Anomaly**를 겪는다. 프레임
을 많이 줬는데 오히려 page fault가 더 많이 일어나는 현상.

**Optimal page replacement**. 절대 Belady's anomaly를 경험하지 않는다. 가장 오랫
동안 쓸 일이 없을 것 같은걸 버려야 한다. 하지만 미래에 대한 정보를 알아야해서 실
제로 구현하기는 어렵고 다른 알고리즘들과 비교하는 용도로 쓴다.

**LRU**. 최근의 사용을 통해 가까운 미래를 예측. 가장 오랫동안 사용되지 않은 프레
임이 앞으로도 사용되지 않을 것이다! 하드웨어 지원이 필요하다는 단점이 있지만
Belady's anomaly를 겪지 않는다.

- Counter implementation: 페이지가 참조될 때마다 카운터/시간 값을 기억해놓는다.
  나중에 가장 작은 값인 것을 없앤다.
- Stack implementation: 페이지 번호의 스택을 사용한다. 스택 중간에서 꺼내와야됨.

![](second_chance.png)

대부분의 시스템은 reference bit 정도의 지원만 해준다. **Second-Chance
Algorithm**은 FIFO + reference bit. 기본적으로 FIFO지만 reference bit가 1이면 0
으로 clear하고 두번째 기회를 준다.

피피티 설명이 빈약한데,
[Second Chance (or Clock) Page Replacement Policy](https://www.geeksforgeeks.org/second-chance-or-clock-page-replacement-policy/)
나중에 읽어보기.

## Frame Allocation

프로세스별로 프레임을 몇 개 배정할까?

- equal allocation: 같은 수만큼 배정.
- proportional allocation: 프로세스의 크기에 비례하게 배정.

- local replacement: 스스로의 프레임 내에서만 replace.
- global replacement: 시스템에 존재하는 모든 프레임들 중에서 선택.

개념만 알자~ 자세한건 책에.

## Thrashing

프로세스가 page in/out하느라 바빠지고 swapping 때문에 오히려 속도가 느려지는 현
상. 프로세스에게 충분한 페이지가 없다면 page-fault 비중이 매우 높아진다. 멀티프
로그래밍을 너무 심하게 하면 쓰레씽으로 CPU 활용도가 오히려 낮아진다.

## Working-Set Model

![](working_set.png)

Working-set이란 최근에 페이지 참조가 일어난 페이지들의 집합. 이들에게 지역성이있
다고 가정하고 델타 시간 크기의 working set window를 지정할 수 있다. 그러면 활발
하게 참조된 페이지는 working set에 있고, 더이상 사용되지 않으면 working set에없
을 것이다.
