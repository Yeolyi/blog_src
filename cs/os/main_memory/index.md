---
title: 메인 메모리
---

## 도입

프로세스란 실행중인 프로그램이며 메모리에 명령어들이 로드되어있는 상태이다.

여기서 메모리는 바이트 단위로 구성된 배열이며 각각은 주소를 갖는다. CPU는 PC가가르키는 곳의 명령어를불러오고 명령어들은 load와 store를 할 수 있다.

그렇다면 메모리에 어떻게 프로세스를 저장하고 관리할까? 따로따로 잘 관리하는 것이멀티프로그래밍의 기본.

## 메모리 공간

각 프로세스들이 각각의 메모리 공간을 가짐을 확신할 수 있어야 한다.

base register, limit register를 사용해 적법한 주소 범위(base ~ base + limit)를확인한다. 여기서 벗어난 곳 접근하면 segmentation fault를 발생시킨다. 항상 체크해야되기 때문에 하드웨어로 구현한다.

## Address Binding

소스 파일에 있는 주소들은 일반적으로 symbolic하다. 컴파일러는 symbolic한 주소를 relocatable한 주소로바인딩해주고, linker나 loader가 이를 다시 absolute 주소로바인딩해준다. 컴파일러는 해당 파일이 실행시메모리 어디에 있을지는 모른다. linker 가 logical address, lodaer가 physical address.

![](multistep.png)

## Logical / Physical Address

logical address: CPU가 만든 주소 physical address: 메모리 유닛에서 보여진 주소. memory-address 레지스터에 로드된 것.

logical address space: 사용자 프로그램에 의해 만들어진 논리 주소들의 합. physical address space. 논리 주소 공간에 대응되는 물리적 주소 공간.

## MMU(Memory Management Unit)

logical와 physical를 변환해주는 하드웨어 기기. relocation register는 단순히 수를더해주는데 MMU의 간단한 예시...같은 느낌인듯? 아래에서 배울 continuous memory allocation에서 사용한다.

## Dynamic loading

전체 프로그램과 데이터가 물리 메모리에 있을 필요가 있을까? 모든 루틴이 한꺼번에로딩될 필요가 없다. 필요할때만 로딩! 따라서 램보다 크기가 큰 프로그램도 실행할수있으며 메모리 공간 활용도가 높아진다.

The advantage of dynamic loading is that

- a routine is loaded only when it is needed.
- the relocatable linking loader is called to load the desired routine
- and to update the program’s address tables to reflect this change.

무슨 소릴까 ㅎㅎ...

## Dynamic linking

