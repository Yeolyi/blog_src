---
title: 프로세스 동기화
---

## 배경

협력하는 프로세스는 서로에게 영향을 주고 받는다. 논리적인 주소 공간(왜 물리적이
아닌지는 뒷 부분 공부하고 다시 와서 생각하면 좋을 듯)나 데이터를 공유할 수 있다.

하지만 공유 데이터에 대한 병행적인 접근은 데이터 불일치를 발생시킬 수 있다. 따라
서 실행 순서대로 실행되게 보장해야 data consistency를 유지할 수 있다.

동시적인 실행에서는 프로세스가 instruction stream 중간 아무곳에서나 interrupt될
수 있고, 병렬적인 실행세너는 두 개 이상의 instruction streeam이 서로 다른 코어에
서 동시에 실행될 수 있다.

## 생산자-소비자 문제 예시

생산자-소비자 문제에서 각각은 비동기적으로 실행되며 버퍼를 사용한다. 이때 버퍼에
있는 원소의 개수를 세기 위해 count 변수를 사용한다.

하지만 동시적으로 실행되면 제대로 작동하지 않음. (병렬적으로 실행되는거면 문제없
는건가?? 추가로, 병렬적으로 실행될 때 즉 멀티코어 시스템에서는 메모리 접근을어떻
게할까?)

!@thread_count_problem.c@!

c언어로 보면 ++와 -- 하나의 연산자로 이루어져있지만 실제로는 레지스터에 count값
옮기고 계산하고 다시 저장하는 과정이 숨어있음. 이 사이에서 context switching이일
어날 수 있다. 두 쓰레드가 같은 레지스터를 사용한다쳐도 interrupt handler에 의해
레지스터의 내용이 저장되고 복원됨. 따라서 ++와 --의 동시적인 실행은 저수준 구문
의 무작위 배열을 만들 수 있다.

## Race Condition

경쟁 상태. 여러 개의 프로세스(쓰레드)가 공유하는 데이터를 concurrent하게 접근/수
정하면 결과가 접근 순서에 따라 달라질 수 있다.

> A race condition or race hazard is the condition of an electronics, software,
> or other system where the system's substantive behavior is dependent on the
> sequence or timing of other uncontrollable events.

이를 방지하려면 특정 시간에 하나의 프로세스만 공유 데이터를 다룰 수 있도록 해야
한다. 즉, 각 프로세스(쓰레드) 동기화가 이루어져야한다.

!@RunnableOne.java@!

!@RaceCondition.java@!

## Critical Section

각 프로세스에는 Critical section(임계 영역)이라 불리는, 적어도 다른 하나의 프로
세스와 공유되는 데이터를 접근하거나 수정하는 코드 영역이 있다.

한 코드가 임계 영역을 실행할 때 다른 애들이 스스로의 임계 영역을 실행하지 못하도
록 하자! 프로세스들이 각자의 활동을 동기화시켜 데이터를 잘 공유할 수 있는 프로토
콜을 만들자.

**코드 영역의 구분**

- Entry section: 임계 영역에 진입하는 코드. 허가를 요청하는 부분.
- Critical section
- Exit section: 허가를 반납하는 부분.
- Remainder section: 나머지 부분.

**해결책의 세가지 필요 조건**

- **Mutual Exclusion**: 상호배제. 한 프로세스가 임계 영역에 있으면 다른 프로세스
  는 들어오지 못함. 얘가 제일 기본적인 조건.
- Progress: 데드락 피하기.
- Bounded Waiting: 기아 피하기.

현실적으로 세가지 조건을 모두 만족시키기는 어렵다. Progress와 Bounded Waiting은
일단 발생하면 해결하자는 마인드.

사실 싱글 코어 환경에서 가장 간단한 해결책은 shared variable에 접근 중일때는 인
터럽트가 발생하지 않도록(비선점) 하는 것. 하지만 멀티프로세서 환경에서는 쓸 수없
는 방법이다.

**멀티프로세서 환경에서의 두가지 접근법**

- 비선점형 커널에서는 일단 진입을 하면 자발적 반환 전까지 CPU에서 나오지 않으니
  문제가 발생하지 않는다. 근데 비선점형 커널은 잘 사용하지 않는다.
- 선점형 커널은 다루기 어렵지만 훨씬 responsive하기 때문에 사용한다.

## 동기화 문제의 소프트웨어적 해결책

- **Dekker's Algorithm**. 두 개의 프로세스로 해결
- **Eisenberg and McGuire's Alrogithm**. n개의 프로세스, n-1 turns의 대기 하한선
  을 가짐.
- **Bakery Algorithm**. Ramport. 책에서는 안다룸.

우리가 본격적으로 다룰 것은 **Peterson's Algorithm**. 임계 영역 문제에 대한 고전
적인 소프트웨어 해결책이다. 원본은 프로세스 두 개만 가능한데 N개로 확장할 수 있
다는 듯.

!@peterson.c@!

