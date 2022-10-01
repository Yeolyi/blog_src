---
title: 배열 기반 리스트 구현
---

장점

- 데이터의 참조가 쉽다. 인덱스 값을 기준으로 어디든 한 번에 참조가 가능하다.

단점

- 배열의 길이가 초기에 결정되어야 한다. 변경이 불가능하다??

- 삭제의 과정에서 데이터의 이동(복사)가 매우 빈번히 일어난다.

윤성우님 책에 있는 내용인데, 연결리스트와 비교해서 위와 같이 말할 수 있는 듯. 변
경이 불가능하다고 하기는 힘들지 않을까?

```{class="language-c"}
#include <stdio.h>
#include <stdbool.h>

#define LIST_LEN 100
typedef int LData;

typedef struct __ArrayList
{
    LData arr[LIST_LEN];
    int numOfData;
    int curPos;
} ArrayList;

typedef ArrayList List;

void ListInit(List *plist)
{
    plist->numOfData = 0;
    plist->curPos = -1;
}

void LInsert(List *plist, LData data)
{
    if (plist->numOfData >= LIST_LEN)
    {
        puts("저장할 공간이 없습니다");
        return;
    }
    plist->arr[plist->numOfData] = data;
    plist->numOfData++;
}

bool LFirst(List *plist, LData *pdata)
{
    if (plist->numOfData == 0)
        return false;
    plist->curPos = 0;
    *pdata = plist->arr[plist->curPos];
    return true;
}

bool LNext(List *plist, LData *pdata)
{
    if (plist->curPos >= (plist->numOfData) - 1)
        return false;
    (plist->curPos)++;
    *pdata = plist->arr[plist->curPos];
    return true;
}

int LCount(List *plist)
{
    return plist->numOfData;
}

LData LRemove(List *plist)
{
    int ret = plist->arr[plist->curPos];
    for (int i = plist->curPos; i < (plist->numOfData) - 1; i++)
    {
        plist->arr[i] = plist->arr[i + 1];
    }
    (plist->numOfData)--;
    (plist->curPos)--;
    return ret;
}

```
