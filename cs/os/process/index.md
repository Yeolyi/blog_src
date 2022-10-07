---
title: 프로세스
---

## 프로세스의 개념

위키피디아에 찾아보았다.

> In computing, a process is the **instance** of a computer program that is being executed by one or many threads. It contains the program code and its activity. Depending on the operating system (OS), a process may be made up of multiple threads of execution that execute instructions concurrently.

인스턴스는 여기서 뭐지?

> In a computer system, any time a new context is created based on some model, it is said that the model has been instantiated. In practice, this instance usually has a data structure in common with other instances, but the values stored in the instances are separate. Changing the values in one instance will then not interfere with the values of some other instance. A compute instance can be software or hardware which can run code, for example a CPU, GPU or a virtual machine.

실행중인 프로그램(Program in execution)을 프로세스라고 한다. 운영체제에서 작업의단위이다. 프로세스는그 일을 하기 위해 특정 자원(CPU time, 메모리, 파일, I/O 디바이스)들을 필요로 한다.

하드 디스크에서 메모리로 로드돼서 CPU가 fetch해서 실행할 수 있는 상태의 프로그램을 프로세스라고 한다 .

프로세스의 메모리 레이아웃은 다음과 같은 섹션들로 나뉜다.

- Text section: 실행 가능한 코드
- Data section: 전역 변수. uninitialized data와 initialized data가 분리되어있다.
- Heap section: 런타임에 동적으로 할당된 메모리
- Stack section: 함수 호출시의 임시 저장 공간. 함수 매개변수, 리턴 주소, 지역 변수 등.

![](life_cycle.png)

프로세스는 실행되는 과정에서 다섯가지의 state들을 가진다.

- New: 프로세스 생성됨
- Running: 명령어가 실행 중
- Waiting: 특정 이벤트(I/O completion, reception of a signal)를 기다림
- Ready: 프로세서에 맡겨지기를 기다림. Waiting에서 시그널 왔다고 바로 CPU 점유할수 있는게 아님.
- Terminated: 실행이 끝남

**PCB(Process Control Block)**이라는 구조체를 만들어서 프로세스를 관리. 프로세스에게 필요한 모든 정보들이 여기 담기고 handling된다. 프로그램 카운터와 레지스터를문맥, context라고 한다.

- Process state
- Program counter
- CPU registers
- CPU-scheduling information
- Memory-management information
- Accounting informaiton
- I/O status information

여기서 우리가 살펴본 프로세스는 single thread를 실행한다. 한 번에 한 작업밖에 못하니 multiprocessing(운영체제의 핵심 기능)을 위해서는 여러 쓰레드가 필요하다.

따라서 lightweight process인 thread를 활용해 한 프로세스에서 여러개의 쓰레드를가지게 하고 한번에 여러 작업을 수행할 수 있도록 함. 이게 유리해서 대부분 multithreading 위주 병렬 처리, concurrency를 함.

## 프로세스 스케줄링

Multiprogramming의 목적은 항상 어떤 프로세스가 실행되고 있는 것. 아무튼 CPU 사용량을 늘리기 위해. 동시에 여러 프로세스를 실행시키는 것이라고 필기했었는데 이건좀애매한듯??

At the same time, simultaneously, concurrently 등등 같은 말들이 있지만 parallel 한 것과는 의미가 다름.

Time sharing의 목적은 CPU를 프로세스간 빠르게 전환하여 각 프로그램들이 동시에 작동하는 것처럼 보이게하고 사용자가 여러 프로그램과 상호작용할 수 있게 하는 것. 이를 위해서는 CPU 스케줄링이 필요.

**Scheduling Queue**. 프로세스가 시스템에 들어오면 ready queue에 추가되어 CPU core에서 실행되기를 기다린다. I/o관련된건 io 디바이스에 있는 ready queue에 가 있을 수도 있음. 특정 이벤트를 기다리는 것은 wait queue로 간다. 실제 구현은 PCB의연결 리스트.

Queueing Diagram은 프로세스 스케줄링의 일반적인 표현이다.

![](queueing_diagram.png)

**Context Switch**. 문맥이란 프로세스가 사용되고 있는 상태를 말하며 PCB에 저장되어있음. Interrupt가일어나면 현재 프로세스의 문맥을 저장하고 나중에 resume될 떄다시 불러온다. Context switch란 CPU 코어를 다른 프로세스에게 넘겨주고 문맥 저장과 복원을 하는 일련의 과정.

## Operations on Process

운영체제는 프로세스 생성과 종료를 위한 mechanism을 제공해야 한다.

