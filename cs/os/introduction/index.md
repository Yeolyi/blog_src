---
title: 운영체제란
---

An operating system (OS) is system software that manages computer hardware,
software resources, and provides common services for computer programs.

**운영체제**란 컴퓨터 시스템을 운영(operate)하는 소프트웨어이다. 컴퓨터 하드웨어
와 소프트웨어 자원을 관리하고 컴퓨터 프로그램들에게 공통된 서비스를 제공한다.

**컴퓨터**란 정보를 처리하는 기계이다. 우선 정보에 대해 알아보자.

## 정보이론

클로드 섀넌의 정보이론에서 정보가 무엇인지에 대한 힌트를 얻을 수 있다. 여기서
**정보**란 불확실성을 측정해서 양적으로 표현한 것이다.

[Quantity of information: 정보량](https://hyunw.kim/blog/2017/10/14/Entropy.html)

상대방이 어떤 알파벳을 머릿속에 떠올리고 내가 질문을 해서 그것을 맞춘다고 하자.
모든 알파벳의 등장 확률이 같다면 lb(알파벳의 개수)번의 질문을 해야한다.

보다 일반화해서, 각 사건이 서로 다른 확률을 가진다고 하면 질문 횟수(정보량)는
-lb(발생 확률)과 같다. 여기서 섀넌 엔트로피 H의 식이 도출된다.

![](shannon_entropy.png)

즉, 엔트로피란 최적의 전략을 사용했을 때 어떤 사건을 예측하는데 필요한 질문의 개
수에 대한 기댓값이다. 불확실성이 클수록 엔트로피도 커지고, 정보량도 많아진다.

여기서 정보의 단위는 비트로 binary digit의 약자이다. 밑이 2인 로그였다는 사실을
기억하자. 밑이 e와 10이었다면 각각 nit, dit라고 한다.

## 비트

컴퓨터는 정보를 정보의 최소 단위인 bit로 처리한다. 정보의 처리란 정보의 상태 변
환이며 부울 대수(boolean algebra)로 이루어진다. 트랜지스터로 논리 게이트를 열심
히 만들어서 처리. 더 나아가면 IC, LSI와 같은 논리 회로가 된다. 정보의 저장은 플
립-플롭으로, 전송은 데이터 버스 등을 통해.

다시 본질로 돌아와서, 그래서 컴퓨터가 정보를 처리한다는 것은 어떤 의미인가? 덧셈
은 반가산기와 전가산기로. 뺄셈은 2의 보수 표현법으로. 곱셈과 나눗셈은 덧셈 뺼셈
의 반복으로 구현. 물론 단일 회로로 하드웨어적으로 구현할 수도 있다. 실수 연산은
부동 소수점 표현법으로. if, for, 함수는 GOTO로. 여기까지 하면 삼각함수, 미분, 적
분, 동영상 재생 등등을 다 할 수 있다.

## 컴퓨터

범용 컴퓨터: general-purpose computer.

따라서 컴퓨터는 **범용성**이 있다. NOT, AND, OR로 모든 계산을 할 수 있다. 더 나
아가 NAND로도 다 할 수 있다. 특정한 목적으로 만들어진 계산기 등은 소프트웨어로다
른 일을 시킬 수 없지만 컴퓨터는 소프트웨어에 따라 모든 일을 할 수 있다.

그런데 정말 뭐든지 할 수 있을까? 계산 가능성(computability)을 봐야 한다.
Turing-computable이면 튜링 머신으로 계산 가능하지만 튜링 머신으로 풀 수 없는 정
지 문제(Halting problem)는 컴퓨터가 풀 수 없다. 컴퓨터는 turing computable한 것
을 할 수 있다.

컴퓨터는 누가 만들었을까? 1936년 앨런 튜링의 논문에 있는 튜링 머신이 현대적 컴퓨
터의 원형이다. 이후 폰 노이만이 ISA(Instruction Set Architecture)를 통해 실제로
동작하는 컴퓨터를 만들었다.

튜링머신과 컴퓨터는 다음과 같이 대응된다.

- 튜링머신 -> 응용 프로그램
- 유니버설 튜링 머신 -> 운영체제
- 헤드 -> CPU
- 테이프 -> 메모리

폰 노이만이 컴퓨터의 아버지라 불리는 이유는 내장형 프로그램 방식을 처음 도입했기
때문. 메모리에 프로그램을 저장하는 컴퓨터. RAM의 명령어를 CPU가 fetch해서
execute하는 사이클 가지는 컴퓨터를 처음 설계. **폰 노이만 구조**. ISA와 명령어집
합으로 컴퓨터를 운영하는 것.

**프로그램**이란, 명령어들의 집합이다. 컴퓨터 하드웨어에 특정 일을 수행하도록 한
다.

운영체제도 프로그램의 일종이다. 컴퓨터에서 항상 실행되고, 유니버설 튜링 머신에해
당되며, 시스템 서비스를 application program에 제공해준다. 응용 프로그램이 직접건
드리면 귀찮아지기 때문. 운영체제는 프로세스(매우 중요, 이것만 알아도 50%)와 자원
, user interface(마우스, 키보드)등을 관리한다.

## 운영체제의 역할

컴퓨터 시스템은 크게 4개로 나눌 수 있다.

- 하드웨어
- 운영체제
- 응용 프로그램
- 유저

사실 보편적으로 받아들여진 운영체제의 정의는 없다. 공통적인 정의는 컴퓨터에서 항
상 작동하는 프로그램. 이렇다면 OS에서 가장 핵심적인 것은 **커널**. 커널은 항상작
동하는 프로그램이다. 커널과 함께 system program과 application program 두 가지의
프로그램이 존재한다.

## 컴퓨터 시스템 구조

전통적인 컴퓨터 시스템은 한 개 이상의 CPU와 버스로 연결된 여러 기기 관리자로 구
성된다.

**Bootstrap** 프로그램은 컴퓨터가 켜지자마자 실행되며 운영체제를 로딩하는 역할을
해준다. ROM에 저장되어있다. Booting의 어원. 그 다음부터는 OS가 돌면서 알아서 해
줌.

**Interrupt**. CPU가 fetch/execute를 하는 동안 I/O 기기가 CPU에게 정보를 전달해
야될 수 있다. CPU와 주변 장치가 통신하는 방법이다. 하드웨어는 언제든지 interrupt
를 트리거할 수 있다. 일반적으로 system bus 사용.

**폰 노이만 구조**. 메모리로부터 명령어를 fetch하고 instruction register(기억하
기!)에 저장한다. 이후 명령어는 decode되고 피연산자가 메모리에서 fetch되어 내부레
지스터에 저장되기를 요구할 수도 있다. 명령어가 실행되면 결과가 메모리에 다시저장
될 수 있다.

정보를 날리지 않으려면 비휘발성 저장장치가 필요한데 얘네들은 여러 위계로 구성된
다. 용량과 속도에 따라 계층이 나뉜다. CPU쪽으로 갈 수록 용량이 적고 빠르다.
register -> cache -> main memory -> solid-state disk...

![](modern_computer_system.png)

**DMA**. Direct Memory Access. 유튜브 영상같은 것을 본다면 cpu가 할 일이 거의 없
으니 네트워크 카드가 디스플레이에 다이렉트로 정보를 보내는 것이 유리할 수 있다.

OS 코드의 대부분은 I/O와 관련되어있다. OS 개발도 kernel은 거의 그대로 있고
device controller를 만드는 게 대부분.

## 컴퓨터 시스템 아키텍처

아키텍처 정의가 사전에 이렇게 있는 게 신기하다.

> 컴퓨터를 기능면에서 본 구성 방식. 기억 장치의 번지 방식, 입출력 장치의 구성 방
> 식 등을 가리킴. 일반적으로 같은 아키텍처의 컴퓨터에는 소프트웨어의 호환성(互換
> 性)이 있음.

- CPU: 명령어를 실행하는 하드웨어
- Processor: 하나 이상의 CPU를 포함한 물리적인 칩
- Core: CPU의 back computation 유닛
- Multicore: 한 CPU에 여러개의 computing core가 있는 것
- Multiprocessor: 여러개의 프로세서를 포함하는 것

> A central processing unit (CPU), also called a central processor, main
> processor or just **processor**, is the electronic circuitry that executes
> instructions comprising a computer program.

하지만 이거 보면 프로세서랑 코어랑 그냥 혼용해서 쓰는 듯... 프로세서의 예시에는
CPU, GPU, NPU 다양한걸 보니 프로세서가 더 넓은 범위인 것 같다. 인터넷 글들도 말
이 다 다르고 좀 애매!!

**Symmletric multiprocessing(SMP)** 대칭형 멀티프로세싱. 가장 보편적인 멀티프로
세서 시스템. 운영체제와 메모리를 공유하는 여러 프로세서가 작업을 수행. 한 운영체
제가 모든 프로세서를 관리. ASYNC한건 주 프로세서가 전체를 통제하는건데 안쓰지 알
지 말자. 위키피디아 문서도 둘이 분위기가 다름.

**Core**. CPU 자체가 여러개면 비용이 많이 드니 하나의 프로세서에 CPU core를 여러
개 만들자. 듀얼 코어, 쿼드 코어 등,,, Multi-core design. 각 코어에 레지스터와 코
어가 존재한다.

## Operating System Operations

**멀티 프로그래밍**. 예전에는 프로그램 하나를 로딩해서 썼지만, 여러개의 프로그램
을 메모리에 동시에 올려 동시에 실행시키는 것. 한번에 한 개 이상의 프로그램이 실
행된다. CPU 효율을 높일 수 있다.

**멀티태스킹**. 멀티 프로그램의 logical extension. 하나의 CPU가 일을 빠르게
switching해 유저가 각 일과 동시에 상호작용할 수 있는 것. 여러 프로세스들이 같은
시간에 동작할 준비가 되면, 시스템이 다음에 누가 동작할지 선택해야된다. **CPU 스
케줄링** 등장.

운영체제가 등장하고 operation mode가 중요해진다. **유저 모드**와 **커널 모드**.
나쁜 프로그램이 다른 프로그램에 영향을 미치지 않게 하기 위해 중요한 작업들을 커
널 모드에서만 할 수 있도록 분리해놓는다.

## Virtualization

![](virtual_machines.png)

하나의 하드웨어 자원에서 운영 체제를 여러개 돌리도록 해주는 기술. 컴퓨터의 하드
웨어에 대한 추상화. 하드웨어에 VMM을 올려 여러개의 OS를 동시에 사용하는 것. VMM
스케쥴링도 함.

## 컴퓨팅 환경

다양한 컴퓨팅 환경에서 운영체제가 사용되는 중. 모바일, 클라이언트-서버,
Peer-to-Peer,,, 비트토렌트처럼 서버 없이 각자 조각을 조금씩 가지는 것. 비트코인
의 블록체인. 블록체인이 이 P2P의 산물. RTOS.

## 운영체제 서비스

OS는 프로그램의 실행을 위한 다양한 환경을 제공

- UI
- Program execution
- I/O Operation
- File-system manipulation
- Communications
- Error
- Resource allocation
- Logging
- Protection and security

## 사용자와 운영체제 인터페이스

**CLI**. Command Line Interface. 쉘로 알려져있으며 sh, bash, csh등이 있다.

컴퓨터 응용 프로그램에서는 **system call**을 통해 호출. 시스템 콜은 OS가 제공해
주는 서비스에 대한 인터페이스를 제공한다. API(Application Programming Interface)
라고 함. OS의 API가 system call이라고 이해하자.

근데 항상 system call하면 힘드니 따로 라이브러리를 제공. 표준 C 라이브러리는 시
스템 콜 인터페이스의 일부를 제공한다.

시스템 콜에 대한 공부는 시스템 프로그래밍 수업에서! 우리는 운영체제의 개념을 알
기위한 정도만 system call을 공부.
