---
title: 스택
---

> In computer science, a stack is an abstract data type that serves as a collection of elements,
> with two main principal operations:

> - Push, which adds an element to the collection, and
> - Pop, which removes the most recently added element that was not yet removed.
>
> -wikipedia

**LIFO (last in, first out)**

## ADT

```{class="language-c"}
void StackInit(Stack *pstack);

bool SIsEmpty(Stack *pstack);

void SPush(Stack *pstack, Data data);

Data SPop(Stack *pstack);
// 데이터가 하나 이상 존재함이 보장되어야 한다.

Data SPeek(Stack *pstack);
// 데이터가 하나 이상 존재함이 보장되어야 한다.
```

배열 기반이면 몰라도 연결리스트 기반 스택이면 size 변수가 굳이 필요하지 않음.

exit 함수의 사용도 눈여겨보자.

중위연산자 변환 문제 풀어보기,,,

## 연결 리스트 기반 스택 구현

```{class="language-c"}
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef int LData;

typedef struct _Node
{
    struct _Node *next;
    LData data;
} Node;

typedef struct _Stack
{
    Node *head;
} Stack;

void StackInit(Stack *pstack)
{
    pstack->head = malloc(sizeof(Node));
    pstack->head->next = NULL;
}

bool SIsEmpty(Stack *pstack)
{
    return !(pstack->head->next);
}

void SPush(Stack *pstack, LData data)
{
    Node *node = malloc(sizeof(Node));
    node->data = data;
    node->next = pstack->head->next;
    pstack->head->next = node;
}

LData SPop(Stack *pstack)
{
    if (!(pstack->head->next))
    {
        printf("Stack Memory Error");
        exit(-1);
    }
    Node *toRemove = pstack->head->next;
    pstack->head->next = pstack->head->next->next;
    LData ret = toRemove->data;
    free(toRemove);
    return ret;
}

int main()
{
    Stack stack;
    LData data;
    StackInit(&stack);
    for (int i = 0; i < 10; i++)
        SPush(&stack, i);
    while (!SIsEmpty(&stack))
        printf("%d ", SPop(&stack));
    return 0;
}
```