![](linux_process.png)

프로세스는 새로운 프로세스를 만들 수 있으며 이때 부모 프로세스와 자식 프로세스로나뉜다. 리눅스에서는 fork()라는 시스템 콜을 사용하며 리눅스 시스템 프로세스의 트리를 보면 첫번째 프로세스는 init으로 불리며 pid값은 1이다.

두가지 실행 방법

- Concurrent하게 동시에 실행
- 부모가 자식의 종료까지 대기.

두가지 주소 공간 처리? 방법

- 자식이 부모 프로세스를 복제(혹은 pc만 바꿔서 할당 없이?)
- 자식에게 별도의 프로그램이 로드

마지막 문이 종료되면 프로세스도 종료. 혹은 exit() 시스템 콜. OS가 프로세스에 할당된 자원(할당된 메모리, 열린 파일들, I/O 버퍼)들을 돌려받음.

[좀비 프로세스와 고아 프로세스](https://dongwooklee96.github.io/post/2021/04/03/좀비-프로세스와-고아-프로세스/)

Zombie: 이미 종료되었지만 부모가 wait()을 호출하지 않음. Orphan: wait 없이 부모가 종료됨. daemon, background 프로세스를 만들 때 활용.

## 프로세스의 생성

UNIX계열에서는 fork()로 새로운 프로세스를 만든다. 자식 프로세스는 부모 프로세스주소 공간의 복사를 가지게 된다. 두 프로세스 모두 fork() 이후의 명령어들을 실행하지만 자식 프로세스는 fork()의 반환값이 0 이며 부모 프로세스는 자식 프로세스의 0이아닌 pid값을 반환받는다.

fork 이후에 부모는 계속 실행되거나 wait 콜로 자식이 끝나기를 기다릴 수 있다.

wait 없이 실행했을 때 항상 parent가 먼저 실행될 보장은 없다. 동시에 실행되는 환경이 많은 문제를 일으키기 때문에 동기화를 잘 해줘야한다. 앞으로 배울 대부분의 문제가 여기서 발생한다.

> The wait system-call puts the process to sleep and waits for a child-process to end. It then fills in the argument with the exit code of the child-process (if the argument is not NULL).

!@fork_basic.c@!

!@fork_count.c@!

!@execlp_example.c@!

## 프로세스간 통신(IPC)

프로세스는 다른 프로세스간 데이터 공유 여부에 따라 independent/cooperating으로나뉨.

Cooperating하는 프로세스들은 **Inter-Process Communication** 매커니즘을 필요로한다. 이를 통해 데이터를 교환(send data, receive data)한다.

![](communication_model.png)

**IPC의 두 주요 모델**

- Shared memory
- Message passing: 운영체제에게 맡김. message queue가 있음.

## Producer-Consumer Problem

> In computing, the producer–consumer problem (also known as the bounded-buffer problem) is a classic example of a multi-process synchronization problem, the first version of which was proposed by Edsger W. Dijkstra in 1965 in his unpublished manuscript, in which the buffer was unbounded, and subsequently published with a bounded buffer in 1972.

협동하는 프로세스들의 개념을 설명할 수 있다. 생산자는 정보를 생산하고 소비자는생산된 정보를 소비.

## Shared-memory

버퍼를 사용해 producer가 채우고 consumer가 가져간다. Bounded buffer를 shared memory로 만들면 된다. 각 프로세스의 영역에 접근하는건 보안상 안되고, 별개의 공유메모리 영역을 운영 체제가 할당해줘야한다. 하지만 알아서 잘 공유하는게 어렵다. 공유 메모리에 접근하고 조작하는 코드를 어플리케이션 프로그래머가알아서 짜야한다.

## Message-passing

shared memory의 관리를 os가 알아서 한다. send(message)와 receive(message) operation이 있다.

(Prosumer간의 통신. 수백명이 동시에 한다면 message passing은 힘들고 shared memory가 사용됨.)

**Communication Links**. P와 Q가 통신한다면 둘 사이의 링크가 있어야 한다. 아래의다양한 방식으로 구현될 수 있다.

- Direct / Indirect
- synchronous / asynchronous
- automatinc / explicit

**Direct**. 각 프로세스가 커뮤니케이션 상대를 알고 있다. send(P, messeage), receive(Q, message)와 같이 상대의 이름을 명시해야한다. 연결는 자동으로 생성되며정확히 두 프로세스만 연결한다. 각 프로세스 사이에는 단 하나의 연결만 존재한다.

**Indirect**. 메시지가 mailbox, **port**로 보내지고 그곳에서 받아온다. 포트는 객체로 볼 수 있으며 프로세스에 의해 메시지가 배치되고 꺼내어질 수 있다. A가 메일박스라고 하면 send(A, message), receive(A, message)로 사용되어진다. 특정 대상이 있는 것이 아니라 메일함에 놓을 뿐. 두 멤버가 메일박스를 공유해야 연결이 성립하며메시지를 주고받을 수 있다. 두 개 이상의 프로세스간 연결이 성립될 수 있다. 각 프로세스 간 각각 하나의 메일박스와 대응되는 서로 다른 연결이 존재할 수 있다. OS는메일박스의 생성, 송수신 , 삭제의 기능을 제공한다.

실제 구현에서는 **blocking**(sync), **non-blocking**(async)로도 나뉨. Blocking send에서는 메시지가잘수신될까지 sender가 block된다. 1기가짜리 버퍼에 4기가 영화를 보낸다고 하면 4기가 다 보내는 동안 sender는 다른 일을 못함. Blocking receive도 마찬가지로 메시지가 available할 때까지 아무것도 하지 않는다.

## IPC 시스템의 예시

- Shared Memory: POSIX Shared Memory. 여기서 POSIX란 Portable Operating System Interface (for UNIX).
- Message Passing: Pipes. One of the earlist IPC mechanisms on UNIX systems.

## POSIX Shared Memory

memory-mapped file로 버퍼를 잡는다. 여기서 버퍼란,

> In computer science, a data buffer (or just buffer) is a region of a physical memory storage used to temporarily store data while it is being moved from one place to another.

공유 메모리 영역을 파일과 연관짓는다고 한다. [메모리 매핑 참고](https://hololo-kumo.tistory.com/m/96)

!@shared_memory_producer.c@!

!@shared_memory_consumer.c@!

## Pipe

초기 유닉스에서 사용된 첫번째 IPC 매커니즘. 두 프로세스간 통신을 위한 전선의 역할을 한다. 공유메모리에서늬 shm read write close 과정이 부담스러워 사용.

**파이프 구현의 네가지 핵심**

- Unidirectional or Bidirectional
- 양방향 통신이라면, half-duplex or full-duplex
- 통신하는 프로세스 사이 부모-자식과 같은 관계가 있어야하는가
- 네트워크를 지나 통신할 수 있는가(파이프 안쓰고 따로 소켓이라고 함)

unidirection 한 것 두개를 만들면 양쪽 다 통신 가능하다. (그래서 굳이 bi로 안하고 uni로 한다는 뜻인가 ??)

파이프는 구현의 편의상 부모자식관계를 가진다. **Ordinary pipe**는 파이프를 생성한 프로세스 밖에서는접근할 수 없다. 일반적으로 부모 프로세스가 자식과 소통하기위해 파이프를 만든다. Producer가 파이프의 write end에 쓰고 consumer가 read end에서 읽는다. Unidirectional하다. **Named pipe**는 부모 자식 관계가 없어도 접근할수있다.

!@unix_pipe.c@!

## 소켓

**Sockets** are defined as endpoints for communication. **RPC** abstracts procedure calls between processes on networked systems.

요즘엔 다들 인터넷에 연결되어있다. 다른 컴퓨터와도 프로세스간 통신해야해 소켓 등장. 파이프 대신 아이피 주소와 포트로 서로를 특정!

하지만 서로 다른 시스템간 통신을 위해 엔디안, 크기 등등 다 지정해야돼서 **RPC**가 등장. Remote Procedure Calls. 네트워크 시스템간 프로세스간 프로시저 호출을 추상화함. 원격에 있는 함수를 호출.

자바가 소켓관련 쉬운 인터페이스 제공함.

- Socket class: TCP
- DatagramSocket class: UDP
- MulticastSocket class: multiple recipients

!@DateServer.java@!

!@DateClient.java@!

## RPC(Remote Procedure Call)

- one of the most common forms of remote service. IPC의 확장 개념.
- Procedure-call 매커니즘을 추상화하기 위해 디자인되어 네트워크 연결된 시스템간사용할 수 있음.
- 자바에서는 RMI
- 클라이언트가 호스트의 프로시저를 invoke함.
- stub을 클라이언트에게 제공해 서버에 뭐가 있는지 알아냄.
- 근데 얘네도 엔디언 등등 알아내야해서 객체직렬화를 통해 stub을 보냄. marshal.
- 서버의 stub은 이 메시지를 받아 마샬된 패러미터를 언팩하고 서버에서 procedure를수행함.
- IDL

얘는,,, 나중에 더 찾아봐야할듯.
