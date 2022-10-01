---
title: CPU 스케쥴링
---

## CPU 스케쥴링

멀티 프로그래밍 운영체제에의 토대. 멀티 프로그래밍의 목적은 어떤 시간이든 프로세
스가 돌아가게 하여 CPU 활용도를 높이는 것.

CPU burst: the amount of time the process uses the processor before it is no
longer ready. CPU burst와 I/O burst 사이에서 프로세스가 왔다갔다함. 근데 CPU만열
심히 쓰는 CPU-bound인 프로그램들이 적고 오히려 I/O bound가 많음. 기다리다가 시간
다 날리니 time-scheduling을 하자.

A computer is **CPU-bound** (or compute-bound) when the time for it to complete
a task is determined principally by the speed of the central processor.

CPU 스케쥴러는 메모리에 존재하는 ready 상태에 있는 프로세스 중 어떤 것에 CPU를할
당할까 결정하는 것. 다음 프로세스는 연결리스트/이진 트리/FIFO 큐/우선순위 큐등다
양한 방법으로 선택할 수 있다. 다만 우선순위 큐는 우선순위를 어떻게 정할지가또문
제.

## 선점형 / 비선점형

**Preemptive**(선점형)

- 프로세스가 스케줄러에 의해 선점당할 수 있다. 즉, CPU에서 쫓겨날 수 있다.

**Non-Preemptive**(비선점형)

- CPU를 프로세스가 선점하면 종료되거나 waiting 상태로 전환되는 등 프로세스가 자
  발적으로 나오기 전까지 놔둔다.

여기서 여러 선택 사항들이 나온다. 1번과 4번은 무조건 비선점형. 2번과 3번은 둘 다
가능.

1. running -> waiting
2. running -> ready
3. waiting -> ready
4. terminates

## Dispatcher

스케줄러가 선택한 프로세스에게 CPU 코어의 권한을 주는 모듈. 스케줄러는 선택하고
디스패처는 실제로 스위칭해준다.

- 프로세스끼리 맥락 스위칭
- 유저 모드로 스위칭
- 작업 재개를 위해 적합한 위치로 점프

디스패쳐는 겁나 빨라야한다. Context switching때마다 불리기 때문. Dispatch
latency가 CPU 실제 사용시간보다 길면 끔찍해진다. 윈도우에서는 vmstat 명령어로 보
고, 맥은 sudo latency로 보는 듯.

**스케줄링의 목표**

- CPU utilization: CPU를 최대한 바쁘게.
- Throughput: 시간당 완료되는 프로세스의 개수를 최대로.
- **Turnaround time**: 프로세스의 실행에 얼마나 걸리는가? 실행부터 종료까지의 시
  간
- **Waiting time!**: ready queue에서 기다리는 시간의 합을 최소로.
- Response time

이제 어떤 전략으로 ready queue에 있는 프로세스들 중 하나를 선택하는지 살펴보자.

## FCFS

![](FCFS.png)

First-Come, First Served. 가장 간단하고 구현하기 쉬운 스케줄링. FIFO 큐로 구현할
수 있다.

문제에 나온 Gantt 차트가 뭐지? '간트 차트(Gantt chart)는 프로젝트 일정관리를 위
한 바(bar)형태의 도구로서, 각 업무별로 일정의 시작과 끝을 그래픽으로 표시하여 전
체 일정을 한눈에 볼 수 있다.'

프로세스들의 CPU-burst time 범위가 클수록 평균 대기 시간이 크게 차이난다. 일반적
으로 minimal하지 않다.

FCFS에서는 **Convoy Effect(호송 효과)**가 발생한다. 큰 하나의 프로세스가 CPU에서
나올 때까지 모든 다른 프로세스들이 기다린다.

