---
title: 우선순위 큐
---

> In computer science, a priority queue is an abstract data-type similar to a regular queue or stack
> data structure in which each element additionally has a "priority" associated with it.

## heap

> In computer science, a heap is a specialized tree-based data structure which is essentially an
> almost complete tree that satisfies the heap property:

**우선순위 큐와 힙의 관계**

> While coders often implement priority queues with heaps, they are conceptually distinct from
> heaps. A priority queue is a concept like "a list" or "a map"; just as a list can be implemented
> with a linked list or with an array, a priority queue can be implemented with a heap or with a
> variety of other methods such as an unordered array.

## ADT

```{class="language-c"}
void PqueueInit(Pqueue *ppq, Comparator comp);

bool PQIsEmpty(PQueue *ppq);

void PEnqueue(PQueue *ppq, PQData data);

PQData PDequeue(PQueue *ppq);
// 데이터가 하나 이상 있음이 보장되어야 함.
```

void PqueueInit(Pqueue *ppq, Comparator *comp); 로 해도 잘 되네??

## 힙을 이용한 구현

_삭제 과정에서 굳이 swap을 할 필요는 없다. 하나만 대입연산하고 나머지는 마지막에만 해도 됨._

책에서는 우선순위라고 표현하고 나는 comparator를 사용해서 헷갈렸다 ㅡㅡ 사용하는데이터 타입에 따라느
낌이 달라질 수 있으니까 개념을 하나로 통일해서 코딩하자. comparator(a, b)를 a가 b보다 루트쪽에 있으
면 true로 한다는 식,,, high priority라는건 값이 크다는게 아니라 우선순위 높으니까 먼저 나온다, 더루
트쪽에 있다는 뜻이다. 하도 자연수로 테스트케이스 돌려서 까먹었다본데 우선순위 큐는 대소비교가 아니라
우선순위 비교가 핵심이다!!!

정렬함수 정의하는 것도 생각해보자. 책에서는 양수, 음수, 0으로 나눴지만 bool로도할 수 있지 않나??

```{class="language-c"}
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define HEAP_LEN 100

typedef char *Data;
typedef bool Comparator(Data d1, Data d2);

typedef struct _Heap
{
    int size;
    Data arr[HEAP_LEN];
    Comparator *comp;
} Heap;

void HeapInit(Heap *ph, Comparator comp)
{
    ph->size = 0;
    ph->comp = comp;
}

bool HIsEmpty(Heap *ph)
{
    return !(ph->size);
}

int GetParentIdx(int idx)
{
    return idx / 2;
}

int GetLChildIdx(int idx)
{
    return idx * 2;
}

int GetRChildIdx(int idx)
{
    return idx * 2 + 1;
}

int GetHiPriorityChildIdx(Heap *ph, int idx)
{
    int lChildIdx = GetLChildIdx(idx);
    int rChildIdx = GetRChildIdx(idx);
    int size = ph->size;
    if (lChildIdx > size)
        return 0;
    else if (lChildIdx == size)
        return lChildIdx;
    else
    {
        Data lChildVal = ph->arr[lChildIdx];
        Data rChildVal = ph->arr[rChildIdx];
        if (ph->comp(lChildVal, rChildVal))
            return lChildIdx;
        else
            return rChildIdx;
    }
}

void HInsert(Heap *ph, Data data)
{
    (ph->size)++;
    int idx = ph->size;
    while (idx != 1)
    {
        int parentIdx = GetParentIdx(idx);
        Data parentVal = ph->arr[parentIdx];
        if (ph->comp(data, parentVal))
        {
            ph->arr[idx] = ph->arr[parentIdx];
            idx = parentIdx;
        }
        else
            break;
    }
    ph->arr[idx] = data;
}

Data HDelete(Heap *ph)
{
    int idx = 1;
    Data ret = ph->arr[1];
    Data movingVal = ph->arr[ph->size];
    (ph->size)--;
    int childIdx;
    while ((childIdx = GetHiPriorityChildIdx(ph, idx)))
    {
        Data childVal = ph->arr[childIdx];
        if (ph->comp(childVal, movingVal))
        {
            ph->arr[idx] = childVal;
            idx = childIdx;
        }
        else
            break;
    }
    ph->arr[idx] = movingVal;
    return ret;
}

bool DataComp(char *d1, char *d2)
{
    int size1 = 0;
    int size2 = 0;
    while (d1[size1])
        size1++;
    while (d2[size2])
        size2++;
    return size1 > size2;
}

int main()
{
    Heap heap;
    HeapInit(&heap, DataComp);
    HInsert(&heap, "one");
    HInsert(&heap, "three");
    HInsert(&heap, "two");
    HInsert(&heap, "four");
    HInsert(&heap, "five");
    HInsert(&heap, "five");
    HInsert(&heap, "eight");
    HInsert(&heap, "eleven");
    HInsert(&heap, "one hundred");
    while (!HIsEmpty(&heap))
    {
        printf("%s\n", HDelete(&heap));
    }
    return 0;
}
```

[typedef로 함수 포인터 별칭 정의하기](https://dojang.io/mod/page/view.php?id=601)

[pass function by value (?) instead of function pointer?](https://stackoverflow.com/questions/7111251/pass-function-by-value-instead-of-function-pointer)
