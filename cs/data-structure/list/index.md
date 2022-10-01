---
title: 리스트
---

## 구현 방법에 따른 리스트의 분류

[순차 리스트](array-list)

- 배열을 기반으로 구현된 리스트

[연결 리스트](linked-list)

- 메모리의 동적 할당을 기반으로 구현된 리스트

## 리스트의 변형

[원형 연결 리스트](circular-linked-list)

[양방향 연결 리스트](double-linked-list)

## 리스트의 기본 특성

데이터를 나란히 저장하며 중복된 데이터의 저장을 막지 않는다.

> In computer science, a list or sequence is an abstract data type that
> represents a finite number of ordered values, where the same value may occur
> more than once.
>
> - Wikipedia

원소의 추가 순서가 보존될 필요는 없는 것 같다.

## ADT 정의

구현하려는 리스트의 기본적인 ADT는 다음과 같다. 리스트의 종류에 따라 추가적인 기
능이 있을 수 있다.

책의 예제에 내 생각을 첨가해서 ADT를 꽤나 수정했다.

- LRemove가 데이터를 반환해야 할 이유를 모르겠어서 책의 예제의 반환값이없던
  LData에서 Void로 수정했다. 어차피 LFirst나 LNext 호출하고 LRemove를 쓸거니까.
  스택의 pop 같은 함수면 반환해야지.
- 또한 책에는 리스트를 deinit하는 함수가 없어서 내가 추가했다.

```{class="language-c"}
void ListInit(List *plist);
// 리스트 생성 후 가장 먼저 호출되어야 하는 함수

void LInsert(List *plist, LData *pdata);

bool LFirst(List *plist, LData *pdata);
// 데이터의 참조를 위한 초기화가 진행된다.
// 성공 여부를 반환한다.

bool LNext(List *plist, LData *pdata);
// 다음 데이터를 참조한다.
// 순차적 참조를 위한 반복 호출이 가능하다.

void LRemove(List *plist);
// LFirst 혹은 LNext의 마지막 반환 데이터를 삭제한다.

int LCount(List *plist);

void LClear(List *plist);
```

추가로 다음 typedef를 통해 사용할 리스트와 저장할 원소를 유동적으로 변경할 수 있
다.

```{class="language-c"}
typedef Point LData;
typedef LinkedList List;
```

## 리스트 구현

ADT는 구현에 영향을 미쳐 중요하다. 예를 들어 LFirst가 순회 전에 항상 호출됨을 명
시되어있는데, 따라서 LInit에서는 before를 꼭 초기화하지 않아도 된다. 마찬가지로
LRemove에서는 원소의 개수가 0임을 확인하지 않아도 된다.

구현 단계에서는 next 함수에서 data 참조와 next 이동의 순서 관계가 포인트. 이동을
하고 참조를 하니 cur이 6에 있다는 것을 6이 참조되었다는 것을 의미한다.

LClear 함수를 구현하다보니 LFirst와 LNext 함수에 LData 포인터가 꼭 유효해야하는
지 고민하게 되었다. 그래서 두 함수에 포인터가 NULL인지 확인하는 조건문을 삽입했
다.

while문이 종료되었다는 것은 그 아래는 while문의 조건을 충족시키지 못하는 상태하
는 뜻. 당연하지만 코드 해석할 때 유용한 정보이다.

## 추가할 원소 정의

테스트를 위해 다음과 같은 구조체와 함수를 정의했다. 자연수 배열에서 자연수를 찾
는 것은 웃기니까 ^^;

```{class="language-c"}
typedef struct __Point
{
    int x;
    int y;
    int level;
} Point;

void printPoint(Point *a)
{
    printf("(%d, %d, level: %d) ", a->x, a->y, a->level);
}
```

다음과 같이 typedef를 정의해 사용할 리스트의 종류와 저장될 원소를 유동적으로 지
정할 수 있다.

```{class="language-c"}
typedef Point LData;
typedef LinkedList List;
```

## 테스트 코드

```{class="language-c"}
int main(void)
{
    int testDataSize = 7;
    int xList[] = {3, 1, 4, 1, 5, 9, 2};
    int yList[] = {6, 8, 3, 5, 8, 9, 7};
    int level[] = {3, 2, 3, 8, 4, 6, 2};

    Point *testData = malloc(sizeof(Point) * testDataSize);

    for (int i = 0; i < testDataSize; i++)
    {
        testData[i].x = xList[i];
        testData[i].y = yList[i];
        testData[i].level = level[i];
    }

    List list;
    Point data;
    ListInit(&list);

    for (int i = 0; i < testDataSize; i++)
        LInsert(&list, testData[i]);

    printf("Data Count: %d\n", LCount(&list));

    if (LFirst(&list, &data))
    {
        PrintPoint(&data);
        while (LNext(&list, &data))
            PrintPoint(&data);
    }
    puts("");

    if (LFirst(&list, &data))
    {
        if (data.level == 2)
            LRemove(&list);
        while (LNext(&list, &data))
            if (data.level == 2)
                LRemove(&list);
    }
    if (LFirst(&list, &data))
    {
        PrintPoint(&data);
        while (LNext(&list, &data))
            PrintPoint(&data);
    }
    puts("");
    printf("Data Count: %d\n", LCount(&list));
    LClear(&list);
}
```

C를 오랜만에 다뤘는데 검색 중 다음과 같은 사실들을 깨달았다.

- c언어에서 NULL은 포인터에 적용됨.
- [NULL의 크기](https://stackoverflow.com/questions/4141666/why-sizeof-is-equivalent-to-1-and-sizeofnull-is-equivalent-to-4-in-c-langu/4141699)
- You must always check for NULL pointers when using malloc & co. In that case
  NULL mean that something went wrong, most likely that no memory was available.

[Difference between head and tail insert in a single linkedlist](https://stackoverflow.com/questions/58581870/difference-between-head-and-tail-insert-in-a-single-linkedlist)

> The difference is in the names.

> A "tail insert" inserts the new object at the tail of the list and thus the
> list has the same order as the order in which elements are added.

> A "head insert" inserts the new object at the head of the list, so the list
> has the reverse order compared to the order in which elements are added.