[Convoy Effect in Operating Systems](https://www.geeksforgeeks.org/convoy-effect-operating-systems/).
큰 burst time을 가지는 하나의 CPU intensive 프로세스와 적은 burst time을 가지지
만 I/O bound(I/O 작업이 자주 필요함)인 여러개의 다른 프로세스가 있다고 하자.

1. I/O bound 프로세스가 먼저 CPU를 차지한다. 얘네는 금방 끝나고 I/O 큐로 간다.
1. 이후 CPU bound 프로세스가 CPU를 차지하지만 처리에 시간이 오래 걸린다. 그동안
   I/O bound 프로세스는 입출력 작업을 끝내고 ready 큐로 간다.
1. 하지만 CPU는 아직 CPU bound 프로세스가 사용하고 있고 I/O bound 프로세스는 계
   속 기다린다. **I/O 디바이스가 idle하게 된다.**
1. CPU bound 프로세스가 끝나면, 입출력 디바이스에 접근하기 위해 I/O queue에 간다
   . 그동안 I/O bound 프로세스는 필요한 CPU time을 가지고 I/O queue로 돌아간다.
1. 이번에도 I/O 프로세스는 기다리는데, CPU bound 프로세스가 여전히 I/O 디바이스
   에 접근하고 있기 때문이다. **CPU가 idle하게 된다.**

호송 효과에서 눈치챌 수도 있겠지만 FCFS는 비선점형 스케줄링이다.

## SJF

Shortest Job First. 혹은 shortest-next-CPU-burst-first 스케줄링.

가장 작은 next CPU burst time을 가지는 프로세스에게 CPU를 준다. 두개 이상의 프로
세스가 이 값이 같다면 FCFS로 break the tie 한다.

FCFS와 달리 provably optimal하여 최소의 평균 대기 시간을 가짐을 귀류법?으로 증명
가능할 수 있다. 짧은 프로세스을 긴 것 앞으로 옮기면 짧은 프로세스의 감소한 대기
시간이 긴 프로세스의 늘어난 대기시간보다 커서 평균 대기 시간이 감소한다.

하지만 next CPU burst time을 정확히 알 수 없고 예측해야한다. 과거 측정값의
exponential average를 사용한다. 네트워크 공부할 때도 비슷한 전략을 쓴듯??

근데 예측 위해 용량이 많이 필요하고 SJF는 이론적으로 optimal이지 실제로 사용하기
는 힘들다.

선점, 비선점 모두 가능하다. ready에 새로운게 왔을 때 CPU에서 실행중인 프로세스를
어떻게할지는 선택. 여기서 선점을 시킨다면 **SRTF**.
Shortest-Remaining-Time-First는 preemptive. 새로 온 CPU burst가 현재 돌아가는 것
보다 작으면 선점시킨다.

> SJN is a non-preemptive algorithm. Shortest remaining time is a preemptive
> variant of SJN.

## RR

Round-Robin. preemptive FCFS with a time quantum. 여기서 time quantum이란 10-100
밀리초의 작은 단위의 시간. Ready queue가 원형 큐여서 스케줄러는 이를 돌면서 각프
로세스마다 1 time quantum만큼의 시간을 부여한다(시분할).

타이머 역할을 하는 것을 watchdog이라고도 한다 ㅎ.

time quantum에 따라 성능이 많이 달라짐. quantum이 작으면 context switch가 많이발
생함. Dispatch latency.

프로세스가 1 time quantum보다 적은 CPU burst를 가지면 자발적으로 CPU를 반환, 길
면 timer가 끝나 OS에게 interrupt를 받고 context switch와 함께 프로세스가 ready
queue의 tail에 놓여진다.
[Wikipedia](https://en.wikipedia.org/wiki/Round-robin_scheduling)를 보면 time
quantum 중간에 쫓기는 것 같지는 않다. 아 하긴 SJF에서는 실행 시간을 안다고 가정
했으니까...

RR의 성능은 time quantum의 크기에 따라 크게 달라진다.

![](rr.png)

## Priority-base

각 프로세스마다 우선순위가 있고 가장 높은 우선순위를 가진 프로세스에게 CPU가 할
당된다. 같으면 FCFS 순서로하거나 rr로 스케쥴링할 수도 있다.

사실 SJF는 이 스케줄링의 특별한 경우다. 이 경우 우선순위가 next CPU burst의 역순
.

선점과 비선점 모두 가능하다.

**The problem of starvation**. 낮은 우선도의 프로세스는 영원히 기다릴 수도 있다.
**aging**으로 해결. 시스템에서 기다리고 있는 프로세스들의 우선도를 점진적으로 높
인다.

## MLQ

![](MLQ.png)

Multi-Level Queue. 각 우선순위별로 ready queue를 가진다.

## MLFQ

![](MLFQ.png)

Multi-Level Feedback Queue 점점 quantum을 높게 준다. 실전 os적인 알고리즘.

## 현대 운영체제

현대 운영체제에서는 쓰레드 스케줄링을 하며 그중에서도 kernel thread만 스케줄링하
면 된다. user thread는 thread library가 해주니 kernel은 얘네를 신경 안쓰고 매핑
만 해주면 된다.

Real-Time Operating System(주어진 시간 내에 task를 완료할 수 있는 OS)에서의 스케
줄링은 종류에 따라 달라진다.

- **Soft RealTime**: critical real-time process가 noncritical보다 우선시되면 됨.
- **Hard RealTime**: task가 데드라인 내에 무조건 완료되어야한다. 반드시 우선도를
  가지고 스케줄링 되어야한다.

---

!문제풀 때 주의할 점. 대기 시간은 들어온 것 기준으로!!! 없을 때는 계산하지 않음.