[[Linking] 정적 링킹과 동적 링킹의 차이](https://live-everyday.tistory.com/69)

**DLL**(Dynamically Linked Libraries): 시스템 라이브러리들이 사용자 프로그램이실행중일 때 링크됨.

**Static linking**: 시스템 라이브러리를 다른 오브젝트 모듈처럼 취급하고 로더로인해 이진 프로그램 코드로 합쳐짐.

**Dynamic linking**: dynamic loading처럼 링킹을 실행 시간까지 미루는 것.

**Shared library**: DLL이 예시. 메인 메모리에 하나의 인스턴스만 있으며 여러 유저프로세스들 간에 공유될 수 있다.

## Memory Allocation

어떻게 메모리를 효율적으로 분배할 수 있을까? 메모리는 사용자 프로세스를 위한 부분과 운영체제를 위한부분으로 나뉜다. 여러 유저 프로세스들이 같은 메모리에 있다. 메모리를 필요로 하는 프로세스들에게 어떻게 메모리를 할당해줄 수 있을까?

## Contiguous Memory Allocation

Single section of memory에 프로세스가 존재한다. 그래서 memory protection도 간단하다. 아까 배운 limit register를 응용한다. Logical address가 limit address보다크면 trap을 일으키고, 그렇지 않다면 relocation regiser를 사용한 덧셈으로 physical address를 만들어낸다.

**Variable-Partition scheme**. 각 프로세스를 다양한 크기로 파티션된 메모리 공간에 놓는다. 각 파티션은 정확히 하나의 프로세스만 담을 수 있다.

하지만 memory allocation과정 중 사이사이 사용 가능한 메모리 공간인 **hole**이 생기고 이걸 어떻게 관리하느냐가 중요해진다.

**Dynamic Storage Allocation**의 문제는 남는 hole들을 어떻게 사용하여 n크기를 필요로 하는 프로세스의요청을 처리하냐는 것이다. First-Fit, Best-Fit, Worst-Fit으로 전략이 나뉜다.

## Fragmentation

남아 있는 공간은 많지만 쪼개지다보니 각각이 contiguous하지 않은 문제.

- external fragmentation. Continuous Memory Allocation으로 인해 발생하는 것. 남은 메모리가 다수의 작은 hole로 분할되어있다.
- internal fragmentation. 할당된 메모리 공간이 프로세스가 필요로 하는 것보다 큰경우. Paging을 할 때생성된다.

  10.12 문제 읽어보기. 교재 edition이 바뀌면서 segmentation을 문제에서만 소개한다. **CMA**는 통쨰로메모리를 로딩, **Segmentation**은 쪼개긴하는데 종류별로쪼개자. **Paging**은 똑같은 크기로 쪼개자. 요즘엔 페이징을 쓰고 Segmentation은쓰지 않는다.

그나저나 [조각모음](http://en.wikipedia.org/wiki/Defragmentation)이랑 관련된건가 ?

## 페이징

CPU는 논리 주소로 프로그램이 설정한대로 연속적인 주소값으로 명령을 내리고 이는메모리로 가기전에 각페이지의 실제 메모리 주소가 저장되어 있는 테이블에서 물리주소로 변경되어야 한다.

여기 공부하면서 느꼈지만 죄다 컴구 내용이다 ^^; 컴구도 조만간 공부해야할 듯.

[[운영체제(OS)] 13. 페이징](https://velog.io/@codemcd/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9COS-13.-%ED%8E%98%EC%9D%B4%EC%A7%95) [How does compiler lay out code in memory](https://stackoverflow.com/questions/19101449/how-does-compiler-lay-out-code-in-memory)

프로세스의 물리적 주소 공간이 연속적이지 않은 것을 허용한다. Continous Memory Allocation에 있었던 두가지 문제점인 external fragmentation과 associated need for compaction(hole을 압축하는 과정?)을 극복했다. OS와 컴퓨터 하드웨어간 협력이 필요하다.

기본적으로 물리 메모리를 고정 크리의 블록인 **frame**들로 나누고 논리적 메모리도이에 매핑되는 같은크기의 **page**들로 나눈다. 프로그램을 쪼개기 때문에 꼭 순서대로일 필요가 없으며 이제 논리적 메모리와물리적 메모리가 완전히 별개의 것이 된다! 논리적 주소만 신경쓰면 나머지는 운영체제와 하드웨어가 처리해준다.

![](paging_hardware.png)

CPU가 만드는 주소를 **page number(p)**와 **page offset(d)**으로 분할한다. 페이지번호를 page table에접근하는 주소로 사용해 프레임 번호 f를 받아온다.

## 페이지 크기

페이지 크기는 하드웨어에 따라 다르지만 2의 지수배이다. 논리 주소에서 뚝 떼서 사용하니까 2의 지수일수밖에! 4KiB ~ 1GiB 범위의 크기를 사용한다.

논리 주소가 m digit이고 페이지 크기가 n digit이면 위쪽 (m-n)비트는 페이지 넘버, 아래 n비트는 페이지오프셋을 표현.

## PTBR

스케줄러가 다음 프로세스를 선택하면 페이지 테이블 또한 context switch를 위해 reload되어야한다. 하지만 페이지 테이블의 크기는 매우 크다.

그러니 PTBR(page-table base register)라는 page table을 가르키는 레지스터를 따로쓰고 페이지 테이블은메인 메모리에 냅두자. 그러면 테이블 전체가 아니라 포인터만저장하면 되니 context switch를 더 빠르게할수 있다. 물론 얘도 다른 레지스터값과함께 PCB에 저장되어야 한다.

## TLB

![](TLB_hardware.png)

하지만 여전히 메모리 접근이 느리다. 메모리에 있는 page-table entry에 한번, 또 메모리에 있는 실제 데이터에 한번 접근해야되니 두 배의 시간이 걸린다. TLB(Translation Look-aside Buffer)라는 캐시를 따로두자. 하드웨어 엑세스라서 거의 시간이 안걸림.

- TLB hit: TLB에 찾고자하는게 있음
- TLB miss: 없음
- hit ratio: 원하는 페이지 번호가 TLB에 있을 확률

## 페이징에서의 메모리 보호

각 프레임과 관련되어있고 페이지 테이블의 entry에 있는 protection bit로 보호가 이루어진다. **valid-invalid bit**가 valid하면 연관된 페이지는 프로세스의 논리 주소에 있고(legal), invalid하면 있지 않다(illegal). Illegal한 주소는 trap이 발생한다 .

## Shared Pages

멀티프로그래밍 환경에서 중요한 고려사항인 공통 코드의 공유가 페이징의 이점이다. **Reentrant code**란실행중에 절대 바뀌지 않는 코드이다.

## Structuring the Page Table

큰 논리 주소 공간은 페이지 테이블도 매우 커지게 하는데 큰 페이지 테이블을 어떻게관리할 수 있을까?

- Hierarchical Paging
- Hashed Page Table
- Inverted Page Table

## Swapping

Swapping을 통해 물리적 메모리보다 훨씬 큰 프로그램도 실행시킬 수 있고 멀티프로그래밍의 정도를 높일수있다. 프로세스의 일부는 메모리 바깥으로 **swap**되고 나중에 필요할 때 다시 되돌아올 수 있다. 극단적으로는 어떤 프로세스든 한 페이지만 있으면 된다.

페이징이 없을 때는 프로세스 전체를 swap in/out 해야되니 비용이 컸지만, 페이징을통해 일부 페이지만 swapping할 수 있어 효율을 높일 수 있다.

- page out: page를 메모리에서 backing store로.
- page in: page를 backing store에서 메모리로.

페이징은 뒤에서 배울 virtual memory와 잘 어울린다.
