---
title: 쓰레드
---

지금까지는 single thread of control인 프로세스들을 살펴봤지만 multiple threads of control을 가질 수도 있다. Program Counter만 잘 바꾸면 같은 프로그램 내에서도 여러 context의 코드를 실행할 수 있다. 

## 쓰레드란?

A thread is a lightweight process(LWP). A basic unit of CPU utilization. 

**쓰레드의 구성요소**

- thread ID
- program counter
- register set
- stack

![](multithreaded.png)

## Multithreading의 장점

client-server 시스템을 예로 들자면, 줄을 세우는 기존 방법과 달리 client마다 쓰레드를 생성해 여러 request들을 함께 처리할 수 있다. 

**멀티쓰레드 프로그래밍의 장점** 

- Responsiveness: may allow continued execution
- Resource Sharing: threads share resources of process(code와 data 영역을 공유함)
- Economy: cheaper than process creation
- Scalability(확장성): process can take advantage of multiprocessor architectures

자바에서 쓰레드는 프로그램 실행의 기본적인 모델이다. 쓰레드 생성과 관리를 위한 많은 기능들이 있음. 

## 자바에서의 쓰레드 사용

자바에는 명시적인 쓰레드 생성을 위한 세가지 테크닉이 있다. 

**Inheritance from the Thread class**

- 다른 클래스 상속이 안되는 문제가 있어 다른 방법을 권유.
- Thread 클래스에서 derive된 클래스를 만들고 run 메소드를 오버라이드한다. 

!@MyThread1.java@!

!@MyThread1TestCode.java@!

**Implementing the Runnable interface**

- 제일 많이 쓴다. 
- Runnable 인터페이스를 충족시키는 새로운 클래스를 정의하고 마찬가지로 run 메소드를 오버라이드한다. 

!@MyThread2.java@!

!@MyThread2TestCode.java@!

**Using the Lambda expressing**(Java 1.8~)

- 새로운 클래스도 귀찮고, 람다 표현식으로 구현하자!

!@MyThread3TestCode.java@!

부모 쓰레드의 대기는 자바에서 wait가 아닌 join을 사용한다.

!@JoinExample.java@!

쓰레드의 종료는 interrupt를 사용한다.

!@InterruptExample.java@!

프로그램은 짤 줄은 몰라도 6, 7장 동기화 부분에서 자바로 설명하니까 코드는 얼추 알아두기~

## 멀티코어 시스템에서의 멀티쓰레딩

향상된 동시성을 위해 멀티쓰레딩으로 멀티코어를 더 효과적으로 사용할 수 있다. 싱글코어에서는 사이사이 interleaved되겠지만, 멀티코어에서는 몇몇 쓰레드들은 parallel하게 작동할 수 있다. 4개의 쓰레드로 구성된 어플리케이션을 생각해보면 싱글코어에서는 쓰레드가 시간에 따라 나뉘어 실행되겠지만 멀티코어에서는 parallel하게 실행될 수 있다. 

Interleave를 사전에 찾아봤는데 다음과 같다. 

> 인터리브: 기억 장치를 여러 부분으로 나누고, 그 동작 주기를 조금씩 늦추어서 등가적으로 고속화하는 일.

**멀티코어 시스템에서의 프로그래밍 관문들**

- Identifying tasks: 여러 문제로 나눌 수 있는 부분이 어디인가?
- Balance: 각 task가 같은 양의 일을 할 수 있도록 해야한다.
- Data splitting: 데이터 또한 각 코어에 나뉘어야한다. 
- Data dependency: ensure that the execution of tasks is synchronized to accommodate the data dependency.
- Testing and debugging: 단일 쓰레드보다 어렵다. 