Peterson의 솔루션은 최신 컴퓨터 아키텍처에서 작동한다고 보장되지 않는데, 시스템
성능을 향상하기 위해 프로세서 또는 컴파일러가 종속성이 없는 읽기 및 쓰기 작업을
재정렬 할 수 있기 때문이다.

그래도 algorithmic desciprtion으로 살펴보기에는 좋다. 개념적으로 완벽하며 위에세
가지 조건을 다 만족시킨다.
[Unable to understand correctness of Peterson Algorithm](https://stackoverflow.com/questions/4849077/unable-to-understand-correctness-of-peterson-algorithm)

1. Mutual exclusion - flag[0] and flag[1] can both be true, but turn can only be
   0 or 1. Therefore only one of the two critical sections can be executed. The
   other will spin wait.

2. Progress - If process 0 is in the critical section, then turn = 0 and flag[0]
   is true. Once it has completed it's critical section (even if something
   catastrophic happens), it must set flag[0] to false. If process 1 was spin
   waiting, it will now free as flag[0] != true.

3. Bound-waiting - If Process 1 is waiting, Process 0 can only enter it's
   critical section once, before process 1 is given the green light, as
   explained in #2.

[Why does a simplification of Peterson's Algorithm using a single 'turn' variable not provide process synchronization?](https://stackoverflow.com/questions/48385998/why-does-a-simplification-of-petersons-algorithm-using-a-single-turn-variable).
flag가 없다면 상대 프로세스가 임계 영역에 들어갈 의사가 없음에도 불구하고 계속기
다려야하는 기아의 위험이 있음.

## Hardware-based Solution.

- memory barriers or fences
- hardware instructions
- atomic variables

**Atomicity**.

- Atomic operation이란 인터럽트 할 수 없는 operation.
- test_and_set()
- compare_and_swap()

얘네를 쓴 구현은 최소한 상호 배제는 해결된다.

**test_and_set()으로 구현한 상호 배제**. 물론 이렇게만 하면 bounded waiting은 해
결 못함!

```c
boolean test_and_set(boolean *target) {
    booleadn rv = *target;
    *target = true;
    return rv;
}

// 전역 변수 lock은 false로 초기화되어있음

do {
    while (test_and_set(&lock))
    ; // do nothing

    // critical section

    lock = false;

    // remainder section
} while (true);
```

**compare_and_swap()으로 구현한 상호 배제**. 마찬가지로 bounded waiting은 해결못
함.

```c
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}

while (true) {
    while (compare_and_swap(&lock, 0, 1) != 0)
    ; // do nothing

    //critical section

    lock = 0;

    // remainder section
}
```

**Atomic variable**. 사실 위의 Compare_and_swap 명령어등은 atomic variable을 만
들기 위한 도구로 사용됨. 특정 변수에 대한 race condition이 가능할 때 상호 배제를
보장하기 위해 사용된다.

아래는 atomic 변수 없이 구현한 Peterson's solution의 자바 버전

!@Peterson1.java@!

Atomic 사용 버전. 위에서 for문 100000번 할 때 안되던게 여기서는 되는데 왜 전에는
안됐을까??

!@Peterson2.java@!

**CSP를 풀기 위한 고수준 소프트웨어 도구**

- Mutex Locks: 동기화를 위한 가장 간단한 도구. 열쇠로 쓰고 열쇠를 반납해라.
- 세마포어: 더 확실하고, 편리하고, 효과적인 도구. 가장 보편적이며 뮤텍스와 달리
  n개도 가능하다.
- 모니터: 뮤텍스와 세마포어의 단점을 극복. Java에서의 notify.
- Liveness: ensures for processes to make progress. 데드락도 해결함.

## 뮤텍스

Mutual Exclusion. 프로세스는 lock을 얻어 임계 영역에 들어가고 나올때는 lock을
release해야한다.

![](acquire_release.png)

함수 acquire()와 release(). available: 열쇠가 있는지 나타내는 불리언 변수. 두 함
수 모두 atomically 작동되어야한다. compare_and_swap 사용해서 구현 가능.

**Busy waiting** 문제가 발생한다. 임계 영역에 들어가려면 키를 기다려야하는데 이
과정에서 루프를 계속 돌며 다른 프로세스가 잘 쓸 수 있었던 CPU 사이클을 낭비하게
된다. Busy waiting을 하는 Mutex lock을 **spinlock**이라고 한다. 위의 단점에도 불
구하고 장점이 있는데, lock을 기다리는 과정에서 context switching이 없어
switching 시간을 아낄 수 있다. 멀티코어에서는 좋은 점도 있음. 한 쓰레드가 spin하
는 동안 다른 쓰레드는 임계영역에서 일할 수 있기 때문.

!@mutex_example.c@!

## 세마포어

뮤텍스와 달리 N개까지 확장이 가능하다. 세마포어는 신호기라는 뜻. 열쇠 꾸러미에서
열쇠를 가져가고 가져다놓는 것과 유사.

![](wait_signal.png)

세마포어 S란 두개의 표준 atomic operation인 wait()와 signal()으로만 접근 가능한
정수 변수를 말한다. 각각을 P()와 V()라고도 한다.

**Binary Semaphore**: mutex lock과 비슷. 0과 1에서 왔다갔다함.

**Counting Semaphore**: 가능한 리소스 수대로 세마포어를 초기화시킨다. 리소스를사
용할 때는 wait로 카운트 값을 감소시키고 release할때는 signal로 올린다. 카운트 0
이하면 남은 리소스가 없으니 0보다 커질 때까지 block되어 기다린다.

얘도 물론 busy waiting함. wait함수는 세마포어가 양수가 아닐때 busy waiting하지않
고 waiting queue에 가도록 하고, signal함수는 만약 세마포어 값이 0 이하면 기다리
는 애들이 있다는 뜻이니까 waiting queue에 있는 애들을 ready queue로 보내는 역할
을 시키면 됨. 아마 이것때문에 위에 사진에서 ==0이 아니라 <=0을 사용한 듯. 세마포
값이 음수일 때, 그 절댓값은 세마포를 대기하고 있는 프로세스들의 수임을 기억!

!@semaphore_example.c@!

맥에서는 리눅스랑 조금씩 달라 강의에 나온 코드를 위처럼 수정했다.
[참고](https://stackoverflow.com/questions/27736618/why-are-sem-init-sem-getvalue-sem-destroy-deprecated-on-mac-os-x-and-w),
[참고](https://medium.com/helderco/semaphores-in-mac-os-x-fd7a7418e13b)

이름 앞에 슬래시 안붙여서 고생했다,,,
[sem_overview(7) — Linux manual page](https://man7.org/linux/man-pages/man7/sem_overview.7.html)

원본 코드에서 sem_init의 두번째 인자는 프로세스를 어떻게 공유할 것인가를 의미한
다. 리눅스에서는 0밖에 못씀. 그 뒤에 1은 s=1.

## 모니터와 자바 동기화

세마포가 편하긴하지만 timing errors가 발생할 수 있으며 디버깅하기 매우 어렵다.
따라서 higher-level language construct인 모니터 타입을 사용할 수 있다.

A monitor type is

- an ADT that includes a set of programmer-defined operations
  - that are provided with mutual exclusion within the monitor.
- declares the variables
  - whose values define the state of an instance of that type.
  - along with the bodies of function that operate on those variables.

Conditional Variables이 동기화 매커니즘을 제공해줌. condition 타입에는 wait()와
signal()을 사용할 수 있다.

**자바**에서는 쓰레드 동기화를 위해 moniter-lock과 intrinsic-lock을 제공해준다.

- **synchronized keyword**: 임계영역에 해당하는 코드 블록을 선언할 떄 사용하는자
  바 키워드. 해당 코드 블록에는 모니터락을 획득해야 진입 가능. 모니터락을 가진객
  체 인스턴스를 지정할 수 있음. 메소드에 선언하면 메소드 코드 블록 전체가 임계영
  역으로 지정되며 모니터 락을 가진 객체 인스턴스는 this 객체 인스턴스임.
- **wait() / notify()**: 각각 wait와 signal. 쓰레드가 어떤 객체의 wait 메소드를
  호출하면 해당 객체의 모니터락을 획득하기 위해 대기 상태로 진입함. notify를 호
  출하면 해당 객체 모니터에 대기중인 쓰레드 하나를 깨움. notifyAll()은 대기중인
  쓰레드 전부를 깨움.

!@SyncExample1.java@!

!@SyncExample2.java@!

모니터에 선언된 모든 메소드들은 모니터 안에 있는 변수의 동기화를 의미한다. 객체
가 달라지면 모니터가 따로 있는거라서 지들끼리만 동기화됨.

## Liveness

> In concurrent computing, liveness refers to a set of properties of concurrent
> systems, that require a system to make progress despite the fact that its
> concurrently executing components ("processes") may have to "take turns" in
> critical sections, parts of the program that cannot be simultaneously run by
> multiple processes.

지금까지 본 애들은 progress과 bounded-waiting를 충족시키지 못함. 그것도 해결하려
고 생긴 개념이 Liveness.

Liveness란 프로세서들이 실행중에 progress를 만족시키지 위해 시스템이 만족시켜야
하는 성질의 집합. Liveness 실패에는 두가지 상황이 있다.

![](deadlock.png)

**Deadlock**. 두개 이상의 프로세스가 영원히 기다리는 것. Waiting queue에 있는 프
로세스가 일으킬 수 있는 이벤트를 기다려야되는 상황. P0은 wait(S), wait(Q) P1은
wait(Q), wait(S)일 떄.

**Priority Inversion**. 높은 우선순위가 낮은 것에게 밀리는 것. 낮은 우선순위 프
로세스가 높은 것에게 필요한 자원을 쓰고있으면(커널 데이터 rw) 기다릴 수밖에 없음
.

Priority inheritance protocol로 회피. H가 소유하고자하는 R1을 L가 가지고 있으면
H의 우선순위를 상속함.
