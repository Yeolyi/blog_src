---
title: 스토리지와 입출력
---

## Mass-Storage

비휘발성인 이차 저장 시스템. HDD 등등. 광학 디스크나 클라우드 저장공간 등등은
RAID 시스템을 사용하기도 함.

그런데 HDD도 스케줄링을 해야된다. 다음 두가지 목적이 있다.

- Access time(or seek time)을 줄이기. **seek time**란 헤드를 움직여 섹터를 찾아
  갈 때까지 걸리는 시간.
- Data transfer bandwidth 늘이기. **Disk bandwidth**란 첫 요청부터 마지막 전송까
  지 전송된 총 바이트를 시간으로 나눈 값.

HDD 스케줄링에는 순서대로 정직하게 가는 FIFO 스케줄링, 디스크의 한쪽 끝부터 다른
쪽 끝을 왕복하는 SCAN 스케줄링. 단방향으로만 스캔하여 SCAN보다 일관적인 대기 시
간을 제공하는 C-SCAN 세가지가 있다.

**Boot Block**. 전원이 인가되었을 떄 컴퓨터를 구동시키기 위한 프로그램
(bootstrap)을 로딩. Bootstrap loader는 NVM flash memory에 저장되어있고 알려진 메
모리 위치에 매핑되어있다.

**RAID**: Redundant Arrays of Independent Disks. 데이터의 읽고 쓰기를 병렬적으로
하고 저장 매체의 신뢰도를 높이기 위해 사용. Reliability는 redunduncy로 높일 수있
고 Performance는 parallelism으로 높일 수 있다. 드라이버간 데이터를 strip하여병렬
적으로 저장한다.

Mirroring은 신뢰도가 높지만 너무 비싸고, striping은 효과적이지만 신뢰도와 관련되
어있지 않다. 이 둘의 조합에 따라 RAID level이 나뉘는 듯? RAID level: 비용-성능트
레이드오프

parity bit -> checksum -> CRC

## I/O

컴퓨터는 I/O와 computing을 한다. 오히려 I/O가 더 중요할 때가 많다. I/O에서 운영
체제의 역할은 manage/control. 운영체제 개발할 때도 커널보다는 device driver 만드
는 것을 더 함.

![](PC_bus.png)

프로세서는 I/O transfer를 위해 어떻게 컨트롤러에게 명령 및 데이터를 전달할까? 컨
트롤러에 data/control signal을 위한 레지스터들이 있다. data-in, data-out,
status, control register 등등.

**Memory-Mapped I/O**에서는 control register들이 프로세서의 주소 공간에 매핑된다
. The CPU executes I/O requests using the standard data-transfer instructions to
read and write the device-control registers at their mapped locations in
physical memory.

**I/O의 세가지 종류**

- Polling(busy-waiting): 상태 레지스터를 계-속 읽음.
- interrupt: 인터럽트가 생기면 그에 해당하는 ISR(Interrupt Service Routine)으로
  점프. ISR의 주소는 인터럽트 벡터 테이블에 명시되어 있음.
- DMA(Direct Memory Access): programmed I/O의 사용을 피하기 위해 사용되며 대량의
  데이터 전송을 처리하기에 유용하다.

## Blocking / Non-blocking I/O

blocking은 쓰레드가 멈춰서 running에서 waiting queue로 간다. non-blocking은 쓰레
드의 실행을 멈추지 않고 계속계속 return을 한다. 워드프로세서에서 키보드 입력 등.

Asynchronous system call. 실행을 계속 해나간다. non-blocking read는 즉시 return
을 하고 async는 요청을 하고 자기 할 일을 한다.

## File System

운영체제와 모든 사용자에게 데이터와 프로그램을 저장하고 접근하는 매커니즘을 제공
한다. 데이터를 저장하는 **파일**과 파일들을 정리하는 **경로**로 구성된다.

접근에는 두가지 방식이 있다. **sequential access**은 하나씩 차근차근 접근하는 것
인데 옛날 테이프 쓸 적 방식이다. 감아서 돌려야되니까. direct access(random
access)에서 파일은 고정 크기의 logical record로 만들어지는데 덕분에 프로그램이특
별한 순서 없이도 읽고 쓰기를 할 수 있다.

**Directory Structure**. The directory can be viewed as a symbol table that
translates file names into theirs file control blocks. 항목을 하위 경로에 넣을수
있다? 없다?

![](layered_file_system.png)

logical file system부터는 라이브러리 형태로 제공.

**Allocation Method**. 파일 시스템에서 파일을 어떻게 잘 locate하여 저장공간이 효
율적으로 사용되고 파일을 빠르게 접근할 수 있게 할 것인가.

- Contiguous Allocation. 외부 파편화, compaction이 필요함.
- Linked Allocation. 위의 문제를 해결. 각 파일은 storage block의 연결 리스트이다
  . block은 곳곳에 흩어져있을 수 있다.

**FAT**: File Allocation Table. Linked allocation은 연속적인 파일 접근에서만 유
용하게 사용될 수 있다. 그러니 file allocation table을 사용하자. 각 볼륨의 시작에
해당하는 섹션이 table을 가져 블록 번호로 인덱싱된 각 블록에 대한 엔트리를 가진다
.

일반화시키면 **Indexed Allocation**. 모든 포인터를 index block으로 모았다? 자세
한건 리눅스의 ELF file format?

**Free-Space Management**. 안쓰는 섹터도 알아야하기 때문에 시스템은 free-space
리스트를 관리한다.