병렬(parallelism)은 Data parallelism과 task parallelism으로 나뉜다. [출처](https://www.tutorialspoint.com/data-parallelism-vs-task-parallelism)

- Data Parallelism means concurrent execution of the same task on each multiple computing core.
- Task Parallelism means concurrent execution of the different task on multiple computing cores.

## 암달의 법칙

> 암달의 법칙(Amdahl's law)은 컴퓨터 시스템의 일부를 개선할 때 전체적으로 얼마만큼의 최대 성능 향상이 있는지 계산하는 데 사용된다.

문제는 풀 수 있는데 식으로 보면 헷갈린다 ^^,,, 지금 멀티코어 프로그래밍에 대해 살펴보고있으니 S를 시스템에서 serial하게 실행되야되는 부분의 비율, N을 코어의 개수라고 해보자. 

싱글코어에서의 실행 시간을 1이라고 하면 이중 S만큼은 serial하게 실행되어야하고 (1-S)만큼은 병렬적으로 실행할 수 있다. 따라서 (1-S)는 멀티코어시스템에서 (1-S)/N 으로 줄어들고 멀티코어에서의 전체 시간은 S + (1-S) / N이 된다. 여기서 다음 식이 도출된다.  

![](amdahl_wiki.png)

위키피디아 출처인데, 여기서는 변수들이 보다 일반적이다. 

![](amdahl.png)

병렬처리가 가능한 부분이 적을수록 성능 향상폭이 확연히 감소한다. 

## 멀티쓰레딩 모델

![](threads.jpeg)

**두 종류의 쓰레드**

User threads may be executed by kernel threads in various ways (one-to-one, many-to-one, many-to-many). 

[Why must user threads be mapped to a kernel thread](https://www.geeksforgeeks.org/why-must-user-threads-be-mapped-to-a-kernel-thread/)

[Difference between Kernel, Kernel-Thread and User-Thread](https://stackoverflow.com/questions/57160637/difference-between-kernel-kernel-thread-and-user-thread)

- user thread 
    - supported above the kernel, and are manaaged without kernel support. 
    - User threads are the threads created by the user with help from a user library and are visible just to the creating process and it’s run time environment (the kernel has no idea about the creation of these threads). User threads just stay in the address space of the creating process and are run and managed by the creating process without kernel intervention i.e., any problems with the execution of these threads are not kernel’s headache.
    - 커널이 서포트하는데 서포트 없이 관리된다고?? 뭔소린가 싶어서 찾아봤다. [참고](https://gamedevlog.tistory.com/76), [참고](https://stackoverflow.com/questions/14791278/threads-why-must-all-user-threads-be-mapped-to-a-kernel-thread)
    - 커널은 사용자 스레드의 존재를 인식하지 못한다. 
    - 사용자 스레드가 커널 스레드를 이용하려면 시스템 호출로 커널 기능을 이용해야 한다.
    - 사용자 영역에서 생성 및 관리되므로 속도가 빠르지만 커널이 스레드가 하나라고 인식하기 때문에 하나의 스레드가 중단되면 다른 모든 것들도 중단된다. 
- kernel thread  
    - Kernel threads on the other hand are created by the kernel and are visible to it. A user process with the help of a provided library asks kernel to create an executable thread for that process and the kernel in turn creates the thread on behalf of the process, and puts it onto it’s list of the available executable threads present. Here the creation, execution and management of the thread is taken care of by the kernel.
    - 커널이 직접 생성하고 관리하는 스레드

메모: IPC에서는 동기화 문제가 없나?

**유저 쓰레드와 커널 쓰레드의 관계**

Kernel thread is the entity that CPU scheduler considers for assignment hence user threads must be mapped to corresponding kernel threads (if you want CPU to execute them).

- Many-to-One Model(user-level threading). 왼쪽이 유저, 오른쪽이 커널. 가장 기본적. 유저 쓰레드가 많아지면 감당 못함. 
- One_to_One Model(kernel-level threading). Linux the GNU C Library implements this approach (via the NPTL or older LinuxThreads). This approach is also used by Solaris, NetBSD, FreeBSD, macOS, and iOS. 
- Many-to-Many Model

**쓰레드 라이브러리**는 쓰레드를 만들고 관리하는 API이다. POSIX Pthreads, Windows thread, Java thread(얘네는 운영체제꺼 끌어다? 씀)등등이 있다. 

[Is Pthread library actually a user thread solution?](https://stackoverflow.com/questions/8639150/is-pthread-library-actually-a-user-thread-solution)

!@pthread_example.c@!

!@thread_count.c@!

프로세스와 쓰레드 몇 개씩 생성될까~?

## 암묵적 쓰레딩

알아서 쓰레딩 해달라는 마인드. 어플리케이션 개발자에게 멀티코어 시스템에서의 멀티쓰레딩은 너무 어렵다. 그러니 컴파일러와 런타임 라이브러리에게 시키자. 

- **Thread Pools**: 쓰레드 유저가 안만들고 Thread Pool에서 잘 가져다 쓰게. getThread
- **Fork & Join**: 책 보기. 
- **OpenMP**: 컴파일러 지시문, API로 C/C++에서 제공.
- **Grand Central Dispatch(GCD)**: 애플에서 사용.

OpenMP: parallel region만 지정해주면 코드블럭을 알아서 parallel하게 실행해줌. 지금까지와는 달리 라이브러리가 아닌 컴파일러에게 지시. 

!@openmp_example.c@!

병렬이라서 여러번 실행됨!. omp_set_num_threads(4);, omp_get_thread_num? 도 사용할 수 있음. (time 써서 시간 측정해보면 병렬처리를 위한 대기 등때문에 user가 긺.)

!@fork_thread_test.c@!

이 코드 왜 안돼,,, [여기](https://blog.seulgi.kim/2016/03/fork-in-multithread.html) 내용과 관련된걸까,,,?

[What happens to other threads when one thread forks()?](https://stackoverflow.com/questions/10080811/what-happens-to-other-threads-when-one-thread-forks)

[Why does a program with fork() sometimes print its output multiple times?](https://unix.stackexchange.com/questions/447898/why-does-a-program-with-fork-sometimes-print-its-output-multiple-times)

![](problem.png)

A와 C의 순서 관계가 헷갈린다!

> 사실 start() 호출되었다고 바로 실행되는 구조가 아니다. 일단 먼저 '실행대기' 상태에 들어가게 되며 자신의 차례가 오면 실행되는 구조이다. 물론 실행대기 중인 쓰레드가 하나도 없다면 바로 실행 상태로 넘어간다. 참고: 쓰레드의 실행순서는 OS의 스케줄러가 작성한 스케줄에 의해 결정된다.

이거때문인가??

